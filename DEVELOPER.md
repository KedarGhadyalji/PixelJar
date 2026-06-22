# ⚡ PixelJar: Developer Documentation & System Architecture

Welcome to the definitive engineering guide for **PixelJar**. This document provides a comprehensive breakdown of how the platform operates under the hood, divided into four core architectural pillars.

---

# 📘 Part 1: The Reactive Data Layer & Identity Synchronization

This document explains how PixelJar handles user accounts and saves code execution history. Instead of using a traditional, slow database setup where the app constantly has to ask the server "is there new data?", PixelJar uses **Convex**, which acts like a live wire—instantly pushing data updates to the screen the second they happen.

---

## 🗺️ The Data Flow (How It Works)

When a user signs up or runs code, the data moves through a clear, secure pipeline:

```text
[1. User Action] ──────► [2. Security Check] ──────► [3. Database Update] ──────► [4. Real-Time UI]
(Sign Up / Run Code)     (Verify Identity)           (Save to Tables)            (Screen updates instantly)
```

# 🔍 Detailed Breakdown of the System

## 1. The Database Blueprint (`schema.ts`)

The database is structured into two simple, distinct spreadsheets (called tables):

### `users` Table

Keeps track of who is logged in. It stores:

- Unique user ID
- Email address
- Name

### `codeExecutions` Table

Acts as a history logbook. Every time a user runs code, it logs:

- Programming language
- Raw code string
- Results (successful output or error messages)

### Speed Optimization (Indexing)

An index (`by_user_id`) is attached to both tables.

Think of this like the index at the back of a textbook. Instead of scanning the entire database line-by-line to find a user's code history, the system jumps directly to their records in **less than 10 milliseconds**.

---

## 2. Automatic Account Setup (`http.ts` & `users.ts`)

When a user signs up on the login page via Clerk, their account information needs to be stored in the database.

### The Webhook Trigger

Clerk sends a secure background message (a **Webhook**) to the server indicating:

> "A new user just signed up!"

### The Guard (Svix)

Before processing the webhook, the server uses **Svix** to verify a secret signature.

This prevents malicious actors from sending fake signup requests to the database.

### The Safe Saver (`syncUser`)

Once the webhook is verified, a mutation called `syncUser`:

1. Checks whether the user already exists.
2. Creates a new account record if they do not.

---

## 3. Saving History & Calculating Stats (`codeExecutions.ts`)

### Authorized Saving Only

When a user clicks **Run Code**, the system verifies their active login token.

If someone attempts to submit a request without being authenticated, the database immediately blocks it.

### Smart Dashboard Analytics

The system automatically calculates personalized coding statistics, including:

- Total executions
- Activity during the last 24 hours
- Most frequently used programming language

Instead of forcing the browser to download thousands of execution logs and calculate these metrics locally—which would slow down the user's device—the database performs the calculations in the cloud and returns a small, lightweight summary.

---

# 🛡️ Errors and Failures Handled Safely

## Malformed Data Protection

If a user modifies the client-side code and attempts to send invalid data types (for example, an object or number instead of a code string), Convex rejects the request before it can corrupt the database.

## Infinite Scroll Safety

If a user has executed code **5,000+ times**, loading the entire history at once could overwhelm the webpage.

To prevent this, the system uses a **Pagination Validator** that streams execution history in small, manageable batches (for example, **10 records at a time**) as the user scrolls.

# 🎒 Part 2: The Execution Engine & Context Topology (Simplified Guide)

This section explains how PixelJar captures user code inside the Monaco browser window, syncs the code state to a centralized store, securely passes that data through an application proxy barrier, and executes it inside sandboxed compiler environments.

---

## 🗺️ The Compilation Pipeline (How It Works)

When a developer clicks the "Run Code" button, data routes through a production-grade infrastructure mesh before displaying output telemetry:

```text
 [1. Monaco Engine] ──────► [2. Zustand Global Store] ──────► [3. Next.js API Proxy] ──────► [4. JDoodle Sandbox API]
  Captures raw strings       Manages cross-tab states,        Applies Clerk auth guards,     Compiles isolated script,
  and updates UI themes      handles validation errors       normalizes data models         returns clean stdout/stderr
```

