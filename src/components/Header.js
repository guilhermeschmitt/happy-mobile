import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';

const Header = props => {

  const navigation = useNavigation();

  function handleGoBackToAppHome() {
    navigation.navigate('OrphanagesMap');
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather size={24} color='#15b6d6' name='arrow-left' />
      </BorderlessButton>
      <Text style={styles.title}>
        {props.title}
      </Text>
      {
        props.showCancel
          ? (
            <BorderlessButton onPress={handleGoBackToAppHome}>
              <Feather name='x' size={24} color='#ff669d' />
            </BorderlessButton>
          )
          : (
            <View />
          )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 44,
    flexDirection: row,
    borderBottomWidth: 1,
    alignItems: 'center',
    borderColor: '#dde3f0',
    backgroundColor: 'f9fafc',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
  }
})

export default Header
