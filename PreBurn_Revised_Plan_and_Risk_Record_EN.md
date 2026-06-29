# PreBurn — Revised Business Plan & Strategic Risk Record

> **Status:** Working title ("PreBurn" has a naming conflict — see Risk N). Pre-validation.
> **Date:** 26 June 2026
> **Purpose of this document:** Two things in one file. **Part 1** is an honest, consultant-style assessment and risk record — the hard truths to keep on record even if this project is paused or abandoned. **Part 2** is the revised business plan that incorporates those fixes. Read Part 1 first; it is the part most worth keeping.

---

## How to read this document

- **Part 1 — Strategic Risk Record.** Why this is hard, what could kill it, and the assumptions the whole business secretly depends on. This is the section to re-read later.
- **Part 2 — Revised Business Plan.** The plan rewritten to be more honest and more focused: single segment, bottom-up numbers, AI cost built in, B2B deferred, validation before building.
- **A note on numbers:** Every figure marked *(assumption)* is a planning placeholder, **not** a forecast and **not** sourced. Figures marked *(sourced)* trace to a named source. Do not rely on any *(assumption)* number until it is replaced by your own measured data.

---

# PART 1 — HONEST STRATEGIC ASSESSMENT (RISK RECORD)

## 1.1 Bottom line

The **concept is emotionally true and the founder insight is real.** But the *business* rests on **two unproven assumptions** that the original plan treats as facts:

1. That the "burn ritual" actually makes people feel better and brings them back (efficacy + retention).
2. That this specific audience — frontline service workers — will **pay** for it.

If either is false, almost nothing else in the plan survives. Everything below is in service of testing those two things cheaply, before spending money building.

## 1.2 What is genuinely strong (keep these)

- **The founder story (the torn coupon) is authentic and memorable.** It is the single best asset. It explains the problem in 20 seconds and earns trust.
- **Positioning discipline.** "Burn the residue, not the person." No revenge, no customer blacklist, no public shaming. This restraint is rare and correct.
- **Privacy-first instinct.** Local-first, delete-after-burn, no ad tracking. In a category repeatedly criticized for privacy abuse, this can be a real differentiator *if marketed loudly.*
- **Honesty about medical claims.** Refusing to claim it "treats burnout" avoids App Store rejection and legal exposure.
- **Intellectual honesty.** The original plan labels its own projections as assumptions. That habit is worth keeping.

## 1.3 The three fatal risks

### Risk A — "Daily habit" is probably the wrong model

Emotional incidents with customers are **episodic and unpredictable**, not daily. Yet the entire plan — streaks, subscriptions, retention math, financial model — assumes a **daily** habit. A sporadic trigger cannot reliably power a daily-habit product. If true, first-week retention collapses and the subscription thesis weakens.

**Why it matters:** Subscription apps live or die on retention. If people only need it after a bad shift (say, a few times a month), they will not sustain a monthly subscription, and they may churn before they ever convert.

**What to do:** Test frequency directly (see Part 2, Validation Plan). If usage is episodic, the *model* may need to change — e.g., an employer-paid benefit, a one-time/lifetime purchase, or a bundle — rather than a personal monthly subscription.

### Risk B — You are targeting the people **least able and least likely to pay**

This is the most important line in this document.

Restaurant staff, café and bar workers, retail clerks, and call-center agents are among the **lowest-income, lowest-discretionary-spend** segments of the workforce. They are precisely the people for whom a €4.99/month self-care subscription is hardest to justify — not because they don't have the problem (they have it the most), but because:

- Discretionary monthly spend is tight; a wellness app competes with essentials.
- High job turnover in these roles means low willingness to invest in anything tied to a job they may leave.
- Consumer wellness apps already convert poorly: free-to-paid is **typically in the low single digits (≈1–4%), an industry-typical range to verify, not a guarantee.** This segment likely sits at the **bottom** of that range.

**The structural paradox:** *the people who feel the pain most acutely are the people with the thinnest wallets.* The original plan's 4–7% conversion assumption runs against this. Treat 4–7% as optimistic; plan around **2–3% (assumption)** for B2C and stress-test even lower.

