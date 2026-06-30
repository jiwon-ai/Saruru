# Saruru — MVP Technical Spec (v1)

> Scope: the **core loop only** — Home → Capture → Reframe (Claude) → Melt → Released, plus a Crisis path. Privacy-first, text input (voice = OS keyboard dictation), no audio, no accounts required to start. AI backend = **Anthropic Claude** via a secure proxy. Everything not in this doc (paywall, B2B, patterns, multilingual) is deferred.

---

## 1. Principles (carried from the plan)

1. **Local-first.** Entries live on-device. No server stores emotional text. Delete-after-melt is ON by default.
2. **No audio.** Voice input is the OS keyboard's dictation into a normal text field. The app never records, uploads, or stores audio. No STT library.
3. **Closure, not rumination.** The AI is tuned to release the moment, not rehearse comebacks. Response scripts are optional and secondary.
4. **Key never ships in the app.** The Anthropic API key lives only in a tiny server proxy. The mobile app calls the proxy, never Anthropic directly.
5. **Safety first.** Every AI response includes a crisis flag. If set, the app skips the ritual and shows support resources.

---

## 2. Stack

| Layer | Choice | Note |
|-------|--------|------|
| App | **Expo (React Native) + TypeScript** | `npx create-expo-app` |
| Navigation | **expo-router** (file-based) | Or a simple `useState` screen machine for the first build |
| Local storage | **expo-sqlite** (or `expo-secure-store` for tiny data) | On-device only |
| Animation | **react-native-reanimated** (+ Lottie later) | Melt ritual |
| AI backend | **Anthropic Claude** via proxy | See §6 |
| Proxy | **Cloudflare Worker** (or Supabase Edge Function) | Holds the API key |
| State | React state + a small store (Zustand) | Keep it minimal |

Model: start with **`claude-haiku-4-5-20251001`** (cheap, fast) for the single reframe call. Upgrade specific calls to Sonnet only if reframe quality needs it. (Verify the current model id before launch.)

---

## 3. Folder structure

```
preburn/
  app/                      # expo-router screens
    index.tsx               # Home
    capture.tsx             # Capture
    reframe.tsx             # Reframe (calls AI)
    melt.tsx                # Melt ritual
    released.tsx            # Closing screen
    crisis.tsx              # Safety path
  src/
    services/
      aiClient.ts           # fetch() to the proxy
      storage.ts            # expo-sqlite CRUD
    state/
      store.ts              # current incident, settings
      types.ts              # Incident, ReframeResult
    components/
      EmotionChips.tsx
      MeltAnimation.tsx
      PrimaryButton.tsx
    theme.ts                # colors, spacing
  server/
    worker.ts               # Cloudflare Worker proxy (key lives here)
  app.json
```

---

## 4. Data model

```ts
// src/state/types.ts
export type EmotionTag =
  | 'humiliated' | 'anger' | 'shame' | 'helpless'
  | 'anxiety' | 'resentment' | 'exhaustion' | 'sadness';

export type Incident = {
  id: string;
  createdAt: number;
  text: string;                 // user input (typed or dictated)
  emotions: EmotionTag[];
  category?: string;            // restaurant, cafe, retail, callcenter, ...
  reframe?: ReframeResult;
  status: 'draft' | 'reframed' | 'melted';
  meltedAt?: number;
};

export type ReframeResult = {
  neutral_summary: string;
  possible_interpretation: string;
  not_your_responsibility: string;
  why_it_stung: string;
  closure_reframe: string;
  boundary_line: string | null; // optional, secondary
  melt_line: string;        // short line shown on the melting object
  safety: { flag: boolean; reason: string | null };
};

export type Settings = {
  deleteAfterMelt: boolean;     // default true
};
```

**Delete-after-melt (default ON):** when an incident is melted, the `text` and `reframe` are erased; only `{ id, meltedAt }` is kept so the streak count works. If the user turns it OFF, the entry is kept in a private local archive (Plus feature later).

---

## 5. Screens & flow

```
Home ──"New melt"──▶ Capture ──"Continue"──▶ Reframe ──"Melt it"──▶ Melt ──▶ Released ──▶ Home
                                              │
                                              └─ safety.flag = true ─▶ Crisis
```

- **Home (`index`)** — app name, streak count (`N days, residue released`), one calm line, `+ New melt` button. Privacy lock badge visible.
- **오늘의 마무리 / Nightly wind-down (habit layer)** — optional evening entry on Home ("오늘 녹일 거 있어요?") → Capture. Optional bedtime reminder + guilt-free daily streak. Mitigates Risk A (sporadic use).
- **Capture (`capture`)** — `TextInput` (multiline) titled "What happened?"; the keyboard's mic button gives dictation for free. Optional `EmotionChips`. `Continue` → save draft, go to Reframe.
- **Reframe (`reframe`)** — on mount, call `getReframe(incident)`. Show a loading state, then render `not_your_responsibility`, `why_it_stung`, `closure_reframe`. `boundary_line` shown only if present, as a small secondary card. `Melt it` → Melt. **If `safety.flag` → replace this screen with Crisis.**
- **Melt (`melt`)** — render the incident as a paper/receipt object showing `melt_line`; Reanimated sequence softens → blurs → melts away to nothing. Then Released.
- **Released (`released`)** — "Melted away. You do not have to carry this." Run delete-after-melt if enabled. Increment streak. Back to Home.
- **Crisis (`crisis`)** — calm message, no ritual, jurisdiction-aware support resources (configurable list). Never silently continue.

---

