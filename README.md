<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)"  srcset="assets/hero-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/hero-light.svg">
  <img alt="Milan Marek — AI & Product Developer · Prague, Czechia" src="assets/hero-dark.svg" width="100%">
</picture>

</div>

<br>

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)"  srcset="assets/whoami-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/whoami-light.svg">
  <img alt="$ milan --whoami — AI & Product Developer in Prague. Treats LLMs as production components, not demos. Ships kCalori on the App Store and Next.js platforms for clients." src="assets/whoami-dark.svg" width="100%">
</picture>

</div>

<br>

## ◇ &nbsp;Things I've shipped

<table>
<tr>
<td width="50%">

<a href="https://apps.apple.com/app/id6760182041?pt=128627423&amp;ct=github&amp;mt=8">
<picture>
  <source media="(prefers-color-scheme: dark)"  srcset="assets/card-kcalori-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/card-kcalori-light.svg">
  <img alt="kCalori — iOS calorie tracker on the App Store. Local-first, no account needed. SwiftUI shell around a JS core in WKWebView, HealthKit sync, AI coaching via a Claude proxy." src="assets/card-kcalori-dark.svg" width="100%">
</picture>
</a>

</td>
<td width="50%">

<picture>
  <source media="(prefers-color-scheme: dark)"  srcset="assets/card-platforms-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/card-platforms-light.svg">
  <img alt="Marketing platforms — Next.js App Router rebuilds in TypeScript and Tailwind, Drizzle on Postgres, hardened server actions, consent-gated analytics." src="assets/card-platforms-dark.svg" width="100%">
</picture>

</td>
</tr>
<tr>
<td width="50%">

<picture>
  <source media="(prefers-color-scheme: dark)"  srcset="assets/card-configurator-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/card-configurator-light.svg">
  <img alt="Product configurator — B2C configurator that turns a messy price list into a four-step flow and drops a qualified lead in the CRM. Ships as an iframe widget onto partner sites." src="assets/card-configurator-dark.svg" width="100%">
</picture>

</td>
<td width="50%">

<picture>
  <source media="(prefers-color-scheme: dark)"  srcset="assets/card-infra-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/card-infra-light.svg">
  <img alt="Hosting and runbooks — a shared VPS carrying around 70 client sites: deploys, PHP tuning, backups, TLS, DNS and incidents, each fix written down as a runbook." src="assets/card-infra-dark.svg" width="100%">
</picture>

</td>
</tr>
</table>

<br>

## ◇ &nbsp;Toolbox

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)"  srcset="assets/stack-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/stack-light.svg">
  <img alt="Stack — TypeScript, JavaScript, Swift, PHP, SQL, Bash · Next.js, React, Tailwind, SwiftUI, Node.js, WordPress · PostgreSQL, Drizzle ORM, Cloudflare D1, SQLite · Claude API, MCP servers, Agent SDK, prompt eval · Vercel, Cloudflare, Docker, Linux VPS, PostHog" src="assets/stack-dark.svg" width="100%">
</picture>

</div>

<br>

## ◇ &nbsp;How I work

```diff
+ Ship it, then polish against real usage — not before
+ Content in data files, so the people who own the words can change them
+ If it isn't measured it didn't happen — events and UTMs from day one
+ Check the contrast ratio before falling in love with the brand colour
+ Write the runbook while the incident is still fresh
- Six months of building in private, hoping
```

<details>
<summary><b>◇ &nbsp;What I actually mean by "LLMs as production components"</b></summary>

<br>

A model call is just an unreliable network dependency with a good vocabulary. So it gets
treated like one:

| Concern | How it's handled |
| :-- | :-- |
| **Cost** | Prompts through a proxy I own, so the key never ships to a client and spend is capped per user. |
| **Latency** | Stream early, cache aggressively, and never block a screen on a completion. |
| **Failure** | Every AI surface has a non-AI path. If the model is down, the app still works. |
| **Correctness** | Structured output with a schema, validated before it reaches a UI. Retry on mismatch, not on vibes. |
| **Privacy** | Nothing personal leaves the device that didn't need to. |

The interesting engineering isn't the prompt. It's everything wrapped around it.

</details>

<br>

## ◇ &nbsp;Find me

<div align="center">

<a href="https://www.linkedin.com/in/milanmarekmm">
<picture>
  <source media="(prefers-color-scheme: dark)"  srcset="assets/chip-linkedin-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/chip-linkedin-light.svg">
  <img alt="LinkedIn — Milan Marek" src="assets/chip-linkedin-dark.svg" height="52">
</picture>
</a>
&nbsp;
<a href="https://kcalori.cz">
<picture>
  <source media="(prefers-color-scheme: dark)"  srcset="assets/chip-site-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/chip-site-light.svg">
  <img alt="Website — kcalori.cz" src="assets/chip-site-dark.svg" height="52">
</picture>
</a>
&nbsp;
<a href="https://apps.apple.com/app/id6760182041?pt=128627423&amp;ct=github&amp;mt=8">
<picture>
  <source media="(prefers-color-scheme: dark)"  srcset="assets/chip-appstore-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/chip-appstore-light.svg">
  <img alt="App Store — get kCalori" src="assets/chip-appstore-dark.svg" height="52">
</picture>
</a>

</div>

<br>

<div align="center">
<sub>Most of what I build lives in private client repos — the public surface here is thin on purpose.<br>
Happy to walk through any of it.</sub>
<br><br>
<sub><code>assets/build.mjs</code> generates every graphic on this page in both themes — <code>node assets/build.mjs</code>.</sub>
</div>