**Strategic implication:** This is the strongest argument that **the buyer may not be the user.** The person who should *pay* might be the **employer** (a café owner buying calm for their staff), while the **worker uses it privately.** That reframes the business — but B2B has its own contradictions (Risk D). There is no easy answer here; this is the central commercial problem to solve before building.

### Risk C — Unit economics (especially AI cost) are missing from the model

Each processed incident can trigger **several LLM calls** (summarize, classify emotion, separate responsibility, reframe, generate scripts, run safety detection). With a large free tier, **AI cost of goods (COGS) can exceed revenue.** The original financial model has **no COGS line and assumes CAC ≈ 0** ("organic TikTok"), which almost never holds — even organic content has a real production cost and unreliable yield.

**What to do:** Model **AI cost per free user per month** explicitly. Make the **free tier non-AI** (local-only burn ritual, no model calls = near-zero marginal cost). Reserve expensive models for *paying* users and for *full* analysis only; use cheap models for classification. If contribution margin per paying user isn't comfortably positive after AI + store fees (Apple/Google take ~15–30%), the price or the model is wrong.

## 1.4 Other structural problems

### Risk D — The B2B thesis contradicts the core value

The product's promise is **privacy the employer cannot see.** But B2B buyers want **data and ROI.** These pull in opposite directions. Worse, "aggregated anonymous insights" for a **10-person café cannot actually be anonymous** — with that few people, individuals are statistically re-identifiable, so the data is both privacy-risky and useless to the buyer. SMB hospitality B2B also has punishing sales economics: low contract value, high churn, hard-to-reach buyers. **Recommendation: cut B2B from Year 1.** Park it as a later option, after B2C proves retention.

### Risk E — Efficacy is unproven, and the design may *increase* rumination

The therapeutic premise is a **hypothesis, not a fact.** Re-writing the incident and generating "what I should have said" comeback scripts can deepen **rumination** rather than release it — there is psychology research suggesting that venting and rehearsing grievances can *reinforce* anger rather than discharge it (the catharsis-myth literature, e.g., work by Brad Bushman and colleagues). This collides with the brand philosophy ("burn = let go"): a comeback-script generator can quietly become a **grievance-rehearsal machine.** Efficacy and direction-of-effect must be **measured in beta**, not assumed. If users feel *worse* or more fixated, the core loop needs redesign (e.g., toward closure and reframing, away from rehearsal).

### Risk F — The moat is thin and easy to copy

Segment focus + LLM prompts + a burning animation can be cloned in a weekend, including by an LLM-wrapper competitor or an incumbent. The burn ritual is a **UI flourish, not a defensible asset.** A durable advantage, if any, must come from one of: (a) trusted brand within a specific community, (b) genuinely superior reframe quality built from accumulated (privacy-safe) learning, or (c) distribution lock-in. Name the intended moat explicitly; "we were first" is not one.

### Risk G — TAM is a vanity number

The $7.48B global mental-health-app market *(sourced: Grand View Research, 2024)* is **not** your addressable market. Your real market is "service workers willing to pay for episodic emotional decompression" — far smaller. Replace the top-down TAM with a **bottom-up SOM** (Part 2). Investors and your own planning both deserve the honest, smaller number.

### Risk H — Safety and legal surface is large for a solo founder

Emotionally vulnerable users + AI-generated responses + GDPR **special-category** data (mental health) + crisis content across jurisdictions = a heavy compliance and liability load. LLM-based crisis detection is **unreliable**, and a false negative (missing a genuine crisis) is catastrophic — reputationally and legally. This is not a checkbox; it can gate whether you can launch at all. Budget for legal review and design the crisis path conservatively from day one.

### Risk N — Name conflict ("PreBurn")

"PreBurn" already appears on Google Play for a burnout-related app, creating brand and trademark risk. **Resolve before spending anything on brand.** Search EUIPO, WIPO Global Brand Database, USPTO, app stores, domains, and social handles. Treat the current name as a placeholder.

## 1.5 Risk register (summary)

