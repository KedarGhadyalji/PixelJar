# ⚡ PixelJar

PixelJar is a production-grade, highly responsive multi-language code playground and cloud execution engine built with **Next.js 15 (App Router)**, **Clerk**, and **Convex**.

The platform provides a zero-setup, ultra-low latency environment for developers to write, compile, and execute scripts instantly across 10+ sandboxed runtimes. It features professional micro-interactions, hardware-accelerated route transitions, and a customized, physics-based developer sticker login canvas.

---

## 🚀 Key Features

- **Isolated Cloud Sandboxing:** Server-side sandboxed runtime execution proxying high-performance API telemetry.
- **Premium Coding Workspace:** Tabbed editor layout utilizing the Monaco Editor engine with fully customizable themes (Monokai, VS Dark), tab spaces, and font variables.
- **Innovative Sticker Login Layer:** Full-screen custom Clerk authentication panel surrounded by reactive, draggable programming language stickers built with real vinyl-peel border shadows and spring physics.
- **Cinematic Route Transitions:** Seamless cross-fading, micro-staggers, and smooth hardware-accelerated page transitions using Framer Motion that completely eliminate layout flickering.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Authentication:** Clerk Auth (Bespoke element overrides + custom unified theme)
- **Database & Reactive State:** Convex DB (Live background syncing for document graphs)
- **Animations:** Framer Motion (Spring physics, drag boundaries, path crossfades)
- **Styling & Icons:** Tailwind CSS + Lucide React Icons

---

## ⚙️ Development Setup Lifecycle

Follow these steps to spin up a local instance of PixelJar on your machine.

### 1. Environmental Prerequisites

Verify that your operating system contains stable installations of **Node.js v18.0.0+** and **npm**:

```bash
node --version
npm --version
```

### 2. Repository Installation

```bash
git clone https://github.com/KedarGhadyalji/PixelJar
cd pixeljar
npm install
```

### 3. Environment Configuration

Create a local configuration secrets file in the root folder by copying the workspace sample:

```bash
cp .env.sample .env.local
```

Open .env.local inside your text editor and populate the missing credential placeholders for Clerk, Convex, and your sandboxed execution APIs.

### 4. Database & Development Run

Initialize the Convex database synchronization monitor process inside a separate terminal window to track mutations and queries:

```bash
npx convex dev
```

In your primary terminal, start up the local system environment compiler powered by Next.js Turbopack:

```bash
npm run dev
```

Once the compilation settles, open your web browser and navigate to http://localhost:3000.

## 🗺️ Project Structure

```text
src/
├── app/
│   ├── (auth)/             # Full-screen customized identity authentication routes
│   │   └── sign-in/        # Centered Clerk layout with movable vinyl stickers
│   ├── (root)/             # Main playground dashboard layout
│   │   ├── _components/    # Editor panels, terminal output, and headers
│   │   └── page.tsx        # Responsive landing page / workspace switcher
│   ├── layout.tsx          # Global identity hydration wrappers & loading panels
│   └── globals.css         # Custom scroll behaviors and universal variables
├── components/
│   ├── providers/          # Convex and Clerk provider configuration nodes
│   └── PageTransition.tsx  # Pathname-aware spring layout animator
└── hooks/
    └── useMounted.tsx      # Prevents client-server hydration drift mismatches
```

## 🤝 Contributing & Code Review Policy

I absolutely love community input and welcome your ideas to help scale PixelJar's compilers, execution layers, and playground features! To ensure the stability of the platform, **direct commits to the main branch are restricted.** If you would like to contribute, please fork the repository, commit your changes to a feature branch, and submit a Pull Request. Every submission undergoes a manual code review to verify performance and design alignment. Please be patient while your changes are evaluated—your code will be safely merged into the main development line as soon as it receives explicit maintainer approval.

## 📜 License

Distributed under the conditions of the MIT License. Review the root LICENSE file for extensive metadata parameters.
