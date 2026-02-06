// Memory Fragment Data Model
class MemoryFragment {
    constructor(text, id = null) {
        this.id = id || Date.now();
        this.text = text;
        this.timestamp = new Date();
        this.analysis = this.analyze(text);
    }

    analyze(text) {
        return {
            temporal: this.extractTemporal(text),
            locations: this.extractLocations(text),
            sensory: this.extractSensory(text),
            emotions: this.extractEmotions(text)
        };
    }

    extractTemporal(text) {
        const patterns = [
            // Months
            /\b(january|february|march|april|may|june|july|august|september|october|november|december)\b/gi,
            // Seasons
            /\b(spring|summer|fall|autumn|winter)\b/gi,
            // Times of day
            /\b(morning|afternoon|evening|night|dawn|dusk|noon|midnight)\b/gi,
            // Years
            /\b(19\d{2}|20\d{2})\b/g,
            // Days of week
            /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/gi,
            // Relative time
            /\b(yesterday|today|tomorrow|last (week|month|year)|next (week|month|year))\b/gi,
            // Time indicators
            /\b(before|after|during|when|while)\b/gi
        ];

        const matches = [];
        patterns.forEach(pattern => {
            const found = text.match(pattern);
            if (found) {
                matches.push(...found);
            }
        });

        return [...new Set(matches.map(m => m.toLowerCase()))];
    }

    extractLocations(text) {
        const patterns = [
            // Common location words
            /\b(at|in|near|by|outside|inside)\s+(?:the\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g,
            // Specific location types
            /\b(park|street|building|house|home|office|school|restaurant|cafe|coffee shop|store|beach|mountain|city|town|village)\b/gi,
            // Prepositions indicating location
            /\b(downtown|uptown|upstairs|downstairs|outside|inside)\b/gi
        ];

        const matches = [];
        patterns.forEach(pattern => {
            const found = text.match(pattern);
            if (found) {
                matches.push(...found);
            }
        });

        return [...new Set(matches.map(m => m.trim().toLowerCase()))];
    }

    extractSensory(text) {
        const sensoryWords = {
            smell: /\b(smell|scent|aroma|fragrance|odor|stink|perfume)\b/gi,
            sight: /\b(see|saw|look|bright|dark|color|red|blue|green|yellow|light|shadow)\b/gi,
            sound: /\b(hear|heard|sound|noise|loud|quiet|music|voice|whisper|shout)\b/gi,
            touch: /\b(feel|felt|touch|cold|hot|warm|cool|soft|hard|rough|smooth|texture)\b/gi,
            taste: /\b(taste|flavor|sweet|sour|bitter|salty|delicious)\b/gi
        };

        const matches = [];
        Object.entries(sensoryWords).forEach(([sense, pattern]) => {
            const found = text.match(pattern);
            if (found) {
                matches.push({ sense, words: [...new Set(found.map(w => w.toLowerCase()))] });
            }
        });

        return matches;
    }

    extractEmotions(text) {
        const emotionPattern = /\b(happy|sad|angry|scared|excited|nervous|anxious|peaceful|calm|confused|lonely|loved)\b/gi;
        const matches = text.match(emotionPattern);
        return matches ? [...new Set(matches.map(m => m.toLowerCase()))] : [];
    }
}

// Main Application
class EchoTrace {
    constructor() {
        this.fragments = this.loadFragments();
        this.initializeEventListeners();
        this.render();
    }

    loadFragments() {
        const stored = localStorage.getItem('echotraceFragments');
        if (stored) {
            const data = JSON.parse(stored);
            return data.map(f => {
                const fragment = new MemoryFragment(f.text, f.id);
                fragment.timestamp = new Date(f.timestamp);
                return fragment;
            });
        }
        return [];
    }

    saveFragments() {
        const data = this.fragments.map(f => ({
            id: f.id,
            text: f.text,
            timestamp: f.timestamp.toISOString()
        }));
        localStorage.setItem('echotraceFragments', JSON.stringify(data));
    }

