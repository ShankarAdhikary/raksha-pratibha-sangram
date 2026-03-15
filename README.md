# Raksha Pratibha Sangram

A multi-round quiz competition system built for Rashtriya Raksha University.

## Features

- **4 Rounds of Competition:**
  - Round 1: Global Horizon (All teams answer simultaneously)
  - Round 2: Grid Matrix (Category-based grid selection)
  - Round 3: Risk Corridor (Betting/wagering round)
  - Round 4: Blitzkrieg (Buzzer round - lowest score team excluded)

- **Real-time Display:** Projector-ready display with live scores
- **Mobile Buzzers:** Teams can buzz from their phones via WebSocket
- **Host Control Panel:** Full control over questions, scoring, and game flow
- **Manual Answer Selection:** Host can manually select answers for all rounds

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   node server.js
   ```

3. Open in browser:
   - **Host Panel:** http://localhost:3000/index.html
   - **Display:** http://localhost:3000/display.html
   - **Buzzers:** http://localhost:3000/buzzer.html?team=1

## File Structure

```
Quiz/
├── index.html      # Host control panel
├── display.html    # Projector display
├── buzzer.html     # Mobile buzzer for teams
├── server.js       # WebSocket server
├── css/
│   ├── host.css    # Host panel styles
│   └── display.css # Display styles
├── js/
│   └── questions.js # Question bank
└── images/
    └── rru-logo.png # University logo
```

## Usage

1. Open Host Panel and Display in separate browser windows
2. Configure team names in Setup
3. Click "Connect Buzzer Server" for mobile buzzers
4. Start each round and control the game flow

## License

MIT License - Rashtriya Raksha University
