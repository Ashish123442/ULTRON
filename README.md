\# ULTRON



\*Personal AI, Accessible Anywhere.\*



Ultron is my customised, local-first personal AI assistant. It runs entirely on my own machine: no cloud AI, no data leaving the house. It has its own personality, its own voice and its own interface.



\## What it does



\- \*\*Local chat:\*\* runs on Ollama with the `qwen3.5:2b` model.

\- \*\*Voice in:\*\* speech-to-text with faster-whisper (offline).

\- \*\*Voice out:\*\* text-to-speech with Kokoro (offline), using a deep male voice.

\- \*\*Personality:\*\* calm, dry and sardonic, but helpful. Addresses the owner as "Mr. Singh" or "sir".

\- \*\*Interface:\*\* custom crimson ULTRON web interface and icons.

\- \*\*Access from the phone:\*\* reachable only over a private Tailscale tunnel.



\## Requirements



\- Windows 10 or 11, Python 3.12, Node.js, Rust, uv

\- \[Ollama](https://ollama.com) with `qwen3.5:2b` pulled

\- Tailscale, if you want phone access



\## Starting Ultron



Use two Command Prompt windows.



Window A (backend):



```

cd /d D:\\Ultron

D:\\Ultron\\.venv\\Scripts\\activate

set OPENJARVIS\_MODEL=qwen3.5:2b

jarvis serve --port 8000

```



Window B (frontend):



```

cd /d D:\\Ultron\\frontend

npm run dev -- --host 127.0.0.1

```



Then open http://localhost:5173.



Do not use `uv run` or `uv sync`. They remove the Rust extension and the Kokoro voice package.



\## Roadmap



\- Android app and Siri-style assistant mode

\- "Hey Ultron" offline wake word

\- PC-off mode with a small on-phone model that syncs back to the PC

\- Custom tools and memory



\## Credit



Ultron is a fork of \[OpenJarvis](https://github.com/open-jarvis/OpenJarvis) by the Stanford OpenJarvis team, used under the Apache 2.0 licence. The original README is kept in \[README\_OPENJARVIS.md](README\_OPENJARVIS.md).

