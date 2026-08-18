## The situation

Condé Nast built an owned-and-operated portfolio in Dubai to take its flagship titles into the GCC and wider MENA region. The commercial case rested on four things: digital audience reach, regional luxury advertising and sponsorship, subscriptions, and affiliate commerce around tentpole moments. The Year 1 revenue target was $20M+.

The rollout ran in three waves over three years, each a full platform launch on group infrastructure:

| Wave | Titles | Live |
| --- | --- | --- |
| One | Condé Nast Traveller, Architectural Digest | 2023 |
| Two | GQ, Vogue | January 2025 |
| Three | Wired | January 2026 |

All English-language properties. I was Product Lead on all three, and the single accountable owner for getting every platform, integration and workflow live and working.

## What made it hard

Three things nearly moved the date.

A **regional media licence** hit unexpected procedural delays days before go-live, threatening a synchronised launch and the campaigns built around it. **Ad targeting rules** failed pre-launch testing — regional multi-currency sponsorships weren't separating correctly, putting directly-sold campaign delivery and revenue quotas at risk. And the **local editorial team's category tags** didn't map to global taxonomy, which broke section pages and search indexing.

None of these were visible at planning time. All three surfaced inside the final launch window.

## What I did

- **Scoped it commercially before scoping it technically.** Ran discovery with commercial and editorial leadership in Dubai, translated revenue targets into product requirements, and defined success metrics before any technical work started.
- **Wrote the product charter and defended the MVP line.** Multi-brand scope invites endless local customisation requests. I set firm MVP boundaries early and traded local nuance against launch date, with executive sign-off on the trade.
- **Made the localisation architecture decisions.** Multi-currency payments, central CMS adaptations, and regional front-end configuration — without degrading performance or moving the date.
- **Ran the matrixed pods.** Ad tech, SEO, content management, privacy, video — distributed across NYC and Dubai. RACI and dependency mapping so engineering sprints landed against editorial readiness and sponsorship windows, not against each other.
- **Built a Go/No-Go framework across four dimensions** — technical, editorial, legal, commercial. Pre-launch validation of ad server config, affiliate integrations, consent management and SEO indexability, so revenue worked on day one rather than week three.
- **Staggered the deployment and trained the teams on the ground.** Phased go-live rather than big-bang, plus hands-on CMS and analytics workshops in Dubai to establish taxonomies, section hierarchy and publishing workflow.
- **Owned seven days of hypercare** on each launch. Live triage, Core Web Vitals monitoring, ad yield optimisation, then a formal handover to the local publishing team.

When the licence slipped, I re-sequenced into a staged technical rollout — held the public marketing push, kept backend readiness moving, and used the week for additional UAT and editorial staging. The launch landed compliant and clean rather than late and rushed.

## What changed by wave three

This is the part that matters. The first two waves produced a playbook. Wired proved it was one.

- **I audited the previous launches for friction and automated it.** SEO metadata generation, social copy drafting, translation passes and initial configuration were all repeatable and all expensive in human hours. I put LLM-driven automation into the local workflow with guardrails, trading high-touch manual oversight for automated checks. **Time-to-market dropped by 50%.**
- **I redesigned placement using the previous wave's audience data.** Content modules and page layouts rebuilt around what actually performed — better ad slot visibility, better native recommendation blocks. **~11% increase in ad revenue per visit.**
- **I standardised the technical SEO templates and taxonomy** from earlier launch learnings, so crawling and indexing started faster. Organic traffic in month one came in materially higher, with no additional marketing spend.

## What didn't ship

The Arabic-language edition was scoped and the right-to-left layout work was built and validated in a test environment, but the launch was deferred amid regional disruption and I left the business before it went live. The groundwork is done; the launch isn't mine to claim.

## The outcome

Across the programme:

| Measure | Result |
| --- | --- |
| Revenue | Exceeded the **$20M+** Year 1 target |
| Audience reach | **12% above** the GCC and MENA benchmark |
| Delivery team | 4 engineers, 1 design lead, 1 PM (me) |

Wave three against the earlier waves' baseline:

| Measure | Wave three |
| --- | --- |
| Time to market | **50% faster** |
| Ad revenue per visit | **~11% higher** |
| Organic search | Materially higher in month one |
| Team size | Unchanged — same five people, half the time |

Launch dates held. Sponsorship windows were protected. Revenue worked from day one.

## If you're taking a brand into a new region

Four things decide whether it works.

**1. A validated business case, not strategic enthusiasm.** Real audience sizing, and a five-year model with localised monetisation paths, capex, opex and a breakeven date. Most regional expansions are approved on interest and costed later.

**2. Platform readiness for the region, specifically.** CMS integration, localised rendering, multi-currency payments, ad-tech delivery, automated SEO indexing. Assume your global platform is not ready for any of it until proven.

**3. Operational enablement between central and local teams.** Playbooks, governance, taxonomy mapping, aligned workflows, unified analytics. The platform is the easy half; getting a local team productive on it is the half that slips.

**4. Regulatory agility with schedule buffer built in.** Map licensing and data privacy requirements early, and build contingency into the plan so legal bottlenecks don't take the commercial window with them. This is the one that got us, and it's the one most plans ignore.
