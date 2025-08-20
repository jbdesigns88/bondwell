# AI Folder – Developer Documentation

> TypeScript · Pluggable Providers · Streaming-friendly

---

## 1) What this module does

This folder exposes a small, provider‑agnostic AI client with a common interface (`BaseAI`) and a concrete OpenAI implementation (`OpenAI`). It gives you:

- A single entry point (`AI`) that returns the active provider instance.
- A minimal lifecycle: `connect()` → `addSettings()` → `create()`.
- Support for both streaming and non‑streaming responses (depending on provider settings).
- A simple way to add more providers later (Anthropic, Google, local LLMs, etc.).

---

## 2) Folder structure

```
AI/
├─ AI.ts          # Public entry point & provider selector
├─ BaseAI.ts      # Abstract base + interface contract
└─ OpenAI.ts      # OpenAI provider (SDK: openai)
```

---

## 3) Quick start

### Install deps

```bash
npm i openai
```

### Environment

Set your OpenAI API key:

```bash
export OPENAI_API_KEY=sk-...
```

### Basic usage

```ts
import { AI } from "./AI";

async function run() {
  // 1) Pick provider (default is 'openai')
  const ai = new AI();

  // 2) Connect the client (reads env, creates SDK client)
  ai.connect();

  // 3) Configure settings as needed (messages, model, etc.)
  ai.addSettings({
    model: "gpt-4",
    stream: true,
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Write a haiku about TypeScript." },
    ],
  });

  // 4) Send request
  await ai.create(
    "ignoredMsgString",
    (chunk) => process.stdout.write(chunk), // on data
    () => console.log("\n[completed]")      // on complete
  );
}

run().catch(console.error);
```

> **Note**: In the current implementation, `create(msg)` does **not** inject `msg` into `messages`; you should pass prompts via `addSettings({ messages: [...] })`. See the “Design notes” section for options.

---

## 4) Public API

### `class BaseAI`

Contract every provider must satisfy.

```ts
interface BaseAiInterface {
  create: (msg: string, onData: (response: any) => void, onComplete: () => void) => Promise<void>;
  connect: () => void;
  addSettings: (data: Record<string, any>) => void;
}
```

- **connect()**: Prepare the client (e.g., read API keys, instantiate SDKs). Should throw if required config is missing.
- **addSettings(data)**: Shallow‑merge provider settings.
- **create(msg, onData, onComplete)**: Execute a generation request. Providers decide whether to stream or return a single blob. Must call `onComplete()` exactly once on success. On errors, should `throw` or pass an error via the callback pattern consistently.

### `class AI extends BaseAI`

```ts
new AI(provider?: 'openai');
```

- Valid `provider` keys are defined in `Providers` inside `AI.ts`.
- Returns the concrete provider instance (subclass of `BaseAI`).
- Throws if provider key is invalid.

### `class OpenAI extends BaseAI`

Settings (defaults inside `OpenAI.ts`):

```ts
{
  model: "gpt-4",
  temperature: 1,
  max_tokens: 2048,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  stream: true,
  messages: []
}
```

- **connect()**: Reads `process.env.OPENAI_API_KEY`, creates an `OpenAI` SDK instance.
- **addSettings(data)**: Shallow‑merges into the settings object.
- **create(msg, onData, onComplete)**:
  - Calls `this.ai.chat.completions.create(this.settings)`.
  - If `stream: true`, iterates the async stream and calls `onData(partialContent)` per chunk; then `onComplete()`.
  - If not streaming, iterates choices and calls `onData(fullContent)`; then `onComplete()`.
  - On error, logs to console and invokes `onData("Error: Unable to process the request at this time.")`.

---

## 5) Usage patterns

### A) Non‑streaming responses

```ts
ai.addSettings({ stream: false, messages: [...] });
await ai.create("ignored", (full) => console.log(full), () => console.log("done"));
```

### B) Streaming to a web client (pseudo‑code)

```ts
// Express route
app.post("/chat", async (req, res) => {
  const ai = new AI();
  ai.connect();
  ai.addSettings({ messages: req.body.messages, stream: true });

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");

  await ai.create(
    "ignored",
    (chunk) => res.write(`data: ${JSON.stringify({ chunk })}\n\n`),
    () => res.end()
  );
});
```

### C) Switching providers (future‑ready)

```ts
// today (only openai)
const ai = new AI('openai');

// tomorrow
// const ai = new AI('anthropic');
```

---

## 6) Adding a new provider

Create `Anthropic.ts` (example skeleton):

```ts
import { BaseAI } from "./BaseAI";

export class Anthropic extends BaseAI {
  private settings = { /* anthropic params */ };
  private client: any;

  connect() {
    // init anthropic SDK, env checks, etc.
  }

  addSettings(data: Record<string, any>) {
    this.settings = { ...this.settings, ...data };
  }

  async create(msg: string, onData: (s: string) => void, onComplete: () => void) {
    // call provider API (streaming/non‑streaming)
    // onData(...) per chunk or once, then onComplete()
  }
}
```

