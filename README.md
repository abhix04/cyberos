# CyberOS // Virtual Browser Desktop Environment

A lightweight, browser-based virtual operating system built with Node.js and vanilla ES6 JavaScript. CyberOS simulates a futuristic desktop environment complete with an active matrix rain background, draggable windows, a fully functional terminal emulator, and local utility apps—all served directly from a local Node server.

## Features

* **Desktop Environment:** Interactive grid layout supporting custom app launcher shortcuts.
* **Draggable Window Manager:** Fluid, multi-window UI with minimization, expansion, and close states.
* **Interactive Terminal:** Functional shell emulator supporting commands like `help`, `clear`, `status`, `matrix`, `date`, and `echo`.
* **Notepad Application:** Integrated text scratchpad for notes and code snippets.
* **Matrix Rain Engine:** Real-time HTML5 canvas background data stream animation optimized for CPU performance.
* **System Diagnostics:** Live resource monitor tracking simulated CPU and RAM usage alongside a real-time clock.

## Tech Stack

| Component | Technology |
| --- | --- |
| **Backend / Host** | Node.js (`http` module) |
| **Frontend Rendering** | HTML5 Canvas, CSS3 Grid/Flexbox |
| **Logic & Scripting** | Vanilla ES6 JavaScript (Object-Oriented Architecture) |
| **Styling & Fonts** | Google Fonts (Orbitron, JetBrains Mono) |

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation & Local Execution

1. Clone your repository or save the server code locally as `server.js`:
```bash
git clone https://github.com/your-username/cyberos.git
cd cyberos

```


2. Start the local server via Node.js:
```bash
node server.js

```


3. Open your preferred browser and navigate to:
```text
http://localhost:3000

```



## Built-In Terminal Commands

| Command | Description |
| --- | --- |
| `help` | Displays the list of available shell commands |
| `clear` | Clears the terminal output screen |
| `status` | Prints current system operational status |
| `matrix` | Initiates visual data stream override sequence |
| `date` | Displays the current local system timestamp |
| `echo [text]` | Prints back user-specified text string |