# 🔍 Detailed Breakdown of the System

## 1. The Dynamic State Nervous System (`useCodeEditorStore.ts` & `index.ts` Type Models)

PixelJar relies on a lightweight Zustand store to govern active execution states globally without relying on expensive component drilling.

### Server-Side Hydration Guard

The store leverages an explicit `getInitialState()` methodology. It verifies if `typeof window === "undefined"` to prevent compilation failures during Next.js server-side rendering (SSR). If running on the client, it restores previous workspace configurations from `localStorage`.

### State Persistence Hooks

Every time a developer adjusts the typography parameters, editor themes, or switches runtimes, the store hooks automatically mirror values back down to browser memory. Crucially, switching languages caches your uncompiled code to separate keys (`editor-code-[language]`), ensuring your work isn't wiped out when jumping between Python and TypeScript.

### Typing Infrastructure (`types/index.ts`)

Defines clear interfaces mapping compilation contracts (`ExecuteCodeResponse`), telemetry data (`ExecutionResult`), and application store configurations (`CodeEditorState`) using explicit type variables.

## 2. Secure Serverless Cloud Ingestion (`route.ts`)

Instead of allowing public browsers to directly communicate with third-party sandbox engines—which would expose system API secrets—all data passes through an isolated Next.js API route acting as a proxy layer.

### Payload Normalization Map

