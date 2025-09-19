

import React, { useState } from 'react';
import {  
  Text, 
  StyleSheet,
  // ImageBackground, 
  // Button
} from 'react-native';
import CoverScreen1 from './screen/cover1';
import Chat from './screen/chat';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatSecond from './screen/chat2';

export default function App() {
  const [screen, setScreen] = useState('CoverScreen');

  const renderScreen = () => {
    switch (screen) {
      case 'CoverScreen':
        return <CoverScreen1 goTo={setScreen} />;
      case 'Chat':
        return <Chat goTo={setScreen} />;
      case 'Chat2':
        return <ChatSecond goTo={setScreen} />
      default:
        return <Text>404 Not Found</Text>;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
        {renderScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    }
});
