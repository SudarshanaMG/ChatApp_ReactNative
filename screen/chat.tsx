/* eslint-disable react-native/no-inline-styles */


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image,
    ImageBackground
 } from 'react-native';
import {  ref, query,orderByChild, onValue, set, push } from 'firebase/database';
import { db } from '../firebase';
import { Ionicons } from '@react-native-vector-icons/ionicons';
const database = db;

export default function Chat({goTo}: any) {
  const [message, setMessage] = useState(null);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const messageRef = ref(database, '/chats/chatId1/messages');
    const loadMessages = (messageRefer: any, callback: any) => {
      const messageQuery = query(messageRefer, orderByChild('timeStamp'));
      onValue(messageQuery, (snapshot) => {
        if(snapshot.exists()){
          const data = snapshot.val();
          const messageArray = Object.entries(data).map(([id, messageObject]) => {
            if(messageObject && typeof messageObject === 'object'){
              return{
                id,
                ...messageObject
              }
            }
            else{
              return{
                id,
                text: String(messageObject),
                timestamp: 0
              }
            }
          });
          callback(messageArray);
        }
        else{
          callback([]);
        }
      });
    }
    loadMessages(messageRef, (messages: any) => {
      setMessage(messages);
    });
  }, []);


  
  const handleSubmit = () => {
    if(inputText !== ''){
      const newMessageRef = push(ref(database, 'chats/chatId1/messages'));
      set(newMessageRef, {
        senderId: 'user1',
        text: inputText,
        timeStamp: Date.now()
      }).then(() => {
        console.log("data added");
      }).catch((error) => {
        console.log('failed: ',error);
      });
      setInputText('');
    }
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.chatBox}>
      <ImageBackground style={styles.chatBackground} source={require('../assets/chat5.jpg')} imageStyle={{borderRadius: 20, opacity: 0.5}}>
        <View style={styles.header}>
          <Ionicons name='arrow-back-circle' color='#f5f5f5ff' size={35} onPress={() => goTo('CoverScreen')}/>
          <View style={styles.user}>
            <Image style={styles.avatar} source={require('../assets/avatar1.jpg')}/>
            <Text style={styles.userName}>User2</Text>
          </View>
        </View>
        <FlatList
          data={message}
          renderItem={({item}) => 
            (
            <View style={[styles.chat, { alignItems: (item.senderId === 'user1') ? 'flex-end' : 'flex-start' }]}>
              <View style={styles.chatMessageBox}>
                <Text style={styles.chatText}>{item.text}</Text>
                <View style={styles.chatTimeView}>
                  <Text style={styles.chatTime}>{new Date(item.timeStamp).getHours().toString().padStart(2,'0')}.{new Date(item.timeStamp).getMinutes().toString().padStart(2,'0')}</Text>
                </View>
              </View>
            </View>
            )}
          keyExtractor={(item) => item.timeStamp}
        />
      </ImageBackground>
      </View>
      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          placeholder="Enter text here..."
          value={inputText}
          onChangeText={setInputText}
        />
        <View style={styles.send}>
          <Ionicons name="send" color="#fff" size={27} onPress={handleSubmit}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'lightblue', 
    padding: 20,
  },
  header: {
    height: '7%',
    width: '100%',
    paddingTop: 10,
    paddingStart: 10,
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  user: {
    flexDirection: 'row'
  },
  userName:{
    padding: 5,
    paddingRight: 20,
    fontSize: 20
  },
  avatar: {
    marginTop: 3,
    height: 30,
    width: 30,
    borderRadius: 50
  },
  footer: {
    height: '10%',
    width: '100%',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#f5f5f5ff'
  },
  text: { 
    fontSize: 18, 
    marginBottom: 10 
  },
  message: { 
    fontSize: 24, 
    fontWeight: 'bold' 
  },
  input: {
    height: 45,
    width: '75%',
    borderColor: '#000',
    borderWidth: 1.5,
    borderRadius: 5,
    marginTop: 13,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#ffffff'
  },
  chatBox: {
    flex: 1,
    width: '100%',
    margin: 10,
    borderRadius: 20,
    overflow: 'hidden'
  },
  chatBackground: {
    flex: 1
  },
  chat: {
    flex: 1
  },
  chatMessageBox: {
    backgroundColor: '#f4f3f3ff',
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 10,
    borderRadius: 15,
    minWidth: 100,
    maxWidth: 250
  },
  chatText: {
    fontSize: 20
  },
  chatTimeView: {
    alignItems: 'flex-end'
  },
  chatTime: {
    fontSize: 10,
    color: 'blue',
    fontWeight: '800'
  },
  send: {
    height: 40,
    width:  40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    backgroundColor: '#0a1162ff'
  }
});
