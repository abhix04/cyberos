const http = require('http');

const PORT = 3000;
const HOST = 'localhost';

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CYBER_OS // v2.4.0 [SECURE ENVIRONMENT]</title>
            <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;700&family=Orbitron:wght@500;800&display=swap" rel="stylesheet">
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body, html {
                    width: 100%;
                    height: 100%;
                    background-color: #030206;
                    color: #00f3ff;
                    font-family: 'JetBrains Mono', monospace;
                    overflow: hidden;
                }

                /* Canvas Matrix Background */
                #matrixCanvas {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: 1;
                    pointer-events: none;
                }

                /* OS Top Bar */
                .top-bar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 35px;
                    background: rgba(5, 4, 12, 0.9);
                    border-bottom: 1px solid rgba(0, 243, 255, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 20px;
                    z-index: 1000;
                    backdrop-filter: blur(10px);
                    font-size: 11px;
                }

                .top-bar-left, .top-bar-right {
                    display: flex;
                    gap: 20px;
                    align-items: center;
                }

                .os-logo {
                    font-family: 'Orbitron', sans-serif;
                    font-weight: 800;
                    color: #ff2a85;
                    letter-spacing: 2px;
                    text-shadow: 0 0 8px rgba(255, 42, 133, 0.6);
                }

                .sys-stat span {
                    color: #ff2a85;
                }

                /* Desktop Workspace */
                .desktop {
                    position: relative;
                    width: 100vw;
                    height: calc(100vh - 35px);
                    top: 35px;
                    z-index: 10;
                    padding: 30px;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                    grid-auto-rows: 100px;
                    gap: 20px;
                    pointer-events: auto;
                }

                .desktop-icon {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: rgba(18, 16, 38, 0.4);
                    border: 1px solid rgba(0, 243, 255, 0.15);
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    backdrop-filter: blur(5px);
                }

                .desktop-icon:hover {
                    background: rgba(0, 243, 255, 0.1);
                    border-color: #00f3ff;
                    box-shadow: 0 0 15px rgba(0, 243, 255, 0.3);
                    transform: translateY(-3px);
                }

                .icon-symbol {
                    font-size: 24px;
                    margin-bottom: 6px;
                }

                .icon-label {
                    font-size: 10px;
                    letter-spacing: 1px;
                    color: #fff;
                }

                /* Window Framework */
                .window {
                    position: absolute;
                    top: 100px;
                    left: 150px;
                    width: 600px;
                    height: 400px;
                    background: rgba(8, 7, 18, 0.88);
                    border: 1px solid rgba(255, 42, 133, 0.4);
                    border-radius: 10px;
                    box-shadow: 0 0 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 42, 133, 0.15);
                    backdrop-filter: blur(15px);
                    display: none;
                    flex-direction: column;
                    z-index: 100;
                    overflow: hidden;
                    resize: both;
                }

                .window.active {
                    display: flex;
                }

                .window-header {
                    background: rgba(18, 16, 38, 0.95);
                    padding: 10px 15px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid rgba(255, 42, 133, 0.3);
                    cursor: move;
                }

                .window-title {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 11px;
                    letter-spacing: 1.5px;
                    color: #ff2a85;
                }

                .window-controls {
                    display: flex;
                    gap: 8px;
                }

                .win-btn {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    border: none;
                    cursor: pointer;
                }

                .win-close { background: #ff5f56; }
                .win-minimize { background: #ffbd2e; }
                .win-expand { background: #27c93f; }

                .window-body {
                    flex: 1;
                    padding: 20px;
                    overflow-y: auto;
                    font-size: 13px;
                    color: #d1d5db;
                }

                /* Terminal App Styling */
                .terminal-output {
                    height: calc(100% - 30px);
                    overflow-y: auto;
                    margin-bottom: 10px;
                    white-space: pre-wrap;
                    line-height: 1.4;
                }

                .terminal-input-line {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .terminal-input {
                    flex: 1;
                    background: transparent;
                    border: none;
                    color: #00f3ff;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 13px;
                    outline: none;
                }

                /* Notepad App */
                .notepad-textarea {
                    width: 100%;
                    height: 100%;
                    background: transparent;
                    border: none;
                    color: #00f3ff;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 13px;
                    outline: none;
                    resize: none;
                }
            </style>
        </head>
        <body>

            <!-- OS Top Status Bar -->
            <div class="top-bar">
                <div class="top-bar-left">
                    <span class="os-logo">CYBER_OS</span>
                    <span class="sys-stat">CPU: <span id="cpuUsage">14</span>%</span>
                    <span class="sys-stat">RAM: <span id="ramUsage">4.2</span>GB</span>
                </div>
                <div class="top-bar-right">
                    <span id="liveClock">00:00:00</span>
                </div>
            </div>

            <!-- Background Matrix Simulation -->
            <canvas id="matrixCanvas"></canvas>

            <!-- Desktop Icons Grid -->
            <div class="desktop">
                <div class="desktop-icon" onclick="openWindow('terminalWindow')">
                    <div class="icon-symbol">💻</div>
                    <div class="icon-label">Terminal</div>
                </div>
                <div class="desktop-icon" onclick="openWindow('notepadWindow')">
                    <div class="icon-symbol">📝</div>
                    <div class="icon-label">Notes.txt</div>
                </div>
                <div class="desktop-icon" onclick="openWindow('statsWindow')">
                    <div class="icon-symbol">📊</div>
                    <div class="icon-label">Diagnostics</div>
                </div>
            </div>

            <!-- Window 1: Interactive Terminal -->
            <div class="window active" id="terminalWindow" style="top: 80px; left: 80px; width: 650px; height: 380px;">
                <div class="window-header" onmousedown="dragElement(event, 'terminalWindow')">
                    <span class="window-title">TERMINAL // root@cyber-os</span>
                    <div class="window-controls">
                        <button class="win-btn win-minimize" onclick="closeWindow('terminalWindow')"></button>
                        <button class="win-btn win-expand"></button>
                        <button class="win-btn win-close" onclick="closeWindow('terminalWindow')"></button>
                    </div>
                </div>
                <div class="window-body">
                    <div class="terminal-output" id="termOutput">CyberOS Kernel v2.4 initialized. Type 'help' for available commands.\n</div>
                    <div class="terminal-input-line">
                        <span>root@cyber:~#</span>
                        <input type="text" class="terminal-input" id="termInput" autofocus onkeydown="handleTerminalCommand(event)">
                    </div>
                </div>
            </div>

            <!-- Window 2: Notepad -->
            <div class="window" id="notepadWindow" style="top: 140px; left: 300px; width: 500px; height: 350px;">
                <div class="window-header" onmousedown="dragElement(event, 'notepadWindow')">
                    <span class="window-title">NOTEPAD // scratchpad.txt</span>
                    <div class="window-controls">
                        <button class="win-btn win-minimize" onclick="closeWindow('notepadWindow')"></button>
                        <button class="win-btn win-expand"></button>
                        <button class="win-btn win-close" onclick="closeWindow('notepadWindow')"></button>
                    </div>
                </div>
                <div class="window-body" style="padding: 0;">
                    <textarea class="notepad-textarea" placeholder="Type your notes or code snippets here..."></textarea>
                </div>
            </div>

            <!-- Window 3: Diagnostics Panel -->
            <div class="window" id="statsWindow" style="top: 180px; left: 450px; width: 450px; height: 300px;">
                <div class="window-header" onmousedown="dragElement(event, 'statsWindow')">
                    <span class="window-title">SYSTEM DIAGNOSTICS</span>
                    <div class="window-controls">
                        <button class="win-btn win-close" onclick="closeWindow('statsWindow')"></button>
                    </div>
                </div>
                <div class="window-body">
                    <p style="color: #ff2a85; margin-bottom: 10px;">HARDWARE STATUS:</p>
                    <p>Core Architecture: x64 Virtual Node</p>
                    <p>Engine Runtime: Node.js / HTML5 Canvas</p>
                    <p>Memory Allocation: Optimized (CPU-friendly)</p>
                    <p style="margin-top: 15px; color: #00f3ff;">Status: All systems fully operational and responsive.</p>
                </div>
            </div>

            <script>
                // Live Clock and Resource Simulator
                setInterval(() => {
                    const now = new Date();
                    document.getElementById('liveClock').innerText = now.toTimeString().split(' ')[0];
                    document.getElementById('cpuUsage').innerText = Math.floor(Math.random() * 25) + 10;
                }, 1000);

                // Window Management Logic
                function openWindow(id) {
                    document.getElementById(id).classList.add('active');
                }

                function closeWindow(id) {
                    document.getElementById(id).classList.remove('active');
                }

                // Interactive Terminal Command Processor
                function handleTerminalCommand(e) {
                    if (e.key === 'Enter') {
                        const inputField = document.getElementById('termInput');
                        const outputBox = document.getElementById('termOutput');
                        const val = inputField.value.trim().toLowerCase();

                        outputBox.innerText += '\\nroot@cyber:~# ' + inputField.value + '\\n';

                        if (val === 'help') {
                            outputBox.innerText += 'Available commands: help, clear, status, matrix, date, echo [text]\\n';
                        } else if (val === 'clear') {
                            outputBox.innerText = '';
                        } else if (val === 'status') {
                            outputBox.innerText += 'System nominal. CPU load stable. Memory active.\\n';
                        } else if (val === 'matrix') {
                            outputBox.innerText += 'Initiating visual data stream override...\\n';
                        } else if (val === 'date') {
                            outputBox.innerText += new Date().toString() + '\\n';
                        } else if (val.startsWith('echo ')) {
                            outputBox.innerText += val.substring(5) + '\\n';
                        } else if (val !== '') {
                            outputBox.innerText += 'Command not recognized: ' + val + '. Type "help" for options.\\n';
                        }

                        inputField.value = '';
                        outputBox.scrollTop = outputBox.scrollHeight;
                    }
                }

                // Matrix Canvas Background
                const canvas = document.getElementById('matrixCanvas');
                const ctx = canvas.getContext('2d');
                let width = canvas.width = window.innerWidth;
                let height = canvas.height = window.innerHeight;

                window.addEventListener('resize', () => {
                    width = canvas.width = window.innerWidth;
                    height = canvas.height = window.innerHeight;
                });

                const letters = '01ABCDEF#$_-<>*+~XYZ';
                const fontSize = 12;
                const columns = Math.floor(width / fontSize);
                const drops = Array(columns).fill(1);

                function drawMatrix() {
                    ctx.fillStyle = 'rgba(3, 2, 6, 0.1)';
                    ctx.fillRect(0, 0, width, height);

                    ctx.fillStyle = '#00f3ff';
                    ctx.font = fontSize + 'px monospace';

                    for (let i = 0; i < drops.length; i++) {
                        const text = letters.charAt(Math.floor(Math.random() * letters.length));
                        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                        if (drops[i] * fontSize > height && Math.random() > 0.975) {
                            drops[i] = 0;
                        }
                        drops[i]++;
                    }
                }
                setInterval(drawMatrix, 40);

                // Simple Draggable Window Logic
                function dragElement(e, winId) {
                    const win = document.getElementById(winId);
                    let startX = e.clientX;
                    let startY = e.clientY;

                    function onMouseMove(moveEvent) {
                        let dx = moveEvent.clientX - startX;
                        let dy = moveEvent.clientY - startY;
                        startX = moveEvent.clientX;
                        startY = moveEvent.clientY;
                        win.style.top = (win.offsetTop + dy) + 'px';
                        win.style.left = (win.offsetLeft + dx) + 'px';
                    }

                    function onMouseUp() {
                        window.removeEventListener('mousemove', onMouseMove);
                        window.removeEventListener('mouseup', onMouseUp);
                    }

                    window.addEventListener('mousemove', onMouseMove);
                    window.addEventListener('mouseup', onMouseUp);
                }
            </script>
        </body>
        </html>
    `);
});

server.listen(PORT, HOST, () => {
    console.log(`[OK] CyberOS Environment running at http://${HOST}:${PORT}`);
});