    initializeEventListeners() {
        const form = document.getElementById('fragment-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addFragment();
        });
    }

    addFragment() {
        const input = document.getElementById('fragment-input');
        const text = input.value.trim();
        
        if (text) {
            const fragment = new MemoryFragment(text);
            this.fragments.push(fragment);
            this.saveFragments();
            input.value = '';
            this.render();
        }
    }

    render() {
        this.renderTimeline();
        this.renderAnalysis();
        this.renderSmartPrompts();
    }

    renderTimeline() {
        const container = document.getElementById('timeline-container');
        
        if (this.fragments.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>No memory fragments yet. Start by adding your first fragment above.</p>
                </div>
            `;
            return;
        }

        // Sort fragments by temporal clues (fragments with more temporal info first)
        const sortedFragments = [...this.fragments].sort((a, b) => {
            const aScore = this.getTemporalScore(a);
            const bScore = this.getTemporalScore(b);
            return bScore - aScore;
        });

        container.innerHTML = sortedFragments.map(fragment => {
            const temporalInfo = fragment.analysis.temporal.length > 0 
                ? fragment.analysis.temporal[0] 
                : 'Undated';
            
            return `
                <div class="timeline-item">
                    <div class="timestamp">${fragment.timestamp.toLocaleString()}</div>
                    <div class="temporal-indicator">${temporalInfo}</div>
                    <div class="fragment-text">${this.escapeHtml(fragment.text)}</div>
                    <div class="tags">
                        ${fragment.analysis.temporal.slice(1).map(t => 
                            `<span class="tag time">⏰ ${t}</span>`
                        ).join('')}
                        ${fragment.analysis.locations.slice(0, 3).map(l => 
                            `<span class="tag location">📍 ${l}</span>`
                        ).join('')}
                        ${fragment.analysis.sensory.slice(0, 3).map(s => 
                            `<span class="tag sensory">👃 ${s.sense}</span>`
                        ).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }

    getTemporalScore(fragment) {
        let score = 0;
        const temporal = fragment.analysis.temporal;
        
        // Year mentions are most specific
        if (temporal.some(t => /\b(19|20)\d{2}\b/.test(t))) score += 10;
        // Month mentions
        if (temporal.some(t => /(january|february|march|april|may|june|july|august|september|october|november|december)/i.test(t))) score += 5;
        // Season mentions
        if (temporal.some(t => /(spring|summer|fall|autumn|winter)/i.test(t))) score += 3;
        // Time of day
        if (temporal.some(t => /(morning|afternoon|evening|night)/i.test(t))) score += 2;
        
        return score;
    }

    renderAnalysis() {
        // Aggregate all temporal clues
        const allTemporal = new Set();
        const allLocations = new Set();
        const allSensory = [];
        
        this.fragments.forEach(fragment => {
            fragment.analysis.temporal.forEach(t => allTemporal.add(t));
            fragment.analysis.locations.forEach(l => allLocations.add(l));
            fragment.analysis.sensory.forEach(s => {
                const existing = allSensory.find(item => item.sense === s.sense);
                if (existing) {
                    s.words.forEach(w => {
                        if (!existing.words.includes(w)) {
                            existing.words.push(w);
                        }
                    });
                } else {
                    allSensory.push({ sense: s.sense, words: [...s.words] });
                }
            });
        });

        // Render temporal clues
        const temporalContainer = document.getElementById('temporal-clues');
        if (allTemporal.size > 0) {
            temporalContainer.innerHTML = Array.from(allTemporal)
                .map(clue => `<div class="clue-item">⏰ ${clue}</div>`)
                .join('');
        } else {
            temporalContainer.innerHTML = '<p class="empty-text">No time-related information yet</p>';
        }

        // Render locations
        const locationContainer = document.getElementById('location-clues');
        if (allLocations.size > 0) {
            locationContainer.innerHTML = Array.from(allLocations)
                .map(clue => `<div class="clue-item">📍 ${clue}</div>`)
                .join('');
        } else {
            locationContainer.innerHTML = '<p class="empty-text">No locations identified yet</p>';
        }

        // Render sensory details
        const sensoryContainer = document.getElementById('sensory-clues');
        if (allSensory.length > 0) {
            sensoryContainer.innerHTML = allSensory
                .map(s => `<div class="clue-item">👃 ${s.sense}: ${s.words.join(', ')}</div>`)
                .join('');
        } else {
            sensoryContainer.innerHTML = '<p class="empty-text">No sensory details yet</p>';
        }

        // Detect contradictions
        this.renderContradictions();
    }

    renderContradictions() {
        const container = document.getElementById('contradictions');
        const contradictions = this.detectContradictions();
        
        if (contradictions.length > 0) {
            container.innerHTML = contradictions
                .map(c => `<div class="contradiction-item">⚠️ ${c}</div>`)
                .join('');
        } else {
            container.innerHTML = '<p class="empty-text">No contradictions detected</p>';
        }
    }

    detectContradictions() {
        const contradictions = [];
        
        // Check for conflicting temporal information
        const temporalSets = this.fragments.map(f => f.analysis.temporal);
        const allSeasons = temporalSets.flat().filter(t => 
            /(spring|summer|fall|autumn|winter)/i.test(t)
        );
        
        if (allSeasons.length > 1 && new Set(allSeasons).size > 1) {
            contradictions.push(`Multiple seasons mentioned: ${[...new Set(allSeasons)].join(', ')}`);
        }

        // Check for conflicting times of day
        const allTimes = temporalSets.flat().filter(t => 
            /(morning|afternoon|evening|night)/i.test(t)
        );
        
        if (allTimes.length > 1 && new Set(allTimes).size > 1) {
            contradictions.push(`Multiple times of day mentioned across fragments`);
        }

        return contradictions;
    }

    renderSmartPrompts() {
        const container = document.getElementById('smart-prompts');
        const promptsList = document.getElementById('prompts-list');
        
        if (this.fragments.length === 0) {
            container.style.display = 'none';
            return;
        }

        const prompts = this.generateSmartPrompts();
        
        if (prompts.length > 0) {
            container.style.display = 'block';
            promptsList.innerHTML = prompts
                .map(prompt => `<li>${prompt}</li>`)
                .join('');
        } else {
            container.style.display = 'none';
        }
    }

    generateSmartPrompts() {
        const prompts = [];
        
        // Check what's missing
        const hasTemporalInfo = this.fragments.some(f => f.analysis.temporal.length > 0);
        const hasLocationInfo = this.fragments.some(f => f.analysis.locations.length > 0);
        const hasSensoryInfo = this.fragments.some(f => f.analysis.sensory.length > 0);
        const hasEmotions = this.fragments.some(f => f.analysis.emotions.length > 0);

        if (!hasTemporalInfo) {
            prompts.push("When did this happen? Try to recall the season, time of day, or year.");
        }

        if (!hasLocationInfo) {
            prompts.push("Where were you? Can you remember any landmarks or places nearby?");
        }

        if (!hasSensoryInfo) {
            prompts.push("What did you see, hear, smell, or feel? Sensory details can unlock more memories.");
        }

        if (!hasEmotions) {
            prompts.push("How did you feel? Emotions are powerful memory triggers.");
        }

        // Context-specific prompts
        if (this.fragments.length === 1) {
            prompts.push("What happened right before or after this moment?");
        }

        if (this.fragments.length > 2) {
            prompts.push("Are there any connections between these memories?");
            prompts.push("Which memory feels most vivid? Focus on expanding that one.");
        }

        return prompts.slice(0, 4); // Limit to 4 prompts
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.echoTrace = new EchoTrace();
});
