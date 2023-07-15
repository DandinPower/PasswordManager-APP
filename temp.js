// App.js

import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text, View, Button, TextInput, TouchableOpacity, Modal, CheckBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PasswordEntry from './PasswordEntry';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    searchBar: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    },
    floatingButton: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor: '#F4511E',
        borderRadius: 30,
        zIndex: 999,
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
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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
        backgroundColor: 'red',
        borderRadius: 30,
        zIndex: 999,
    },
    clearAllButton: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        left: 30,
        bottom: 100,
        backgroundColor: 'blue',
        borderRadius: 30,
        zIndex: 999,
    }
});

const PasswordItem = ({ item, onCheck }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox value={item.isSelected} onValueChange={onCheck} />
            <Text>Name: {item.name}</Text>
            <Text>Account: {item.account}</Text>
        </View>
    );
};

const App = () => {
    // ... existing code

    const saveData = async (entries) => {
        try {
            const jsonValue = JSON.stringify(entries);
            await AsyncStorage.setItem('@password_entries', jsonValue);
            setPasswordEntries(entries);
        } catch (e) {
            console.error('Failed to save password entries.', e);
        }
    };

    const onCheck = async (index) => {
        const updatedEntries = [...passwordEntries];
        updatedEntries[index].isSelected = !updatedEntries[index].isSelected;
        await saveData(updatedEntries);
    };

    const clearAll = async () => {
        await saveData([]);
    };

    const deleteSelected = async () => {
        const remainingEntries = passwordEntries.filter(entry => !entry.isSelected);
        await saveData(remainingEntries);
    };

  // ... existing code

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

    // ... existing code
};

export default App;
