# EchoTrace
A Memory‑Reconstruction Web App

## Overview

EchoTrace is a web application that helps users reconstruct incomplete memories by organizing fragmented details into a clear, interactive timeline. Users enter short memory fragments, and the system analyzes clues like time, location, sensory details, and contradictions to build a structured "memory map."

## Features

- **Memory Fragment Input**: Add detailed descriptions of memory fragments
- **Intelligent Analysis**: Automatically extracts:
  - Temporal clues (dates, seasons, times of day)
  - Location information (places, landmarks)
  - Sensory details (smells, sounds, textures, colors)
  - Emotional context
- **Interactive Timeline**: Displays memory fragments organized by temporal clues
- **Memory Map**: Visual analysis showing all extracted clues organized by category
- **Smart Prompts**: Context-aware questions to help unlock more details
- **Contradiction Detection**: Identifies conflicting information across fragments
- **Dynamic Updates**: Real-time timeline refresh as new fragments are added
- **Local Storage**: Memories are saved in your browser

## How to Use

### Quick Start

1. Open `index.html` in a web browser
2. Enter a memory fragment in the text area
3. Click "Add Fragment"
4. Watch as the timeline and memory map update automatically

### Running with a Local Server

For the best experience, serve the application using a local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Tips for Better Memory Reconstruction

1. **Include Temporal Clues**: Mention dates, seasons, times of day, or years
2. **Describe Locations**: Include places, buildings, or landmarks
3. **Add Sensory Details**: What did you see, hear, smell, taste, or touch?
4. **Note Emotions**: How did you feel during this memory?
5. **Be Specific**: More details lead to better analysis
6. **Follow Smart Prompts**: Use the suggested questions to unlock more details

### Example Memory Fragments

```
I remember the smell of coffee on a cold December morning in 2019. 
The cafe was on Main Street, and snow was falling outside.
```

```
Summer evening, around 2015. I was at the beach with friends. 
The sound of waves and laughter. Felt peaceful and happy.
```

```
Cold night in winter. Walking downtown. Street lights reflected 
off wet pavement. I was nervous about something.
```

## Technology

- Pure HTML, CSS, and JavaScript (no build tools required)
- Local storage for data persistence
- Responsive design for mobile and desktop
- No external dependencies

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Privacy

All data is stored locally in your browser. No information is sent to any server. Your memories remain completely private.

## License

MIT License - See LICENSE file for details
