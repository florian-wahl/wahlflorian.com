---
title: "Tokenization in Fintech: One Word, Four Domains"
date: "2026-02-22"
description: ""
coverImage: "/posts-img/tokenization-in-fintech-cover.png"
---

I recently heard the story of a bank going through reviews with their regulator. The bank mentioned that they were looking into tokenization (referring to tokenizing bank account numbers) for their roadmap. The regulator understood tokenization as digital representation of assets. It apparently led to a few very confused exchanges and concerns from the regulator. Until it got clarified.

People get confused — and I get it! The same word carries different meanings.

Anyway, I thought this would be a good topic to share some insights on.


Tokenization in the fintech space can mean a lot of different things. In this article, I want to break it down into four domains:
1. **Tokenization x cards** = the representation of a card number
2. **Tokenization x bank accounts** = the representation of a bank account number
3. **Tokenization x blockchain** = the digital representation of an asset
4. **Tokenization x identity** = the scoped identity to access APIs

Let’s dive into the nuances of each of them. 

Note: there are even more shades of tokens if we start drifting outside of the fintech world. But let's not go there today.

## What’s a token?

First, let's define what we mean by "a token". 

In my head, a token is a piece of data that stands in for another piece of data, asset, or permission. Usually this is done to reduce risk, control access, or enable secure operations without exposing the real "thing". 

Think of a token as a randomly generated set of characters (e.g., letters, numbers) that is then mapped to the underlying thing that is being substituted.
The mapping between the token and the original thing is stored in what's commonly referenced as a "token vault". 

![Tokenization in Fintech Cover Image](/posts-img/tokenization-in-fintech-cover.png)

That’s the core concept across every domain. 

## Tokenization in the Context of Cards

In the world of fintech, in my opinion, the most common use of tokenization is for debit and credit cards. And by common, I mean it is the most widely spread from a usage perspective.

### Network Tokens

Most consumers who use a digital wallet today and have linked their cards to it will, to some extent, be using a tokenized version of that card (i.e., what is stored in the wallet).

