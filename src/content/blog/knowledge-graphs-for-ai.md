---
title: "Building Knowledge Graphs for AI: Lessons from Neo4j and RAG"
description: "What I learned designing graph-based retrieval systems — and why graph structure beats flat vector search for complex domains."
date: 2026-04-22
tags: ["technical", "knowledge-graphs"]
featured: true
---

Vector search is having a moment. Embed everything, store it in Pinecone or Weaviate, do a cosine similarity lookup, feed the results to an LLM. It works surprisingly well for simple use cases.

But it breaks down fast when your domain has *structure*.

I've spent the last year building knowledge graph pipelines on Neo4j for retrieval-augmented generation, and the difference in retrieval quality is stark. Here's what I've learned.

## The problem with flat retrieval

Standard RAG treats your knowledge base as a bag of chunks. You embed them, you search them, you retrieve the top-k most similar. The fundamental assumption is that *semantic similarity* is a good proxy for *relevance*.

For a simple FAQ bot, that's fine. For anything with relationships — organizational structures, technical architectures, narrative worldbuilding, medical records, legal documents — it's not enough.

Consider a query like: "What decisions led to the current architecture of System X?" The answer isn't in any single chunk. It's distributed across multiple documents, connected by causal and temporal relationships. Flat vector search will give you chunks that *mention* System X. A knowledge graph can traverse the actual decision chain.

## Why graphs

Graphs encode three things that vectors don't:

1. **Relationships as first-class objects.** In a graph, the *connection* between two entities carries meaning. `(Alice)-[:REPORTS_TO]->(Bob)` is fundamentally different from `(Alice)-[:COLLABORATES_WITH]->(Bob)`. Vectors collapse this distinction.

2. **Multi-hop reasoning.** Graphs let you traverse: "Find all systems that depend on a service owned by a team that reports to this VP." That's a three-hop query. In vector space, you'd need to retrieve each hop separately and stitch them together manually.

3. **Explicit ontology.** A graph schema defines what *kinds* of things exist in your domain and how they can relate. This is a form of domain knowledge that improves retrieval precision dramatically.

## The pipeline I built

Here's the architecture that's worked well for me:

```
Raw Text → LLM Entity Extraction → Graph Construction → Neo4j
                                                          ↓
User Query → Intent Classification → Cypher Generation → Graph Traversal
                                                          ↓
                                              Retrieved Subgraph → LLM → Response
```

The key insight is using the LLM *twice*: once to build the graph (entity and relationship extraction from unstructured text), and once to query it (natural language to Cypher translation). The graph sits in the middle as structured, persistent, queryable knowledge.

## Lessons learned

**Entity extraction is the hardest part.** Getting an LLM to consistently extract entities and relationships from messy text requires careful prompt engineering and validation. I ended up building a multi-pass system: extract, validate, merge duplicates, resolve conflicts.

**Cypher generation needs guardrails.** LLMs can write Cypher, but they need schema awareness. I inject the graph schema into the prompt so the model knows what node labels and relationship types are available. Without this, it hallucinates properties that don't exist.

**Hybrid retrieval wins.** The best results come from combining graph traversal with vector search. Use the graph for structured, relationship-aware retrieval. Use vectors for fuzzy, semantic matching. Merge the results before feeding them to the LLM.

**Start with a small, opinionated ontology.** Don't try to model everything. Pick the 5-10 most important entity types and 10-15 relationship types for your domain. You can always expand later. A focused ontology produces better extraction and cleaner queries.

## When to use graphs vs. vectors

Use **vector search** when: your domain is flat (FAQ, documentation), queries are simple similarity lookups, and you need to get something working fast.

Use **knowledge graphs** when: your domain has rich relationships, queries require multi-hop reasoning, you need explainable retrieval (you can show *why* something was retrieved), or your data changes frequently (graphs update more cleanly than re-embedding).

Use **both** when: you're building anything serious.

---

*This is the technical companion to [Why Most AI Initiatives Fail at the Data Layer](/writing/ai-initiatives-fail-at-data). The code for the Graph RAG pipeline discussed here is available on [GitHub](#).*