| # | Risk | Severity | Likelihood | Mitigation |
|---|------|----------|-----------|------------|
| A | "Daily habit" model may be wrong; usage is episodic | High | High | Measure real usage frequency before building subscription logic |
| B | Target segment least able/likely to pay | High | High | Plan for 2–3% conversion; test buyer = employer vs. user; validate willingness to pay with a fake-door test |
| C | AI COGS can exceed revenue; CAC ≈ 0 is false | High | Medium | Non-AI free tier; cheap models for classification; model cost per user |
| D | B2B contradicts privacy promise; bad SMB economics | High | Medium | Cut B2B from Year 1; revisit only after B2C retention proven |
| E | Efficacy unproven; may increase rumination | High | Medium | Measure mood + return intent in beta; redesign toward closure if negative |
| F | Thin, copyable moat | Medium | High | Pick and build one real moat (community trust / reframe quality) |
| G | TAM is vanity; real market much smaller | Medium | High | Replace with bottom-up SOM |
| H | Heavy safety/legal/GDPR surface for solo founder | High | Medium | Conservative crisis flow; legal review; data minimization |
| N | Name conflict with existing "PreBurn" | High | High | Full trademark/handle search before brand spend |

## 1.6 Kill criteria — when to walk away

Decide these **now**, in writing, so emotion doesn't override evidence later. Abandon or pivot if, after the 4-week validation (Part 2):

- **Retention/frequency:** Fewer than ~30% of testers say they'd use it again the *next* time something happens, **and** observed/claimed frequency is lower than ~once a week. *(assumption thresholds — set your own, but set them.)*
- **Willingness to pay:** Fake-door payment click-through is in the low single digits with **no** segment showing real card-out intent.
- **Efficacy/direction:** A meaningful share of testers report feeling **no better or worse** after the ritual.
- **Unit economics:** You cannot find a configuration where contribution margin per paying user is positive after AI + store fees.

If two or more of these fail, the honest move is to **pivot the model** (buyer, frequency, or format) or **stop** — and this document is the record of why.

---

# PART 2 — REVISED BUSINESS PLAN

## 2.1 Executive summary (revised)

PreBurn *(working title)* is a **privacy-first emotional decompression tool** for people in customer-facing work. After a difficult interaction, the user briefly captures what happened, receives a short AI-guided reframe that separates *their* responsibility from the customer's behavior, and completes a symbolic "burn" ritual to mark closure.

**What changed from the original plan, and why:**

- **Single beachhead, not seven segments.** Focus all early effort on **one** segment in **one** geography to learn fast.
- **Validation before building.** A 4-week, no-code test of the two make-or-break assumptions (efficacy/frequency and willingness to pay) comes *before* any MVP.
- **B2B deferred.** Removed from Year 1 due to the privacy contradiction and poor SMB economics.
- **Honest economics.** Conservative conversion (2–3%), explicit AI COGS, non-AI free tier, bottom-up market sizing.
- **Efficacy treated as a hypothesis to measure**, with the core loop oriented toward *closure*, not grievance rehearsal.

## 2.2 The problem (tightened)

Frontline workers absorb anger, entitlement, and disrespect while being required to stay polite. Individually these moments look minor; cumulatively they contribute to emotional exhaustion. Research links customer incivility to emotional exhaustion and turnover intentions in service employees. The WHO defines **burnout** as an occupational phenomenon from chronic, unmanaged workplace stress, characterized by exhaustion, cynicism, and reduced efficacy *(sourced: WHO ICD-11 framing)*. PreBurn targets the **pre-burnout layer**: small, preventive release — explicitly **not** clinical treatment.

Generic wellness apps ask "How do you feel today?" The unmet need is more specific: *"That interaction hurt — how do I stop carrying it, and what do I say next time?"*

## 2.3 The solution & core loop

A deliberately **short** loop (target under ~3 minutes):

1. **Capture** — text or voice; optional emotion tags; workplace category.
2. **Reframe (AI)** — neutral summary; *possible* interpretation (never "the customer definitely meant X"); what was **not** your responsibility; why it stung; a reframe oriented toward **closure**.
3. **Burn ritual** — the incident becomes a visual object (receipt/note) that folds, darkens, and burns. Closing line: *"Released. You do not have to carry this."*

