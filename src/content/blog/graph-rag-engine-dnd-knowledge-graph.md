---
title: "Building a Graph-Powered Knowledge Engine for D&D Worldbuilding"
description: "How I built a Neo4j pipeline that transforms unstructured worldbuilding text into a queryable knowledge graph — and why it's the same architecture pattern behind enterprise RAG systems."
date: 2026-04-10
tags: ["technical", "knowledge-graphs"]
featured: true
---

I run long D&D campaigns. The kind that span years, accumulate hundreds of NPCs, layer political factions on top of each other, and generate enough lore that even I — the person who wrote it — can't keep it all in my head. Every dungeon master hits this wall eventually. You've got thirty text files of worldbuilding, a dozen session recaps, and a player who asks "wait, what was the name of that merchant in Thornwall who owed a debt to the thieves' guild?" and you spend four minutes scrolling through Google Docs while the table waits.

I'm a data engineer. This is a data problem.

So I built a pipeline that takes raw `.txt` files of worldbuilding content, extracts entities and relationships using a locally hosted language model, transforms them into Cypher statements, and loads them into a Neo4j graph database. The result is a knowledge graph where I can query things like "show me every NPC connected to the Iron Syndicate within two degrees of the party's current location" and get an answer in milliseconds.

But here's why I'm writing about it on a professional site and not a D&D forum: this is the exact same architecture pattern I use for enterprise RAG systems. The domain is different. The engineering is identical.

## Why Graphs Beat Documents

The standard approach to "search your notes" is full-text search or, more recently, vector embeddings. Embed your documents, store them in Pinecone, do a cosine similarity lookup. It works for simple retrieval — "find me the document that mentions Thornwall."

It breaks immediately when the question involves *relationships*.

"Which factions have conflicting interests in the Northern Reach?" isn't answered by any single document. The answer is distributed across a faction description, three NPC backstories, two session recaps, and a geographic overview. Vector search will give you chunks that *mention* factions. A knowledge graph can *traverse the actual relationship structure* between them.

In graph terms, this query is a pattern match with a filter:

```cypher
MATCH (f1:Faction)-[:OPERATES_IN]->(r:Region {name: "Northern Reach"})
MATCH (f2:Faction)-[:OPERATES_IN]->(r)
WHERE f1 <> f2
MATCH (f1)-[c:CONFLICTS_WITH]->(f2)
RETURN f1.name, f2.name, c.reason
```

Try writing that as a vector search query.

## The Pipeline

The architecture has four stages, each with its own set of problems to solve:

**Stage 1: Ingestion.** Raw text files go in. These are unstructured — some are narrative prose, some are bullet-point notes, some are dialogue snippets from session recaps. The pipeline doesn't care about format. It cares about content.

**Stage 2: Entity and Relationship Extraction.** This is the hard part. A locally hosted language model reads each text chunk and extracts structured data: entities (people, places, factions, items, events) and relationships between them (belongs to, located in, conflicts with, owes debt to, rules over). I use a multi-pass approach — extract, validate, merge duplicates, resolve conflicts. The model hallucinates entities sometimes. The validation pass catches most of it.

The key design decision here was running the model locally rather than using an API. For a personal project, I don't want to pay per-token for processing my own creative writing. More importantly, the worldbuilding content is *mine* — I don't want it training someone else's model. A local model on my RTX 2070 handles the extraction with acceptable latency for batch processing.

**Stage 3: Cypher Generation.** Extracted entities and relationships get transformed into Cypher `CREATE` and `MERGE` statements. This is template-driven, not LLM-generated — I learned early that letting the model write raw Cypher leads to schema drift. Instead, the extraction step outputs structured JSON, and a deterministic template engine converts it to Cypher against a fixed schema.

**Stage 4: Neo4j Loading.** Cypher statements execute against a local Neo4j instance. Deduplication happens at the `MERGE` level — if an entity already exists, it updates rather than duplicates. After loading, I run a set of graph integrity checks: orphan detection, relationship validation, community detection to verify that clusters make sense.

## What I Learned

**Ontology design is everything.** My first attempt had forty entity types and eighty relationship types. It was unusable — too granular, too many edge cases. The version that works has nine entity types (Person, Place, Faction, Item, Event, Concept, Creature, Quest, Session) and fifteen relationship types. Constraints breed clarity.

**Entity resolution is the hardest problem in the pipeline.** "King Aldric," "the King," "Aldric Thorn," and "Aldric" are all the same person. The LLM doesn't always know that. I built a fuzzy matching layer that catches most aliases, but I still do a manual review pass on new ingestions. This is the same problem enterprises face when merging customer records across systems — it's unsolved in general, and you learn to live with "good enough."

**The graph reveals things the text doesn't.** Once I loaded three months of session recaps, the community detection algorithm identified a cluster of NPCs I hadn't consciously connected. They were all associated with the same geographic region and the same historical event, but I'd introduced them in different sessions for different reasons. The graph showed me a story thread I'd been building without realizing it. I turned it into a major plot arc.

This is the same thing that happens in enterprise knowledge graphs — the structure reveals latent relationships that no single document contains.

## Why This Matters Beyond D&D

Every enterprise I've worked with has the same fundamental problem: institutional knowledge locked in unstructured documents, spread across dozens of systems, with relationships that exist in people's heads but nowhere in the data.

The D&D knowledge graph is a proof of concept for a pattern that scales:

- **Unstructured text → structured knowledge graph** works for legal documents, medical records, internal wikis, customer support histories, and compliance libraries just as well as it works for fantasy worldbuilding.
- **Local LLM for extraction** matters when the data is sensitive — healthcare, finance, legal. You can't always send proprietary documents to an API.
- **Graph-based retrieval** outperforms vector search whenever the questions involve relationships, hierarchies, or multi-hop reasoning.
- **Schema discipline** (a small, opinionated ontology) produces better results than trying to capture everything.

The code is open source. The README walks through setup, schema design, and how to adapt the pipeline for your own domain. If you're a dungeon master, you get a queryable campaign bible. If you're an engineer, you get a reference implementation for graph-powered RAG.

Either way, you stop scrolling through Google Docs while your table waits.

---

*The Graph RAG Engine is available on [GitHub](https://github.com/WhiplashRetro02). Built with Neo4j, Python, and a locally hosted LLM.*