## 6. AI: Claude reframe call

### 6.1 Security (non-negotiable)
The app calls **your proxy**, the proxy calls Anthropic with the secret key. Never embed the key in the app bundle (it is trivially extractable).

```ts
// server/worker.ts (Cloudflare Worker) — minimal
export default {
  async fetch(req: Request, env: { ANTHROPIC_API_KEY: string }) {
    if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
    const { text, emotions } = await req.json();

    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 700,
        system: SYSTEM_PROMPT,            // §6.2
        messages: [{
          role: 'user',
          content: `Emotions: ${(emotions ?? []).join(', ') || 'none'}\n\nIncident:\n${text}`,
        }],
      }),
    });
    const data = await r.json();
    // Claude returns content[0].text — expected to be the JSON from §6.3
    const raw = data?.content?.[0]?.text ?? '';
    return new Response(raw, { headers: { 'content-type': 'application/json' } });
  },
};
```

```ts
// src/services/aiClient.ts
import type { ReframeResult } from '../state/types';

export async function getReframe(input: { text: string; emotions: string[] }): Promise<ReframeResult> {
  const res = await fetch('https://YOUR-PROXY-URL/reframe', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  });
  const json = await res.json();
  return validateReframe(json); // throw/fallback if shape is wrong
}
```

### 6.2 System prompt (the heart of the product)

```
You are the reflection engine inside Saruru, a privacy-first emotional
decompression tool for customer-facing workers. The user describes a difficult
interaction. Your goal is to help them reach CLOSURE — release the moment — not
to rehearse revenge or judge the other person.

Rules:
1. Offer only a POSSIBLE interpretation of the other person's behavior. Never
   assert what they "definitely" meant.
2. Clearly separate what was and was NOT the user's responsibility.
3. Name why it stung — briefly and precisely.
4. End with a closure-oriented reframe: release, not grievance.
5. A next-time "boundary_line" is OPTIONAL and secondary. Keep it calm and
   non-combative — never a comeback or a way to "win." Use null if not helpful.
6. No medical or clinical claims. You are not a therapist or a diagnostic tool.
7. SAFETY: if the text indicates self-harm, suicidal intent, intent to harm
   others, or acute crisis, set safety.flag = true, safety.reason = short reason,
   and do NOT produce a normal reframe (leave the reflective fields brief/empty).
8. Keep each field to 1–2 sentences. Warm, plain, never sentimental.

Output ONLY valid JSON matching the schema. No prose outside the JSON.
```

### 6.3 Output schema (Claude must return exactly this)

```json
{
  "neutral_summary": "string",
  "possible_interpretation": "string",
  "not_your_responsibility": "string",
  "why_it_stung": "string",
  "closure_reframe": "string",
  "boundary_line": "string or null",
  "melt_line": "string",
  "safety": { "flag": false, "reason": null }
}
```

Validate on the client: if JSON is malformed or fields are missing, show a graceful fallback ("Take a breath — try again") rather than a broken screen. (Optional hardening later: use Claude tool-use / structured outputs to force the schema.)

### 6.4 Cost control
- One Claude call per melt. Haiku keeps it cheap; that single call also does safety detection (no separate model needed for v1).
- Cap free-tier melts; the AI call is the only real variable cost. (Monetization deferred — see plan.)

---

## 7. Privacy & safety implementation checklist

- [ ] No analytics SDK that ships incident text off-device. If you add analytics, send only anonymous events (e.g. `melt_completed`), never the text.
- [ ] Proxy logs **nothing** containing the incident text. Disable request-body logging.
- [ ] Delete-after-melt default ON; offer explicit "keep in private archive" opt-in.
- [ ] Consent screen before first AI call: "Your text is sent to our AI provider to generate a reflection, then discarded. We never use it for ads and never sell it."
- [ ] UI guidance: discourage real names of customers/workplaces ("describe what happened, not who").
- [ ] Crisis path wired and tested with sample inputs before any release.
- [ ] Disclaimer in onboarding + settings: not a medical/therapy/crisis service.

---

## 8. Build steps (today)

1. `npx create-expo-app@latest preburn` (TypeScript template). `cd preburn`.
2. `npx expo install expo-router expo-sqlite react-native-reanimated zustand`
3. Create the folders in §3; start with the five screens as static UI (use the mockup as reference).
4. Wire navigation (expo-router) and the `useState` incident in a Zustand store.
5. Deploy the Worker (§6.1) with `ANTHROPIC_API_KEY` as a secret; set `YOUR-PROXY-URL`.
6. Implement `getReframe` and render real output on the Reframe screen.
7. Add the melt animation (start simple: fade + scale; polish later).
8. Implement delete-after-melt + streak.
9. Test the Crisis path with deliberately crisis-flagged text.
10. Run on device: `npx expo start` → Expo Go.

---

## 9. Open technical decisions (decide as you go)

1. **Navigation:** expo-router (recommended) vs. a `useState` screen machine for the very first build.
2. **Proxy host:** Cloudflare Worker vs. Supabase Edge Function vs. a tiny Vercel function — pick what you already use.
3. **Streak storage:** keep only `{date}` of each melt; nothing else if delete-after-melt is on.
4. **Structured output hardening:** plain-JSON prompt now; migrate to Claude tool-use for guaranteed schema later.
5. **Offline:** the melt ritual itself should work offline; only the reframe needs network. Consider a non-AI "quick melt" that skips Claude (also your future free tier).

---

*This spec is the build target for v1. Keep it honest to the plan: closure over rumination, privacy as the product, the API key never in the app.*
