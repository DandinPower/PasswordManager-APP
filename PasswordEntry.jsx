// PasswordEntry.js

import React, { useState } from 'react';
import { Button, View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';

const PasswordEntry = ({ onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: '500',
      marginBottom: 10,
      textAlign: 'center',
    },
    description: {
      fontSize: 14,
      color: 'gray',
      marginBottom: 20,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 10,
      borderRadius: 10,
      backgroundColor: 'white',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    button: {
      width: '45%',
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Password Info</Text>
      <Text style={styles.description}>Please fill in the fields below to add a new password entry.</Text>

      <TextInput style={styles.input} placeholder="Name" onChangeText={setName} value={name} />
      <TextInput style={styles.input} placeholder="Account" onChangeText={setAccount} value={account} />
      <TextInput style={styles.input} placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry />
      <TextInput style={styles.input} placeholder="Description" onChangeText={setDescription} value={description} />

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Save"
            color="#0A84FF"
            onPress={() => onSave({ name, account, password, description })}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Cancel"
            color="red"
            onPress={onCancel}
          />
        </View>
      </View>
    </View>
  );
};

export default PasswordEntry;
