import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getNotesFromStorage, saveNotesToStorage, Note } from '../../storage'; 

export default function HomeScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  
  const [isGridView, setIsGridView] = useState(false);
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);

  const loadNotes = async () => {
    const storedNotes = await getNotesFromStorage();
    setNotes(storedNotes);
  };

  useEffect(() => {
    if (isFocused) { loadNotes(); }
  }, [isFocused]);

  const deleteNote = async (id: string) => {
    Alert.alert("Eliminar", "¿Deseas borrar esta nota?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Eliminar", style: "destructive", onPress: async () => {
          const updated = notes.filter(n => n.id !== id);
          setNotes(updated);
          await saveNotesToStorage(updated);
        }
      }
    ]);
  };

  const filteredNotes = notes.filter(n => 
    n.title?.toLowerCase().includes(search.toLowerCase()) || 
    n.content?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Notas</Text>
        <TextInput 
          style={styles.search} 
          placeholder="Buscar..." 
          value={search}
          onChangeText={setSearch} 
        />
      </View>

      <TouchableOpacity style={styles.toggle} onPress={() => setIsGridView(!isGridView)}>
        <Ionicons name={isGridView ? "list" : "grid"} size={20} color="#555" />
        <Text style={styles.toggleText}> Ver como {isGridView ? "Lista" : "Cuadrícula"}</Text>
      </TouchableOpacity>

      <FlatList
        key={isGridView ? 'G' : 'L'}
        data={filteredNotes}
        numColumns={isGridView ? 2 : 1}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.card, isGridView ? {flex:0.5} : {width:'100%'}]}
            onPress={() => router.push({
              pathname: '/create',
              params: { id: item.id, title: item.title, content: item.content }
            })}
          >
            <View style={{flex: 1}}>
              <Text style={styles.noteTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.noteContent} numberOfLines={isGridView ? 3 : 2}>{item.content}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteNote(item.id)} style={styles.deleteBtn}>
              <Ionicons name="trash-outline" size={18} color="red" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={() => router.push('/create')}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  header: { marginTop: 40, marginBottom: 15 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1a1a1a' },
  search: { backgroundColor: '#e9ecef', padding: 12, borderRadius: 12, marginTop: 10 },
  toggle: { flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center', marginBottom: 10 },
  toggleText: { fontSize: 12, color: '#666', marginLeft: 5 },
  card: { backgroundColor: '#fff', padding: 15, margin: 5, borderRadius: 15, flexDirection: 'row', elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
  noteTitle: { fontWeight: 'bold', fontSize: 16 },
  noteContent: { color: '#666', marginTop: 4 },
  deleteBtn: { alignSelf: 'flex-end', marginLeft: 10 },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#007AFF', width: 65, height: 65, borderRadius: 32.5, justifyContent: 'center', alignItems: 'center', elevation: 5 }
});