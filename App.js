// App.js

import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text, View, Button, TextInput, TouchableOpacity, Modal, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PasswordEntry from './PasswordEntry';
import CryptoJS from 'react-native-crypto-js';

const encryptData = (data, key) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}

const decryptData = (data, key) => {
  const bytes = CryptoJS.AES.decrypt(data, key);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F2F2F7',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 10, // add horizontal margin
    marginVertical: 5, // add vertical margin
  },
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: '#0A84FF',
    borderRadius: 30,
    zIndex: 999,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  floatingButtonText: {
    fontSize: 24,
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 60,   // update this
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,  // update this
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  deleteButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    left: 30,
    bottom: 30,
    backgroundColor: '#FF453A',
    borderRadius: 30,
    zIndex: 999,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  clearAllButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    left: 30,
    bottom: 100,
    backgroundColor: '#5E5CE6',
    borderRadius: 30,
    zIndex: 999,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  passwordItem: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  }
});

const PasswordItem = ({ item, onCheck }) => {
  return (
    <View style={styles.passwordItem}>
      <Switch value={item.isSelected} onValueChange={onCheck} />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: '500' }}>Name: {item.name}</Text>
        <Text style={{ fontSize: 14, color: 'gray' }}>Account: {item.account}</Text>
        <Text style={{ fontSize: 14, color: 'gray' }}>
          Password: {item.isSelected ? item.password : '****'}
        </Text>
        <Text style={{ fontSize: 14, color: 'gray' }}>
          Description: {item.isSelected ? item.description : '****'}
        </Text>
      </View>
    </View>
  );
};

const App = () => {
  const [passwordEntries, setPasswordEntries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@password_entries');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Failed to load password entries.', e);
      return [];
    }
  };

  const saveData = async (newValue) => {
    try {
      const updatedEntries = [...passwordEntries, newValue];
      const jsonValue = JSON.stringify(updatedEntries);
      await AsyncStorage.setItem('@password_entries', jsonValue);
      setPasswordEntries(updatedEntries);
    } catch (e) {
      console.error('Failed to save password entry.', e);
    }
  };

  useEffect(() => {
    loadData().then(setPasswordEntries);
  }, []);

  const searchResults = passwordEntries.filter(entry => entry.name.includes(search));

  const onCheck = async (index) => {
    const updatedEntries = [...passwordEntries];
    updatedEntries[index].isSelected = !updatedEntries[index].isSelected;
    setPasswordEntries(updatedEntries);
    const jsonValue = JSON.stringify(updatedEntries);
    await AsyncStorage.setItem('@password_entries', jsonValue);
  };

  const clearAll = async () => {
    await AsyncStorage.removeItem('@password_entries');
    setPasswordEntries([]);
  };

  const deleteSelected = async () => {
    const remainingEntries = passwordEntries.filter(entry => !entry.isSelected);
    setPasswordEntries(remainingEntries);
    const jsonValue = JSON.stringify(remainingEntries);
    await AsyncStorage.setItem('@password_entries', jsonValue);
  };
  // ... existing code
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name"
        onChangeText={text => setSearch(text)}
        value={search}
      />

      <FlatList
        data={searchResults}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }) => (
          <PasswordItem
            item={item}
            onCheck={() => onCheck(index)}
          />
        )}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={deleteSelected}
      >
        <Text style={styles.floatingButtonText}>-</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.clearAllButton}
        onPress={clearAll}
      >
        <Text style={styles.floatingButtonText}>X</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <PasswordEntry
              onSave={data => { saveData(data); setModalVisible(false); }}
              onCancel={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

export default App;