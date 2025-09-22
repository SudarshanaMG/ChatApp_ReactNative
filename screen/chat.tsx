/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image,
    ImageBackground
 } from 'react-native';
import { Text,TextInput } from 'react-native-paper';
import {  ref, query,orderByChild, onValue, set, push } from 'firebase/database';
import { db, auth } from '../store/firebase';
import { Ionicons } from '@react-native-vector-icons/ionicons';
const database = db;

const ChatScreen = ({navigation, route}: any) => {
  const { user } = route.params;
  const currentUser = auth.currentUser;
  const [message, setMessage] = useState(null);
  const [inputText, setInputText] = useState('');
  const chatId = [auth.currentUser?.uid, user?.uid].sort().join('_');

  useEffect(() => {
    const messageRef = ref(database, `/chats/${chatId}/messages`);
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
      const newMessageRef = push(ref(database, `chats/${chatId}/messages`));
      set(newMessageRef, {
        senderId: currentUser?.uid,
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
      <ImageBackground style={styles.chatBackground} source={require('../assets/chat1.jpg')} imageStyle={{borderRadius: 20, opacity: 0.1}}>
        <View style={styles.header}>
          <Ionicons name='arrow-back-circle' color='#f5f5f5ff' size={35} onPress={() => navigation.goBack()}/>
          <View style={styles.user}>
            {/* <Image style={styles.avatar} source={require('../assets/chat1.jpg')}/> */}
            <Text style={styles.userName}>{user?.userName || 'User'}</Text>
          </View>
        </View>
        <FlatList
          data={message}
          renderItem={({item}) => 
            (
            <View style={[styles.chat, { alignItems: (item.senderId === currentUser?.uid) ? 'flex-end' : 'flex-start' }]}>
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
    backgroundColor: '#c8e7feff', 
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
    fontSize: 20,
    color: '#fff'
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
    backgroundColor: '#f5f5f5ff',
    elevation: 4
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
    overflow: 'hidden',
    elevation: 2
  },
  chatBackground: {
    flex: 1,
    backgroundColor: '#02487aff'
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
    backgroundColor: '#02487aff'
  }
});

export default ChatScreen;