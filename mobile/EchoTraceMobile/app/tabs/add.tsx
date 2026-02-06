import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useMemoryFragments } from '../../hooks/useMemoryFragments';

export default function AddFragment() {
  const [text, setText] = useState('');
  const { addFragment } = useMemoryFragments();

  const handleAdd = () => {
    if (text.trim().length === 0) {
      Alert.alert('Please enter a memory fragment.');
      return;
    }
    addFragment(text);
    setText('');
    Alert.alert('Fragment added!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Memory Fragment</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe a memory or dream..."
        value={text}
        onChangeText={setText}
        multiline
        numberOfLines={4}
      />
      <Button title="Add Fragment" onPress={handleAdd} color="#667eea" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9ff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#667eea' },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 16, minHeight: 80, textAlignVertical: 'top', borderColor: '#e0e0e0', borderWidth: 1 },
});
