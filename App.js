import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList  } from 'react-native';
import * as Contacts from 'expo-contacts';



export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState({});
  const [data, setData] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    setHasPermission(status === 'granted');

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      })

      setContacts(data);
      if (data.length > 0) {
        setCurrentContact(data[0]);
        console.log(data[0]);
      }
    }
  }

  const showContacts = () => {
    setData([...data, { key: text }]);
    setText('');
  }

  return (

  


    <View style={styles.container} >
      <StatusBar style="auto" />

      <FlatList style={styles.list}
        data={data}
        renderItem={({ item }) =>
          <Text>{item.key}</Text>
        }
      />

      {
        hasPermission ? (
          <View>
            <Text>Number of contacts found: {contacts.length}</Text>
            <Text>
              {contacts.length ? (
                <Text></Text>
              ) : (
                  <Text>Get some contacts!</Text>
                )}
            </Text>
            <Button title="Show contacts" onPress={showContacts} />
          </View>
        ) : (
            <Text>No permission to use Contacts</Text>
          )
      }

      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});