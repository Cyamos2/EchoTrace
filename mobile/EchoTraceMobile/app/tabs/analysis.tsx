import { View, Text, StyleSheet } from 'react-native';
import { useMemoryFragments } from '../../hooks/useMemoryFragments';
import { getDreamSymbols } from '../../utils/dreamAnalysis';

export default function Analysis() {
  const { fragments } = useMemoryFragments();

  // Aggregate dream symbols
  const allDreams = fragments.flatMap(f => getDreamSymbols(f.text));
  const uniqueDreams = Array.from(new Set(allDreams.map(d => d.type))).map(type => allDreams.find(d => d.type === type));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memory Map Analysis</Text>
      <Text style={styles.section}>Dream Symbols</Text>
      {uniqueDreams.length === 0 ? (
        <Text style={styles.empty}>No dream symbols detected yet.</Text>
      ) : (
        uniqueDreams.map(dream => (
          <View key={dream.type} style={styles.dreamCard}>
            <Text style={styles.dreamSymbol}>{dream.symbol}</Text>
            {dream.meanings.map((m, i) => (
              <Text key={i} style={styles.meaning}>• {m}</Text>
            ))}
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9ff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#667eea' },
  section: { fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: '#6a1b9a' },
  dreamCard: { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#9c27b0' },
  dreamSymbol: { fontWeight: 'bold', color: '#6a1b9a', fontSize: 16, marginBottom: 4 },
  meaning: { color: '#555', fontSize: 14, marginLeft: 8 },
  empty: { color: '#999', fontStyle: 'italic', marginTop: 20 },
});
