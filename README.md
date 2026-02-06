# EchoTrace - Memory Reconstruction & Dream Analysis

**EchoTrace** is an innovative web application that helps you reconstruct and understand your memories through intelligent analysis and dream interpretation.

## Features

### 🧠 Memory Fragments
- Add detailed memory fragments with sensory details, locations, and temporal clues
- Automatically extract and categorize memory information
- Build a timeline of your memories

### 💭 Dream Interpretation
- Automatic dream detection from memory fragments
- 10+ common dream symbols with psychological meanings:
  - 🦷 Teeth - Anxiety, transitions, power
  - 📉 Falling - Fear, loss of control
  - 🛸 Flying - Freedom, ambition, escape
  - 💧 Water - Emotions, purification, life changes
  - 🏃 Being Chased - Avoidance, fear
  - 💀 Death - Transformation, rebirth
  - 🏠 House - Your psyche, safety
  - 🦁 Animals - Instincts, personal qualities
  - 🗺️ Being Lost - Confusion, direction
  - 👹 Monsters - Facing fears, shadow self

### 🗺️ Memory Map Analysis
- **Temporal Clues**: Extract dates, seasons, times of day
- **Locations**: Identify geographic references
- **Sensory Details**: Track smells, sounds, textures, colors
- **Dream Analysis**: Interpret dream symbols
- **Contradiction Detection**: Find conflicting information in memories

### 💡 Smart Prompts
- Intelligent suggestions based on missing information
- Contextual questions to unlock deeper memories
- Adaptive prompts that evolve as you add more fragments

### 🗑️ Memory Management
- Delete memory fragments if needed
- All data is stored locally in your browser (localStorage)
- Privacy-first design - no data sent to external servers

## How to Use

1. **Add a Memory Fragment**: Describe a memory in the textarea, including as many details as possible
2. **View Your Timeline**: See all memories organized and ranked by temporal specificity
3. **Explore Dream Meanings**: If you describe a dream, automatic symbol detection provides interpretations
4. **Review Analysis**: Check the Memory Map Analysis section for extracted details
5. **Ask Questions**: Follow the smart prompts to expand and clarify your memories

## Quick Start

### Online (Hosted on Render)
Visit the deployed application at: https://echotrace.onrender.com

### Local Development

```bash
# Install dependencies
npm install

# Start the server
npm start
```

Visit `http://localhost:3000` in your browser.

### Using Python
```bash
python -m http.server 8000
```

Then open `http://localhost:8000`

## Example Memory Format

```
I remember a dream where my teeth were falling out at random. Every time I bit into something, another tooth would drop. I felt anxious and kept trying to hold them in place.
```

When you add this, EchoTrace will:
- Detect it as a dream (💭 Dream tag)
- Extract the "teeth" symbol
- Provide interpretations like: "Anxiety or stress", "Loss of control", "Transition or change"

## Technology

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Storage**: Browser localStorage for local persistence
- **Analysis**: Pattern matching and natural language analysis
- **Deployment**: Node.js on Render

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Privacy

All your memories and dreams are stored locally in your browser. No data is sent to any external servers or databases. You have complete control over your personal information.

## License

MIT License - See LICENSE file for details
