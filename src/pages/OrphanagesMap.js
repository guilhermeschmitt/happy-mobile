import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';

import api from '../services/api';
import mapMarker from '../images/map-marker.png';
import { RectButton } from 'react-native-gesture-handler';

function OrphanagesMap() {

  useFocusEffect(() => {
    api.get('orphanages').then(response => setOrphanages(response.data));
  }, []);

  const [orphanages, setOrphanages] = useState([]);

  const navigation = useNavigation();

  function handleNavigateToOrphanageDetails(id) {
    navigation.navigate('OrphanageDetails', { id });
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -27.5201881,
          longitude: -48.6489143,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}
      >
        {
          orphanages.map(orphanage => (
            <Marker
              icon={mapMarker}
              key={orphanage.id}
              calloutAnchor={{
                x: 2.8,
                y: 0.8
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            >
              <Callout
                tooltip
                onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}
              >
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>
                    {orphanage.name}
                  </Text>
                </View>
              </Callout>
            </Marker>
          ))
        }
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanages.length} orfanatos encontrados
        </Text>
        <RectButton
          style={styles.createOrphanageButton}
          onPress={handleNavigateToCreateOrphanage}
        >
          <Feather
            size={20}
            name='plus'
            color='#fff'
          />
        </RectButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  calloutContainer: {
    width: 160,
    height: 46,
    borderRadius: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    fontFamily: 'Nunito_700Bold',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  calloutText: {
    fontSize: 14,
    color: '#0089a5',
  },
  footer: {
    left: 24,
    right: 24,
    bottom: 32,
    height: 56,
    elevation: 3,
    paddingLeft: 24,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  footerText: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_700Bold'
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#15c3d6',
  }
});

export default OrphanagesMap
