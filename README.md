# Saruru

> Burn before burnout. A privacy-first emotional decompression tool for people in customer-facing work.

After a difficult interaction, the user briefly captures what happened, receives a short AI-guided reframe oriented toward **closure** (not rumination), and completes a symbolic **burn** ritual. Name: Saruru (사르르). Formal trademark check (KIPO/EUIPO/USPTO) pending before brand spend.

## Status

Pre-validation / pre-MVP. This repo currently holds the **planning, risk, and design docs**. App code (Expo + React Native) comes next, built from the tech spec.

## Key decisions (v1)

- **Privacy-first.** Local-first storage, delete-after-burn on by default, no ad tracking. "We burn the residue, not your privacy."
- **No STT in v1.** Voice input = the OS keyboard's built-in dictation. The app analyzes **text only** and stores no audio.
- **AI = Anthropic Claude**, called through a secure proxy so the API key never ships in the app.
- **Monetization:** ads are not central. Free + privacy-safe Plus + B2B; credits deferred until cloud STT is added. (Details in the revenue doc.)
- **Closure, not rumination.** Comeback scripts are optional and secondary.

## Documents

| File | What |
|------|------|
| [Saruru_Revised_Plan_and_Risk_Record_EN.md](./Saruru_Revised_Plan_and_Risk_Record_EN.md) | Business plan + strategic risk record (EN) |
| [Saruru_Plan_Revise_et_Registre_des_Risques_FR.md](./Saruru_Plan_Revise_et_Registre_des_Risques_FR.md) | Same, in French |
| [Saruru_MVP_Tech_Spec.md](./Saruru_MVP_Tech_Spec.md) | MVP architecture: stack, data model, screens, Claude prompt + schema, proxy, build steps |
| [Saruru_Mockup_CoreFlow.html](./Saruru_Mockup_CoreFlow.html) | Visual mockup of the core flow (open in a browser) |

## Core loop

```
Home → Capture → Reframe (Claude) → Burn → Released
                    └─ safety flag → Crisis (support resources, no ritual)
```

## Next steps

1. Complete the formal trademark check for Saruru (KIPO / EUIPO / USPTO / app stores / domains / handles).
2. Validate the two make-or-break assumptions (efficacy/frequency, willingness to pay) — see the plan's 4-week validation roadmap.
3. Scaffold the Expo app from the tech spec.

---

*Not a medical, therapy, crisis, or diagnostic service. A self-reflection and emotional decompression tool.*
