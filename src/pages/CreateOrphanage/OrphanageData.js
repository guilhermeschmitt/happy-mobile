import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';

import api from '../../services/api';

export default function OrphanageData() {
  const route = useRoute();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(false);
  const [images, setImages] = useState([]);

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted')
      alert("Putz! Precisamos do acesso às suas fotos");

    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled)
      return;

    const { uri } = result;
    setImages([...images, uri]);
  }

  async function handleCreateOrphanage() {
    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('latitude', String(route.params.position.latitude));
    data.append('longitude', String(route.params.position.longitude));
    data.append('open_on_weekends', String(open_on_weekends));

    images.map((image, index) => data.append('images', {
      uri: image,
      type: 'image/jpg',
      name: `image_${index}.jpg`,
    }));

    await api.post('orphanages', data);

    navigation.navigate('OrphanagesMap');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>
        Dados
      </Text>
      <Text style={styles.label}>
        Nome
      </Text>
      <TextInput
        value={name}
        style={styles.input}
        onChangeText={setName}
      />

      <Text style={styles.label}>
        Sobre
      </Text>
      <TextInput
        multiline
        value={about}
        onChangeText={setAbout}
        style={[styles.input, { height: 110 }]}
      />

      {/* <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
      /> */}

      <Text style={styles.label}>
        Fotos
      </Text>

      <View style={styles.uploadedImagesContainer}>
        {
          images.map(image => (
            <Image
              key={image}
              source={{ uri: image }}
              style={styles.uploadedImage}
            />
          ))
        }
      </View>

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>
        Visitação
      </Text>

      <Text style={styles.label}>
        Instruções
      </Text>
      <TextInput
        multiline
        value={instructions}
        onChangeText={setInstructions}
        style={[styles.input, { height: 110 }]}
      />

      <Text style={styles.label}>
        Horário de visitas
      </Text>
      <TextInput
        value={opening_hours}
        style={styles.input}
        onChangeText={setOpeningHours}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>
          Atende final de semana?
        </Text>
        <Switch
          thumbColor="#fff"
          value={open_on_weekends}
          onValueChange={setOpenOnWeekends}
          trackColor={{ false: '#ccc', true: '#39CC83' }}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
        <Text style={styles.nextButtonText}>
          Cadastrar
        </Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  uploadedImagesContainer: {
    flexDirection: 'row'
  },
  uploadedImage: {
    width: 64,
    height: 64,
    marginRight: 8,
    borderRadius: 20,
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})