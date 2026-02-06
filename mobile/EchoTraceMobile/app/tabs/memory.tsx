import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useMemoryFragments } from '../../hooks/useMemoryFragments';

export default function MemoryTimeline() {
  const { fragments, deleteFragment } = useMemoryFragments();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memory Timeline</Text>
      <FlatList
        data={fragments}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.fragment}>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
            <Text style={styles.text}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteFragment(item.id)} style={styles.deleteBtn}>
              <Text style={styles.deleteText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No memory fragments yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9ff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#667eea' },
  fragment: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 12, position: 'relative' },
  timestamp: { fontSize: 12, color: '#999', marginBottom: 4 },
  text: { fontSize: 16, color: '#333' },
  deleteBtn: { position: 'absolute', top: 10, right: 10, backgroundColor: '#ff6b6b', borderRadius: 15, width: 30, height: 30, alignItems: 'center', justifyContent: 'center' },
  deleteText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  empty: { color: '#999', textAlign: 'center', marginTop: 40 },
});