This is actually a common practice among card networks. [Mastercard](https://www.mastercard.com/us/en/news-and-trends/stories/2025/what-is-tokenization.html) and [Visa](https://corporate.visa.com/en/solutions/commercial-solutions/knowledge-hub/tokenization.html), for instance, will often, if not always at this point, replace primary account numbers (PANs) with a network token. That network token is a representation of the card that can then be stored in a wallet, at a merchant, or with any other third party. The user will see the last 4 digits, but that's the extent of the information that is shared.

The value proposition here is simple, and the networks have reported on this:
- It improves authorization rates
- It reduces fraud
- It reduces the compliance burden that a merchant or third party might have around regulations like PCI-DSS

### Processor Tokens

There's another type of token you might run into that also falls in the realm of cards: the acquirer or processor tokens. 

Think of a payment processor that provides services to merchants; checkout pages are a primary example here. Companies like **Stripe**, **Adyen**, and **Braintree** will also provide tokenization services. It is tied to helping merchants and third parties reduce their requirements to meet the [PCI DSS standard](https://en.wikipedia.org/wiki/Payment_Card_Industry_Data_Security_Standard).

In this case, the payment processor holds the actual primary account number on behalf of the merchant, and issues them a proprietary token that can be stored instead. Because this token doesn't carry card information directly, it reduces the compliance burden on the merchant's side.

## Tokenization in the Context of Bank Accounts

Following tokenization in the context of cards, a quite similar utilization of tokens is in the context of bank account numbers. Although this is a more nascent topic and use of tokens, it is becoming a more common practice across the industry (something I've covered in [previous articles](https://akoya.com/blog/account-number-tokenization-the-next-phase-of-consumer-protection)).

The idea is similar to cards, where the token is a substitute of the bank account number issued to a consumer. When sharing that bank account number with a third party, the financial institution will issue a tokenized account number (TAN) in place of the real one for the third party to use. Again, this [reduces the risk of fraud and the risk of sensitive banking information being exposed in the case of a breach](https://akoya.com/blog/reduce-fraud-risk-with-tokenized-account-numbers).

Similarly to cards, there are also a few different flavors of tokenized account numbers:
- **Bank issued** tokens
- **Processor issued** tokens
- **Payment network issued** tokens

### Bank Issued Tokens

In the case of bank issued, the token is generated by the bank directly. The bank holds the token vault, where the mapping between a token and the actual account number is stored. 

The process of de-tokenization (when a payment is processed and the token needs to be resolved back to the real account number) is handled by the bank.

### Processor Issued Tokens

In the case of processor issued tokens, this is very similar to what we discussed in the card space, where the acquirer or payment processor will issue a token in place of the bank account number, so the merchant doesn't have to store those. 

The de-tokenization is done by the processor before sending the payment instructions.

### Payment Network Issued Tokens

The last one, and most emerging, is payment network based. Again, parallels can be drawn to Visa and Mastercard, but in the context of bank accounts and bank payments, you are looking at companies like [The Clearing House](https://www.theclearinghouse.org/payment-systems/TCH-Token-Exchange) issuing tokens on behalf of the financial institution.

In this case, the token vault is at the payment network level, and the payment network handles the de-tokenization when a payment is routed from one bank to another.

## Tokenization in the Context of Blockchain

When looking at tokenization in the context of blockchain, I think it is helpful to think of it in two layers:
- The **1st layer** represents the types of tokens from a technical standpoint.
- The **2nd layer** represents the use cases that are built on top of those tokens.

### Layer 1: Token Types

At the first layer, [there are 2 types of tokens](https://www.debutinfotech.com/blog/types-of-tokens-in-blockchain): **fungible tokens** and **non-fungible tokens**.
- **Fungible tokens** are tokens that are all identical and interchangeable within their category, just like a dollar bill. One token always equals another token of the same type.
- **Non-fungible tokens**, on the other hand, each represent a unique and non-interchangeable thing. Think of them as digital certificates of ownership. They tend to be more flexible and broader in terms of use, as they can handle a wide array of things.

### Layer 2: Use Cases

When you look at the next layer — the use cases built on top — here are a few good examples to have in mind:
- **Stablecoins** are examples of fungible tokens where the tokens are typically pegged one-to-one to stable assets such as a fiat currency like the US dollar, or gold.
- **Governance and utility tokens** are another example of fungible tokens that serve a specific function within a protocol, a distributed ledger, or a blockchain.
- **Collectibles, licenses, and rights** are all examples of how non-fungible tokens can be used to represent unique ownership (think back to the NFT craze a couple of years ago).
- **Tokenization of real-world assets** can be either a fungible or a non-fungible token depending on whether the underlying asset is itself fungible (a share in a fund or a stock) or something more unique (a specific property).

In sum, in this case, tokenization is a representation of a thing onto a blockchain or distributed ledger, through a technical standard that tokenizes that thing.

## Tokenization in the Context of Identity (APIs & Credentials)

Lastly, I want to briefly touch on tokenization in the context of identity — not identity in the sense of "who is Florian" but more in the technical sense, specifically around credentials and [APIs](https://www.postman.com/what-is-an-api/). 

This is something I've run into a lot in the context of open banking / open finance. I've seen two main types of tokens come across in my conversations on this topic:
1. **OAuth / OIDC** tokens
2. **ID** tokens

### OAuth / OIDC Tokens

OAuth tokens are what's called [bearer tokens](https://blog.postman.com/what-is-a-bearer-token/), and they are used to authenticate API requests. 

Essentially, instead of sharing passwords with every third-party fintech application, an OAuth token is temporarily issued that represents the set of things an application is authorized (or allowed) to do on behalf of a consumer.

A few key characteristics:
- **Scoped**: OAuth tokens are quite limited and can only be used to conduct specific actions as defined by their scope.
- **Short-lived**: they expire, so if there is some kind of breach, the risk is reduced because of their short lifespan and very specific scope.

### ID Tokens

The second type I've come across in that space are ID tokens. Think of them as a signed digital badge: they prove who someone is, like a passport but for software. They are issued by a trusted authority and contain verified information.

A few key characteristics:
- **No need to check back every time:** an application (e.g., a fintech) can verify the token on its own, without having to call back to the issuer each time. This makes things faster.
- **Tamper-proof**: they are signed tokens, which means any attempt at editing the token will be detected and it would get rejected.

So in the context of identity (specifically for APIs and credentials), these two types of tokens operate very much in the background but are foundational to many use cases. They are technical by nature but worth understanding if you're building or working with fintech products.

## Wrapping Up

If you are reading this — thank you! 

This has been a lengthy article, and we've covered a lot of nuanced and technical topics around tokenization. I've tried to break down key concepts around four main token categories in the financial services space.

I will leave you with the summary table below as a recap of everything we've looked at.

![Tokenization in Fintech Summary Table](/posts-img/tokenization-in-fintech-summary-table.png)


From now on, when discussing this topic with industry participants, reading news, press releases, or blog posts, make sure you first understand the context in which “token” or “tokenization” is used.
- *What underlying thing are we substituting?*
- *Who issues and controls the token?*
- *What risk are we actually mitigating?*



I hope you found this article helpful. If you have any questions or want to chat more — [please reach out](https://wahlflorian.com/contact).