**Design guardrail (new):** Because rehearsing comebacks can fuel rumination (Risk E), "response scripts" are **optional and secondary**, framed as *boundary language for next time*, not as ammunition. The primary emotional payload is **closure**, not winning the argument.

## 2.4 Positioning

- **Category:** burnout prevention + emotional decompression + workplace micro-recovery (a precise niche, not "mental health treatment").
- **One line:** A privacy-first decompression tool for people who deal with people.
- **Philosophy:** *Burn the residue, not the person.* No revenge, no customer database, no public shaming.
- **Voice:** calm, protective, emotionally precise, never vengeful.

## 2.5 Target market — with willingness-to-pay reality (revised)

**Beachhead (pick one to start):** independent **café / restaurant** workers and owners in **one** launch geography. Rationale: authentic to the founder story, high incident frequency, easy to demonstrate in short-form video.

**Stated honestly (see Risk B):** this segment has **high need but low ability/willingness to pay.** Two implications baked into this plan:

- B2C pricing and conversion are modeled **conservatively**.
- The plan **actively tests whether the buyer should be the employer** (owner-paid staff benefit) rather than the individual worker — without ever exposing individual entries to that employer.

**Expansion (only after retention is proven):** other frontline roles (retail, call center, hospitality, healthcare front-desk), then adjacent geographies.

## 2.6 Market sizing — bottom-up SOM (replaces vanity TAM)

Do **not** anchor on the $7.48B mental-health-app TAM *(sourced: Grand View Research)*. Build the number from the bottom:

> **SOM (template, fill with real data):**
> (Number of target-segment workers in launch geography)
> × (realistic reachable share via your channels)
> × (conservative free-to-paid conversion, **2–3% assumption**)
> × (annual price, **€39.99 assumption**)
> = serviceable obtainable revenue.

Until each input is your own measured figure, treat the result as illustrative only.

## 2.7 Differentiation & intended moat

Near-term differentiation: **segment specificity + privacy-first design + closure-oriented ritual.** Acknowledge openly that these are **copyable** (Risk F). The intended durable moat — to be built deliberately — is **trusted brand within a specific frontline community** plus **reframe quality** that improves from privacy-safe usage. State this as a goal, not an achievement.

## 2.8 Product roadmap (focused)

**MVP (only after validation passes):** incident capture (text + voice), emotion tags, AI reframe with the closure guardrail, burn ritual, delete-after-burn, simple paywall. **Optional/secondary:** boundary-language scripts.

**Defer (V1+):** pattern detection, burnout check-ins, multilingual expansion, custom visuals, before/after-shift rituals.

**Defer indefinitely / revisit only post-PMF:** all **B2B** features (employer dashboards, team climate index). See Risk D.

## 2.9 Business model (revised)

**B2C freemium:**
- **Free tier = non-AI** (local burn ritual, basic tags). Near-zero marginal cost; protects unit economics.
- **Premium *(price assumption: €4.99/mo or €39.99/yr)*:** AI reframe, voice input, optional scripts, private archive, insights.

**Conversion assumption: 2–3%** (not 4–7%), reflecting Risk B. Stress-test lower.

**AI cost control (new, load-bearing):** cheap models for classification; premium models only for paying users' full analysis; short prompts; summarize before deep analysis; hard caps on free AI usage (ideally zero AI on free).

**B2B:** **removed from Year 1.** Possible later as an **owner-paid staff benefit** with strictly aggregated data and a minimum team size large enough to make anonymization real (e.g., 25+), never individual visibility.

## 2.10 Financial model (conservative, with COGS) — *all figures assumptions*

**This replaces the original projections.** Treat as a *structure to fill*, not a forecast. Key principle: **show contribution margin, not just revenue.**

