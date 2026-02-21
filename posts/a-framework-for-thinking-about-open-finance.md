---
title: "A Framework for Thinking About Open Finance"
date: "2025-02-01"
description: "Open finance is more than an API standard — it's a structural shift in how financial data flows. Here's how I think about it."
coverImage: "https://akoya.com/hubfs/Blog%20posts%20-%20SVGs/The%20expansion%20of%20account%20ownership%20validation%20methods%20-%20Blog%20post.svg"
---

Open finance is one of those terms that means different things depending on who's in the room. To a regulator, it's about consumer data rights. To a bank, it's a compliance obligation. To a fintech, it's a distribution opportunity. To a data aggregator, it's the entire business model.

I've spent the last several years working on open finance infrastructure at Akoya, and over time I've developed a mental model that helps me cut through the noise.

## The Three Layers of Open Finance

I think of open finance as operating across three distinct layers:

### 1. Data Access Layer
This is the plumbing — the technical standards, APIs, and permissioning systems that allow consumer-authorized data to move from one institution to another. The CFPB's 1033 rule in the US, PSD2 in Europe, and CDR in Australia all operate primarily at this layer.

Most of the heated debate in open finance — screen scraping vs. APIs, credential-sharing risks, data minimization — lives here.

### 2. Use Case Layer
This is where data becomes value. Lending underwriting, account verification, personal finance management, tax automation — each of these is a distinct use case that leverages the data access layer in a specific way.

The business models of most fintechs are fundamentally use-case bets: "if we can access this data cheaply and reliably, we can build a better product than the incumbent."

### 3. Trust Layer
This is the invisible layer that makes everything else work (or fail). It includes:
- Consumer understanding of data sharing consent
- Institution confidence in data recipient security practices
- Regulator visibility into how data is actually being used

Open finance ecosystems that neglect the trust layer eventually hit a ceiling — either regulators step in, or consumer adoption stalls.

## Why This Framework Matters

The framework helps prioritize. When I evaluate a new use case or product opportunity, I ask:

1. **Data Access**: Is the data accessible reliably and at scale? What's the latency, coverage, and cost?
2. **Use Case Validity**: Is there a real consumer or business problem being solved? Is the data actually necessary for the job to be done?
3. **Trust Mechanics**: How is consent captured and managed? What happens when a consumer wants to revoke access?

A product that's weak on any one of these three dimensions will struggle — regardless of how strong it is on the other two.

## The Payment Dimension

One thing I've been thinking about more recently is how payments intersect with this model. Account-to-account payments (pay by bank, instant credit push, etc.) sit at an interesting intersection:

- They require **data access** (account verification, balance checks)
- They are themselves a **use case** (moving money)
- And they have particularly high **trust stakes** (money is on the line)

This is why I think the future of open finance isn't just about data sharing — it's about **data-enabled financial actions**. The read layer unlocks the write layer.

---

I'll keep developing this framework as the regulatory and product landscape evolves. If you have thoughts or pushback, I'd love to hear it — find me on [LinkedIn](https://www.linkedin.com/in/wahlflorian/) or [Twitter](https://twitter.com/flwahl).
