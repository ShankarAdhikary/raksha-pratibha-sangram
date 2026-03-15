// ============================================================
// Quiz Buzzer WebSocket Server
// ============================================================
// Run: node server.js
// Serves static files AND provides WebSocket for buzzer comms
// ============================================================

const http = require('http');
const fs = require('fs');
const path = require('path');
const { WebSocketServer } = require('ws');

const PORT = process.env.PORT || 3000;
const STATIC_DIR = __dirname;

// MIME types for static file serving
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// ============================================================
// HTTP Server (static files)
// ============================================================
const server = http.createServer((req, res) => {
    // Sanitize URL to prevent path traversal
    let urlPath = decodeURIComponent(req.url.split('?')[0]);
    if (urlPath === '/') urlPath = '/index.html';

    // Resolve and ensure the path stays within STATIC_DIR
    const filePath = path.resolve(STATIC_DIR, '.' + urlPath);
    if (!filePath.startsWith(path.resolve(STATIC_DIR))) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('Not Found');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

// ============================================================
// WebSocket Server
// ============================================================
const wss = new WebSocketServer({ server });

// Connected clients
const buzzerClients = new Map();  // teamIdx -> ws
let hostClient = null;

// Buzzer state
let buzzerActive = false;
let buzzedTeam = -1;
let currentQuestion = null;
let currentRoundInfo = '';
let teamNames = ['Team 1', 'Team 2', 'Team 3', 'Team 4'];

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (rawData) => {
        let msg;
        try {
            msg = JSON.parse(rawData.toString());
        } catch (e) {
            return;
        }

        switch (msg.type) {
            // --- Registration ---
            case 'REGISTER_BUZZER':
                handleBuzzerRegister(ws, msg);
                break;

            case 'REGISTER_HOST':
                hostClient = ws;
                ws._role = 'host';
                console.log('Host connected');
                // Send current buzzer client count
                ws.send(JSON.stringify({
                    type: 'BUZZER_CLIENTS',
                    count: buzzerClients.size,
                    teams: Array.from(buzzerClients.keys())
                }));
                break;

            // --- From buzzer clients ---
            case 'BUZZ':
                handleBuzz(ws, msg);
                break;

            // --- From host ---
            case 'ENABLE_BUZZERS':
                handleEnableBuzzers(msg);
                break;

            case 'DISABLE_BUZZERS':
                handleDisableBuzzers(msg);
                break;

            case 'BUZZ_RESULT':
                handleBuzzResult(msg);
                break;

            case 'QUESTION_OVER':
                handleQuestionOver();
                break;

            case 'R1_SEND_OPTIONS':
                handleR1SendOptions(msg);
                break;

            case 'R1_ANSWER':
                handleR1Answer(ws, msg);
                break;

            case 'UPDATE_TEAM_NAMES':
                teamNames = msg.names || teamNames;
                broadcastToBuzzers({ type: 'TEAM_NAMES', names: teamNames });
                break;
        }
    });

    ws.on('close', () => {
        if (ws._role === 'host') {
            hostClient = null;
            console.log('Host disconnected');
        } else if (ws._role === 'buzzer') {
            buzzerClients.delete(ws._teamIdx);
            console.log(`Team ${ws._teamIdx + 1} buzzer disconnected`);
            // Notify host
            if (hostClient && hostClient.readyState === 1) {
                hostClient.send(JSON.stringify({
                    type: 'BUZZER_CLIENTS',
                    count: buzzerClients.size,
                    teams: Array.from(buzzerClients.keys())
                }));
            }
        }
    });
});

function handleBuzzerRegister(ws, msg) {
    const teamIdx = msg.teamIdx;
    if (teamIdx < 0 || teamIdx > 3) return;

    ws._role = 'buzzer';
    ws._teamIdx = teamIdx;
    buzzerClients.set(teamIdx, ws);
    console.log(`Team ${teamIdx + 1} buzzer registered`);

    // Send team names
    ws.send(JSON.stringify({ type: 'TEAM_NAMES', names: teamNames }));

    // Send current buzzer state
    if (buzzerActive && buzzedTeam < 0) {
        ws.send(JSON.stringify({
            type: 'BUZZER_READY',
            question: currentQuestion,
            roundInfo: currentRoundInfo
        }));
    } else {
        ws.send(JSON.stringify({
            type: 'BUZZER_DISABLED',
            reason: 'Waiting for next question…'
        }));
    }

    // Notify host
    if (hostClient && hostClient.readyState === 1) {
        hostClient.send(JSON.stringify({
            type: 'BUZZER_CLIENTS',
            count: buzzerClients.size,
            teams: Array.from(buzzerClients.keys())
        }));
    }
}

