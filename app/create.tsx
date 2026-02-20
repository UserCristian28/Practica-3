import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getNotesFromStorage, saveNotesToStorage, Note } from '../storage';
import { Ionicons } from '@expo/vector-icons';

export default function CreateNote() {
  const router = useRouter();
  const params = useLocalSearchParams(); // Atrapamos los datos enviados
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Si hay un ID en los parámetros, cargamos los datos para editar
  useEffect(() => {
    if (params.id) {
      setTitle(params.title as string);
      setContent(params.content as string);
    }
  }, [params]);

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) {
      Alert.alert("Nota vacía", "Escribe algo antes de guardar.");
      return;
    }

    const allNotes = await getNotesFromStorage();
    
    if (params.id) {
      // MODO EDICIÓN
      const updatedNotes = allNotes.map(n => 
        n.id === params.id ? { ...n, title, content } : n
      );
      await saveNotesToStorage(updatedNotes);
    } else {
      // MODO NUEVO
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        content,
      };
      await saveNotesToStorage([newNote, ...allNotes]);
    }

    router.replace('/'); 
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
          <Text style={{color: '#007AFF', fontSize: 16}}>Atrás</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{params.id ? 'Editar Nota' : 'Nueva Nota'}</Text>
        <View style={{width: 60}} />
      </View>

      <TextInput
        style={styles.titleInput}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        autoFocus={!params.id}
      />
      <TextInput
        style={styles.contentInput}
        placeholder="Cuerpo de la nota..."
        multiline
        value={content}
        onChangeText={setContent}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>{params.id ? 'Actualizar Nota' : 'Guardar Nota'}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, alignItems: 'center', marginBottom: 20 },
  backBtn: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  titleInput: { fontSize: 26, fontWeight: 'bold', marginBottom: 15 },
  contentInput: { fontSize: 18, flex: 1, textAlignVertical: 'top', color: '#444' },
  saveButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 15, alignItems: 'center', marginBottom: 20 },
  saveButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18 }
});