---
title: "Building a Deal Analysis Suite for Real Estate Investing"
description: "How I built a full-stack analytics dashboard to stress-test rental property deals — BRRRR models, house-hack scenarios, and cash flow projections — before committing a dollar."
date: 2026-04-18
tags: ["technical", "real-estate"]
featured: false
---

Before I made a single offer on a rental property, I had analyzed over a dozen deals to the point of exhaustion — running BRRRR scenarios, house-hack projections, cash-out refi timelines, and sensitivity analyses on rent growth and vacancy rates. Each one lived in a different spreadsheet. Each spreadsheet had slightly different formulas. None of them talked to each other.

I'm a data engineer who builds dashboards for a living. So I built one for myself.

The result is an analytics suite that lets me input a property's numbers — purchase price, estimated rents, rehab costs, financing terms — and instantly see the deal from every angle: monthly cash flow, cash-on-cash return, debt service coverage ratio, break-even occupancy, and a ten-year projection with adjustable assumptions for rent growth, appreciation, and expense inflation.

It doesn't tell me whether to buy. It tells me what I need to believe for the deal to work.

## The Problem with Spreadsheets

Every real estate investor starts with spreadsheets, and for simple deals they're fine. But they fall apart in three specific ways:

**Scenario comparison is painful.** What if I put 3.5% down via FHA instead of 20% conventional? What if rents are $100 lower than the listing claims? What if the rehab costs 40% more than the contractor quoted? In a spreadsheet, each scenario is a separate tab or a separate file. In the dashboard, I toggle assumptions and watch every metric update simultaneously.

**They can't model time.** A static cash flow analysis tells you what happens in month one. It doesn't tell you what happens when you refi in month eighteen, pull equity, and deploy it into the next property. The compounding effects of a multi-property scaling strategy — which is my actual strategy — require a time-series model, not a snapshot.

**They don't force rigor.** A spreadsheet lets you conveniently forget to include CapEx reserves, or vacancy, or property management fees. A well-designed dashboard makes every assumption visible and non-optional.

## What It Does

The dashboard has four views, each answering a different question:

**Deal Analyzer.** The entry point. Input property details and get an instant readout of every metric that matters. The key insight I built in: a "break-even assumptions" panel that shows exactly which variables would need to change for the deal to go negative. If the deal only works at 100% occupancy and 0% maintenance, it doesn't work.

**Scenario Modeler.** Side-by-side comparison of financing strategies. I used this heavily when I was evaluating whether to go FHA house-hack (3.5% down, live in one unit) versus conventional investment loan (20% down, no occupancy requirement) versus DSCR (debt service coverage ratio loan, no personal income verification). Each strategy has radically different cash flow profiles, and the right choice depends on which constraint is binding — capital, income qualification, or timeline.

**Portfolio Projector.** A ten-year model that simulates acquiring properties sequentially using the cash-out refi scaling strategy. You set your starting capital, target acquisition pace, and refi assumptions, and it projects your portfolio size, total cash flow, total equity, and net worth trajectory year by year. This is the view that keeps me honest about whether the twelve-door target is realistic on my timeline.

**Market Comparables.** A lightweight comp analysis tool. Input an address and it pulls recent sales and rental data for the area. Not a replacement for a full appraisal, but good enough to sanity-check a listing's claimed rents against what the market actually supports. I built this after nearly getting burned by a listing that claimed $3,500/month rent on a property in a neighborhood where median rent was $1,950.

## The Stack

I wanted this to be fast, cheap, and deployable from my terminal. So:

**Frontend:** React with Recharts for data visualization. Interactive charts where you can drag assumption sliders and watch projections update in real time. The UI uses a dark theme — I spend enough time staring at this that aesthetics matter for sustained use.

**Backend:** Cloudflare Workers with D1 (SQLite at the edge). This was a deliberate choice over a traditional server. Workers are globally distributed, cold-start in milliseconds, and the free tier handles everything I need. D1 stores saved deal analyses so I can revisit and compare them over time.

**Deployment:** Cloudflare Pages via GitHub. `git push` deploys in thirty seconds. Total hosting cost: zero dollars. The only cost is the domain.

The entire application is a single-page React app that makes API calls to a Workers backend. No framework overhead, no SSR complexity, no database server to maintain. For a personal tool, this is the right level of architecture — enough structure to be reliable, not so much that maintenance becomes a project in itself.

## What I Learned Building It

**The hardest part isn't the code — it's the financial model.** Getting the math right for a BRRRR cash-out refinance with variable holding periods, adjustable rate assumptions, and property-specific CapEx schedules required more research into real estate finance than into React or Cloudflare. I ended up reading mortgage amortization specs, DSCR lender guidelines, and FHA loan handbooks to make sure the model reflected how these instruments actually work, not how blog posts say they work.

**Visualization design matters more than feature count.** My first version had twelve charts on the deal analyzer page. It was unusable — too much data, no hierarchy, no clear "so what?" The version that works has three primary metrics above the fold (monthly cash flow, cash-on-cash return, DSCR) with a "show more" panel for everything else. The portfolio projector uses a single stacked area chart that communicates the entire ten-year trajectory at a glance. Constraint breeds clarity here too.

**Building for yourself is the best product training.** I am simultaneously the developer, the designer, and the power user. Every friction point I hit, I fix immediately. Every feature I add, I use within the hour. There is no product-market fit problem when you *are* the market.

## Why This Belongs in a Technical Portfolio

Property analysis software isn't novel. Every real estate investor uses BiggerPockets calculators or DealCheck or a spreadsheet template from a YouTube guru. What's different about building your own:

**It demonstrates full-stack competence end-to-end.** From financial modeling to React UI to serverless backend to edge deployment. This isn't a tutorial project — it's a tool I use to make five- and six-figure financial decisions.

**It shows domain-crossing ability.** Most engineers build for other engineers. Building for a domain you're learning (real estate investing) requires translating between two fields — understanding both the technical implementation and the business logic deeply enough to know when the model is wrong.

**It proves you can ship.** It's deployed. It works. I use it weekly. The gap between "I could build that" and "I built that and I use it" is where most portfolio projects die.

---

*The deal analysis suite is available on [GitHub](https://github.com/WhiplashRetro02). Built with React, Recharts, Cloudflare Workers, and D1. If you're analyzing Knoxville multifamily deals and want to compare notes, [reach out](/#contact).*