function handleBuzz(ws, msg) {
    if (!buzzerActive || buzzedTeam >= 0) {
        ws.send(JSON.stringify({
            type: 'BUZZ_REJECTED',
            reason: buzzedTeam >= 0 ? `${teamNames[buzzedTeam]} buzzed first!` : 'Buzzer not active'
        }));
        return;
    }

    buzzedTeam = msg.teamIdx;
    buzzerActive = false;

    // Confirm to the buzzing team
    ws.send(JSON.stringify({ type: 'BUZZ_CONFIRMED' }));

    // Notify all other buzzers
    buzzerClients.forEach((client, idx) => {
        if (idx !== msg.teamIdx && client.readyState === 1) {
            client.send(JSON.stringify({
                type: 'BUZZER_DISABLED',
                buzzedTeam: msg.teamIdx
            }));
        }
    });

    // Notify host
    if (hostClient && hostClient.readyState === 1) {
        hostClient.send(JSON.stringify({
            type: 'REMOTE_BUZZ',
            teamIdx: msg.teamIdx,
            timestamp: msg.timestamp
        }));
    }

    console.log(`Team ${msg.teamIdx + 1} BUZZED!`);
}

function handleEnableBuzzers(msg) {
    buzzerActive = true;
    buzzedTeam = -1;
    currentQuestion = msg.question || null;
    currentRoundInfo = msg.roundInfo || '';

    broadcastToBuzzers({
        type: 'BUZZER_READY',
        question: msg.question,
        qLabel: msg.qLabel,
        roundInfo: msg.roundInfo
    });

    console.log('Buzzers ENABLED');
}

function handleDisableBuzzers(msg) {
    buzzerActive = false;
    broadcastToBuzzers({
        type: 'BUZZER_DISABLED',
        reason: msg.reason || 'Buzzer disabled'
    });
}

function handleBuzzResult(msg) {
    // Forward result to the buzzed team
    const teamWs = buzzerClients.get(msg.teamIdx);
    if (teamWs && teamWs.readyState === 1) {
        teamWs.send(JSON.stringify({
            type: 'RESULT',
            correct: msg.correct
        }));
    }
}

function handleQuestionOver() {
    buzzerActive = false;
    buzzedTeam = -1;
    currentQuestion = null;
    broadcastToBuzzers({ type: 'QUESTION_OVER' });
}

function handleR1SendOptions(msg) {
    const teamIdx = msg.teamIdx;
    const teamWs = buzzerClients.get(teamIdx);
    if (teamWs && teamWs.readyState === 1) {
        teamWs.send(JSON.stringify({
            type: 'R1_OPTIONS',
            question: msg.question,
            options: msg.options,
            qLabel: msg.qLabel,
            timeLimit: msg.timeLimit || 60
        }));
    }
}

function handleR1Answer(ws, msg) {
    if (hostClient && hostClient.readyState === 1) {
        hostClient.send(JSON.stringify({
            type: 'R1_REMOTE_ANSWER',
            teamIdx: msg.teamIdx,
            selectedOption: msg.selectedOption,
            timestamp: msg.timestamp
        }));
    }
}

function broadcastToBuzzers(msg) {
    const data = JSON.stringify(msg);
    buzzerClients.forEach((client) => {
        if (client.readyState === 1) {
            client.send(data);
        }
    });
}

// ============================================================
// Start Server
// ============================================================
server.listen(PORT, '0.0.0.0', () => {
    const os = require('os');
    const interfaces = os.networkInterfaces();
    let localIP = 'localhost';

    // Find LAN IP
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                localIP = iface.address;
                break;
            }
        }
    }

    console.log('');
    console.log('==============================================');
    console.log('  QUIZ BUZZER SERVER RUNNING');
    console.log('==============================================');
    console.log('');
    console.log(`  Host Panel:    http://${localIP}:${PORT}/index.html`);
    console.log(`  Display:       http://${localIP}:${PORT}/display.html`);
    console.log(`  Buzzer (T1):   http://${localIP}:${PORT}/buzzer.html?team=1&server=${localIP}:${PORT}`);
    console.log(`  Buzzer (T2):   http://${localIP}:${PORT}/buzzer.html?team=2&server=${localIP}:${PORT}`);
    console.log(`  Buzzer (T3):   http://${localIP}:${PORT}/buzzer.html?team=3&server=${localIP}:${PORT}`);
    console.log(`  Buzzer (T4):   http://${localIP}:${PORT}/buzzer.html?team=4&server=${localIP}:${PORT}`);
    console.log('');
    console.log('  All devices must be on the same WiFi network.');
    console.log('==============================================');
    console.log('');
});
