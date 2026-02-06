// Dream meanings dictionary
const DREAM_MEANINGS = {
  teeth: {
    symbol: '🦷 Teeth',
    meanings: ['Anxiety or stress', 'Loss of control', 'Transition or change', 'Power and confidence'],
  },
  falling: {
    symbol: '📉 Falling',
    meanings: ['Fear of losing control', 'Anxiety in life', 'Letting go of something', 'Need for grounding'],
  },
  flying: {
    symbol: '🛸 Flying',
    meanings: ['Freedom and liberation', 'Ambition and success', 'Escape from reality', 'Spiritual growth'],
  },
  water: {
    symbol: '💧 Water',
    meanings: ['Emotions and feelings', 'Purification and cleansing', 'Life changes', 'The unconscious mind'],
  },
  chase: {
    symbol: '🏃 Being Chased',
    meanings: ['Avoidance of a problem', 'Fear or anxiety', 'Running from responsibility', 'Need for action'],
  },
  death: {
    symbol: '💀 Death',
    meanings: ['Transformation and rebirth', 'End of a chapter', 'Fear of the unknown', 'New beginnings'],
  },
  house: {
    symbol: '🏠 House',
    meanings: ['Your mind or psyche', 'Different life aspects', 'Safety and shelter', 'Personal growth'],
  },
  animal: {
    symbol: '🦁 Animals',
    meanings: ['Instincts and wild nature', 'Specific animal traits', 'Personal qualities', 'Unconscious desires'],
  },
  lost: {
    symbol: '🗺️ Being Lost',
    meanings: ['Confusion in life', 'Lack of direction', 'Transition period', 'Need for guidance'],
  },
  monster: {
    symbol: '👹 Monsters',
    meanings: ['Facing fears', 'Shadow self', 'Repressed emotions', 'Internal conflicts'],
  },
};

export function getDreamSymbols(text: string) {
  const lowerText = text.toLowerCase();
  const found: any[] = [];
  Object.entries(DREAM_MEANINGS).forEach(([key, data]) => {
    const patterns: Record<string, RegExp> = {
      teeth: /\b(teeth|tooth|dental|bite)\b/gi,
      falling: /\b(fall|falling|fell|drop|plummet)\b/gi,
      flying: /\b(fly|flying|flew|airborne|soar)\b/gi,
      water: /\b(water|ocean|sea|river|lake|swim|drowning|flood)\b/gi,
      chase: /\b(chase|chasing|chased|run|running|fleeing|escape)\b/gi,
      death: /\b(death|die|dying|died|dead)\b/gi,
      house: /\b(house|home|building|room|door|window|floor)\b/gi,
      animal: /\b(dog|cat|snake|bird|bear|wolf|lion|creature|beast)\b/gi,
      lost: /\b(lost|missing|can't find|where|location)\b/gi,
      monster: /\b(monster|demon|creature|beast|evil|scary|frightening)\b/gi,
    };
    if (patterns[key] && patterns[key].test(lowerText)) {
      found.push({ type: key, ...data });
    }
  });
  return found;
}
