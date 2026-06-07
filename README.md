# 🍣 sushi-commit-js

A *blazingly fast*, zero-overhead, AI-powered CLI utility that inspects your local `git diff` alterations and automatically crafts precise, structured **Conventional Commits**. Powered by the lightning-fast efficiency of Bun and Claude Haiku.

---

## ✨ Features

* **⚡ Zero Compilation Overhead:** Built natively on top of the modern **Bun** runtime.
* **🧠 High-Fidelity Context Analysis:** Uses Claude Haiku to summarize code alterations with high engineering intelligence.
* **🛡️ Type-Safe Guardrails:** Enforces structural data validity using strict runtime **Zod** schema validations.
* **📋 Conventional Commits Standard:** Guarantees all generated messages perfectly adhere to strict prefix constraints (`feat:`, `fix:`, `chore:`, etc.).
* **🎨 Local Formatting Sync:** Configured out-of-the-box with ESLint and Prettier for flawless layout save compliance.

---

## 🚀 Quick Start

### Global Installation via npm

You can install `sushi-commit` globally on your operating system using your preferred package manager:

```bash
npm install -g sushi-commit-js
# or using Bun natively
bun add --global sushi-commit-js
```

### 🛠️ Usage
Simply execute the workspace binary script inside any active local Git repository where you have unstaged or staged file changes:

```bash
sushi-commit
```

## 📦 For Contributors & Local Development
If you want to clone this repository, tweak the agent loop, or test out alternative local LLM execution endpoints, setting up your kitchen takes seconds.

### 🔑 Environment Configuration
*sushi-commit-js* automatically securely pulls credentials directly from your terminal environment variables or a local project configurations file.

Make a `.env` file or export your Anthropic credential token:
```bash
ANTHROPIC_API_KEY=sk-ant-api03-...your_secret_token...
```

1. Install Dependencies

```bash
bun install
```

2. Run Local Development Checks

```bash
# Run the pipeline locally on your current repository files
bun run src/index.ts

# Trigger the production bundler to output universally compatible JavaScript
bun run build
```

## 📜 License
Distributed under the MIT License.