The incoming JSON payload contains generic runtime definitions. The server utilizes a dictionary lookup (`JDOODLE_LANGUAGE_MAP`) to seamlessly map internal playground tags to native compiling tags (e.g., matching standard javascript to JDoodle's target nodejs version indexing models).

### Environment Variable Obfuscation

The configuration requests fetch structural keys directly from private platform variables (`process.env.JDOODLE_CLIENT_ID / JDOODLE_CLIENT_SECRET`) entirely within server layers, keeping execution parameters secure.

### Response Normalization Transformer

Different sandbox providers stream back completely different compilation properties. The proxy interceptor extracts execution details, reads output vectors for internal warnings, and reformats the response into a unified format that the frontend store can read without breaking.

## 3. Middleware Handshakes & Static Vocabularies (`middleware.ts` & `constants`)

### API Access Protection

The global configuration file assigns specific routing matchers to track system entry paths, protecting backend execution pathways from unauthorized scripting bots while skipping static image or icon assets.

### Language Starter Anchors (`_constants/index.ts`)

Holds explicit runtime instructions for every environment, accompanied by pre-formatted, production-ready default template scripts (`defaultCode`). These snippets introduce newcomers to functional language operations (like `map`, `filter`, and `reduce` calculations) the moment they open a fresh sandbox window.

### Monaco Visual Themes Engine

Provides custom syntactic rule parameters for token coloring maps (including comments, strings, and operators) to mount deep ide interfaces like GitHub Dark or Monokai onto Monaco instances safely.

# 🛡️ Errors and Failures Handled Safely

## Empty Parameter Validation

If a user triggers a compilation loop on an empty text window, the Zustand engine aborts the asynchronous fetch lifecycle immediately, caching an informative layout warning to save network bandwidth.

## Runtime Interception Isolation

The POST route explicitly catches internal status boundaries or compilation syntax failures. If an application loop panics inside the isolated container, the proxy flags `run.code !== 0`, converts the stdout logs into structural system strings, and cleanly passes error descriptions directly to your output tracking console.

# 💻 Part 3: Workspace Composition & Reactive Components (Simplified Guide)

This section details how PixelJar handles front-end layout orchestration, reactive authentication view swapping, Monaco Editor integration, and terminal streaming telemetry.

---

## 🗺️ Visual Component Tree (How It Works)

When a developer loads the root window, an internal authentication guard determines whether to mount the premium documentation preview or instantiate the full state sandbox:

```text
               ┌──────────────────────── Home (page.tsx) ────────────────────────┐
               │                                                                 │
       [Unauthenticated]                                                  [Authenticated]
               │                                                                 │
      ┌────────┴────────┐                                               ┌────────┴────────┐
      ▼                 ▼                                               ▼                 ▼
[Hero Section]   [IDE Preview]                                     [Header Component] [Split Work Grid]
                                                                                          │
                                                                             ┌────────────┴────────────┐
                                                                             ▼                         ▼
                                                                     [EditorPanel.tsx]         [OutputPanel.tsx]
                                                                     (Monaco Context)          (Console Console)
```

# 🔍 Detailed Breakdown of the System

## 1. Unified Entry Layout Router (`src/app/(root)/page.tsx`)

The primary index module serves as a client-side layout coordinator using Clerk's active subscription hooks.

### Authentication Split-Brain Routing

Leverages Clerk's `useAuth()` hook to build an immediate gate. If `isSignedIn` evaluates to true, the browser completely releases the heavy landing elements from the DOM tree, instantly rendering the workspace layout.

### Layout Transition Protection

Wrapped inside Framer Motion's `<AnimatePresence mode="wait">`. When moving from the unauthorized dashboard into the logged-in IDE workspace, old components gracefully phase out with an opacity and scale drift, removing severe DOM visual jumps.

### Drift Protection Layer

Integrates your custom `useMounted` check. This stalls the rendering of structural client interfaces until the initial browser layout tick finishes, ensuring the application matches server-side HTML baselines accurately.

## 2. High-Performance Monaco Canvas Interceptor (`EditorPanel.tsx`)

The editing panel establishes an isolated sandbox canvas context layer capable of processing multi-language inputs.

### Rerender Preservation Pipeline

The model uses an analytical `useEffect` array linked directly to the store's global language state. When you change runtimes, a handler automatically saves your active buffer string down to local storage before loading your previous scripts or default boilerplates into the new workspace.

### Granular Typography Calibration

Integrates an HTML range tracking element directly with the state store. Developers can dynamically slide line sizes between a safe `12px` min and `24px` max boundaries, pushing real-time configuration overrides directly into Monaco's options engine.

### Fine-Tuned Text Rendering Engine

The `<Editor />` instance overrides native rendering defaults, forcing standard developer aesthetics such as disabling unnecessary line mini-maps, activating smooth cursor blinking, embedding ligatures ("Fira Code"), and configuring optimized line-height ratios.

## 3. High-Contrast Stream Terminal (`OutputPanel.tsx`)

The output element behaves like an interactive terminal shell console to track errors or process standard script telemetry.

### Conditional Terminal Sub-States

Tracks compilation properties using strict rendering pipelines:

#### `isRunning` Engine State

Instantly strips static elements to overlay a compilation loader skeleton.

#### `error` Presence State

Mounts an execution failure banner complete with layout caution tags and wraps stack traces inside standard `<pre />` tags.

#### `output` Stream State

Emits an emerald-green verification badge alongside formatted stdout data logs.

### Clipboard Streaming Integrator

Features a copy interaction handler utilizing `navigator.clipboard.writeText`. It evaluates active data boundaries and temporarily holds success states (`Copied!`) inside local UI parameters for 2 seconds.

# 🛡️ Errors and Failures Handled Safely

## Skeleton Loading Buffers

If third-party modules take several seconds to fetch authentication handshakes, the application suppresses unstyled element pops by loading custom loading block skeletons.

## Scroll Horizon Clipping

Large standard output streams can potentially break parent layout dimensions. The shell console container uses explicit bounding rules (`h-150 overflow-auto`) and text-wrapping configurations (`whitespace-pre-wrap`) to safely restrict execution feedback within the viewport.

# 🎨 Part 4: Motion Physics & Hydration Barriers (Simplified Guide)

This final segment breaks down PixelJar’s high-fidelity aesthetic, gesture-driven sticker physics, fluid route crossfading, and security/hydration guards that prevent flickering layouts.

---

## 🗺️ Visual Physics Canvas (How It Works)

The layout uses absolute container dimensions to calculate drag gestures, bounding boxes, and security tokens:

```text
┌──────────────────────── Viewport Constraints Box (useRef) ────────────────────────┐
│                                                                                   │
│   [TS Sticker] ──► (Drags smoothly / Spring deceleration) ──► Hits Border Bounce   │
│                                                                                   │
│                    ┌─────── Elevated Auth Layer (z-40) ───────┐                   │
│                    │                                          │                   │
│                    │       [Clerk Customized Form Elements]   │                   │
│                    │       Wiped out whites -> Deep Obsidian  │                   │
│                    │                                          │                   │
│                    └──────────────────────────────────────────┘                   │
│                                                                                   │
└───────────────────────────────────────────────────────────────────────────────────┘
```

# 🔍 Detailed Breakdown of the System

## 1. Gesture Dynamics & Clerk Deep Overrides (`sign-in/page.tsx`)

The sign-in controller coordinates fluid interactive modules directly over a centralized Clerk layout engine.

- **Movable Pointer Listeners:** Individual language containers utilize Framer Motion's hardware-accelerated tracking parameters (`drag`). By attaching an anchor template reference (`constraintsRef`), stickers can be thrown across the screen but are constrained from flying entirely out of view.

- **Spring-Back Physics Vector Matrix:** The cards integrate strict drag modifiers (`dragElastic={0.2}`). When caught by a mouse pull or dropped outside basic layout structures, they ease to a stop or snap back using realistic inertia coefficients (`stiffness: 260`, `damping: 20`).

- **Deep UI Style Erasure:** Clerk widgets default to light modes inside closed shadow domains. The `appearance.elements` prop passes direct class lists straight to deep inner tree elements (such as `socialButtonsBlockButton` and `formInput`), replacing standard frames with custom `#08080d` deep dark options.

## 2. Cinematic Page-Aware Crossfader (`PageTransition.tsx`)

The route transition manager intercepts platform state switches to replace traditional component flashing with smooth animations.

- **Path-Bound Layout Keys:** Uses the browser's current path mapping location (`usePathname()`) as a structural animation target (`key={pathname}`). This tells Next.js to hold the visual instance of an old route during unmounting, facilitating clean multi-page transition handshakes.

- **Multi-Layer Blur Filtering:** Rather than relying solely on simple opacity fades, transitions apply a synchronized combination of horizontal scaling (`scale: 0.98`), structural opacity shifting, and soft canvas blurs (`filter: "blur(8px)"`).

- **Elite Bezier Interceptors:** Movement acceleration is mapped to a high-end cubic-bezier curve string (`ease: [0.25, 1, 0.5, 1]`), ensuring animations match the premium look of top-tier SaaS platforms.

## 3. Hydration Protection & Sync Handshakes (`ConvexClientProvider.tsx` & Hooks)

- **Secure Auth Hydration Bridging:** The application wraps its execution tree inside a specialized `<ConvexProviderWithClerk />` container. This configuration prevents deep application database calls from executing until Clerk successfully decodes and matches secure session tokens.

- **Hydration Flash Blocker (`useMounted.tsx`):** Servers compute HTML states differently than client browsers, often causing font shifts or broken layout blocks during initial page reads. The custom `useMounted` system hooks into a local micro-state that remains `false` until the layout mounts on the client, suppressing rendering flickers.

- **Modern Style Directives (`globals.css`):** Employs the updated `@import "tailwindcss"` layer management tools. It assigns smooth navigation scrolling rules across the view hierarchy and forces universal rendering parameters for custom background assets.

# 🛡️ Errors and Failures Handled Safely

- **Pointer Clipping Recovery:** If cursor movements slip past sticker coordinates during high-velocity drag interactions, Framer Motion’s internal event loop retains tracking focus, preventing draggable cards from freezing on the screen.

- **Server-Side Variable Drift:** The client provider uses a definite asset string indicator (`NEXT_PUBLIC_CONVEX_URL!`) on its environment variable. This forces compile-time script failures if server credentials are configuration-checked incorrectly, keeping broken code from reaching staging pipelines.
