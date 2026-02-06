import { useState } from 'react';
import { Alert } from 'react-native';

export interface MemoryFragment {
  id: number;
  text: string;
  timestamp: string;
}

const initialFragments: MemoryFragment[] = [
  {
    id: 1,
    text: 'I remember a dream where my teeth were falling out at random.',
    timestamp: new Date().toLocaleString(),
  },
  {
    id: 2,
    text: 'Last summer, I was walking through the coffee shop downtown on a warm afternoon.',
    timestamp: new Date().toLocaleString(),
  },
];

export function useMemoryFragments() {
  const [fragments, setFragments] = useState<MemoryFragment[]>(initialFragments);

  const addFragment = (text: string) => {
    setFragments(prev => [
      { id: Date.now(), text, timestamp: new Date().toLocaleString() },
      ...prev,
    ]);
  };

  const deleteFragment = (id: number) => {
    setFragments(prev => prev.filter(f => f.id !== id));
  };

  return { fragments, addFragment, deleteFragment };
}