| Line | Year 1 (illustrative) | Notes |
|------|----------------------|-------|
| Free users | (set from real funnel) | Driven by content; do **not** assume 0 CAC |
| Free→paid conversion | **2–3% (assumption)** | Lower bound for this segment |
| ARPU (paying) | €4.99/mo *(assumption)* | Before store fees |
| **Less:** store fees | ~15–30% | Apple/Google |
| **Less:** AI COGS / paying user | (model it) | Free tier ≈ €0 if non-AI |
| **Less:** content/CAC | (real, not 0) | Even "organic" has cost |
| **= Contribution margin/user** | must be **> 0** | If not, fix price or model |

**Sensitivity:** model the outcome at conversion = 1%, 2%, 3% and at two AI-cost levels. The single most important variable to stress is **first-week retention** — put one sensitivity table on it.

Original Year 1–3 run-rate figures (≈€24K → ≈€254K → ≈€1.36M) are **removed** as primary claims; they depend on unvalidated conversion and ignore COGS/CAC. Rebuild them only after the funnel is measured.

## 2.11 Go-to-market (focused)

- **One segment, one geography, one core loop.** Resist multilingual/multi-segment spread until retention is proven.
- **Channels:** short-form video (the founder story is the hook), relevant worker/owner communities. Track **cost per acquired user**, including content production time — not "free."
- **Message:** "Burn before burnout." Lead with the torn-coupon story.

## 2.12 Validation-first roadmap (the real next 4 weeks)

**Before writing product code**, kill or confirm Risks A, B, C, E:

1. **Name/legal check (week 1):** EUIPO / WIPO / USPTO / app stores / domains / handles.
2. **Efficacy + frequency test (weeks 1–3):** Wizard-of-Oz / paper or chat prototype. Manually deliver the reframe to **20–30** real frontline workers using their actual incidents. Ask immediately: *Do you feel lighter? Would you use this the next time something happens?* Record **how often** such incidents occur for them (tests Risk A).
3. **Willingness-to-pay test (weeks 2–4):** Landing page with a **fake-door** price + payment button; measure real click-through, by segment, and whether **owners** would pay for staff (tests Risk B and the buyer question).
4. **Unit-economics one-pager (week 3):** AI cost per user; prove a non-AI free tier is viable and a paying user's margin is positive.
5. **Decision (week 4):** Apply the **kill criteria** from §1.6. Build MVP only if they pass; otherwise pivot the model or stop.

**Then:** MVP (8–12 wks) → closed beta with cafés/restaurants, measuring mood-direction and first-week retention (tests Risk E) → public launch.

## 2.13 Metrics that matter

- **Leading:** first-burn activation, **first-week retention**, incident frequency per active user, ritual completion rate.
- **Commercial:** free→paid conversion (target 2–3%), contribution margin per paying user, churn.
- **Outcome (self-reported, non-clinical):** "I feel lighter after using it," "I carried it less," "I felt more prepared." **Never** claim medical improvement without clinical validation.

## 2.14 Ethics, safety & privacy (non-negotiable)

- **Privacy:** no customer names, no workplace names by default, no photo/video in MVP, local-first where possible, delete-after-burn, no sale of data, no ad tracking, explicit consent before any AI processing. Market this loudly — it is a differentiator.
- **Safety:** conservative crisis path. If input suggests self-harm, threats, or crisis, **do not** run the ritual as if normal — surface appropriate, jurisdiction-aware support resources. Assume LLM crisis detection is imperfect; design for false negatives (Risk H).
- **Claims:** PreBurn is **not** a medical device, therapy, crisis service, or diagnostic tool. Never claim to "cure" or "treat" burnout or depression.
- **No** revenge framing, **no** customer identification, **no** employer surveillance.

## 2.15 Open questions to resolve before committing

1. Is usage **episodic or daily**? (Determines whether subscription is even the right model.)
2. Is the buyer the **worker or the employer**? (Determines the entire commercial structure.)
3. Does the ritual produce **closure or rumination**? (Determines whether the product helps at all.)
4. Can a **non-AI free tier** + paid AI tier be margin-positive? (Determines viability.)
5. What is the **real, available name** and brand?

This document exists so that — whether PreBurn launches, pivots, or is shelved — the reasoning is preserved and reusable for the next idea.