Then register it in `AI.ts`:

```ts
import { Anthropic } from "./Anthropic";
const Providers = {
  openai: new OpenAI(),
  anthropic: new Anthropic(),
} as const;
```

---

## 7) Error handling & edge cases

- **Missing API key**: `connect()` throws `"Must provide a valid API Key"`.
- **Not connected**: `create()` throws `"OpenAI client not connected."`.
- **Invalid provider key**: `new AI('bad')` throws `"the provider_type is not valid"`.
- **Empty messages**: OpenAI requires a non‑empty `messages` array; surface a helpful error before calling the SDK (see “Hardening ideas”).

---

## 8) Design notes (current vs. recommended)

**Current:** `create(msg, ...)` does not inject `msg` into `settings.messages`.

**Option A – keep as is**

- Treat `msg` as ignored and always pass full chat state via `addSettings({ messages })`.

**Option B – append user message automatically (recommended)** Update `OpenAI.create` to push `msg` as a `user` message if provided and `settings.messages` is empty or you want to append:

```ts
if (msg && (!this.settings.messages || this.settings.messages.length === 0)) {
  this.settings.messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: msg },
  ];
}
```

This improves ergonomics for one‑off prompts while preserving full control when callers pass `messages` explicitly.

---

## 9) Security & production tips

- **Never** log secrets. If you keep `console.log("Settings...", this.settings)`, redact tokens.
- Consider making logging conditional on `NODE_ENV !== 'production'`.
- Validate inputs: ensure `messages` is an array of `{ role, content }`.
- Add timeouts/retries/backoff at the provider layer to avoid hanging requests.
- Normalize errors to a consistent shape so callers can act on them.

---

## 10) JSDoc/TSdoc suggestions (copy‑paste)

Add these to your classes for inline API docs and editor intellisense.

```ts
/** Provider‑agnostic AI client interface. Implemented by all providers. */
export class BaseAI implements BaseAiInterface {
  /**
   * Execute a generation call.
   * @param msg - Optional convenience prompt. Some providers may ignore this if messages are set.
   * @param callback - Called with streaming chunks or the full response content.
   * @param complete - Called exactly once when the stream/response is finished.
   */
  public async create(
    msg: string,
    callback: (response: any) => void,
    complete: () => void
  ): Promise<void> { throw new Error("Method not implemented."); }

  /** Establish underlying SDK connections or perform setup. */
  public connect() {}

  /** Merge provider‑specific settings (model, messages, temperature, etc.). */
  public addSettings(data: Record<string, any>) {}
}
```

```ts
/** OpenAI provider using the official `openai` SDK. */
export class OpenAI extends BaseAI {
  /** Initialize SDK client using OPENAI_API_KEY. */
  public connect(): void { /* ... */ }

  /**
   * Merge runtime settings such as model, temperature, and messages.
   * @example addSettings({ model: 'gpt-4o', messages: [...] })
   */
  public addSettings(data?: Record<string, any>): void { /* ... */ }

  /**
   * Create a chat completion. Streams tokens if `stream: true`.
   * Calls `callback(token)` per chunk and `completed()` once when done.
   */
  public async create(
    msg: string,
    callback: (data: string) => void,
    completed: () => void
  ) { /* ... */ }
}
```

---

## 11) Hardening ideas (backlog)

- Validate `settings.messages` shape before calling SDK; throw with actionable message.
- Enforce `onComplete()` even on certain non‑fatal errors (using `finally`).
- Support aborts via `AbortController` to cancel long generations.
- Add a typed `Settings` interface per provider to avoid `Record<string, any>`.
- Return structured events: `{ type: 'delta'|'done'|'error', data }` instead of raw strings.
- Provide a utility to build messages (system/user/assistant helpers).

---

## 12) Minimal UML (high‑level)

```
+-----------+          +-----------------+
|  BaseAI   |<---------|  OpenAI (impl)  |
+-----------+          +-----------------+
| create()  |          | connect()       |
| connect() |          | addSettings()   |
| addSettings()        | create()        |
+-----------+          +-----------------+
        ^
        | returns instance
    +-------+
    |  AI   |
    +-------+
```

---

## 13) FAQ

**Q: Why doesn’t ****\`\`**** show up in the prompt?** A: By design, prompts are passed via `settings.messages`. Either inject `msg` yourself before calling, or adopt “Option B” in Design notes.

**Q: How do I get non‑streaming behavior?** A: Set `stream: false` in `addSettings`.

**Q: Can I swap the model at runtime?** A: Yes—`ai.addSettings({ model: 'gpt-4o-mini' })` before `create()`.

**Q: How do I add Anthropic/Gemini?** A: Implement a subclass of `BaseAI`, then register it in `AI.ts` `Providers`.

---

## 14) Changelog intent

This doc describes the initial public contract of the module as of *today*. Update this file whenever you:

- Add a provider
- Change settings shape
- Modify streaming behavior
- Introduce breaking changes to the `BaseAI` contract

