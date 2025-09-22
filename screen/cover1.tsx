import React from "react";
import { Button, View, StyleSheet, ImageBackground, Text,
    // ImageBackground
 } from "react-native";
// import { Prop } from "../App";

const CoverScreen1 = ({goTo}: any) => {
    return(
        <View style={styles.container}>
            <ImageBackground style={styles.main} source={require('../assets/chat1.jpg')} imageStyle={{opacity: 0.1}}>
                <View style={styles.box}>
                    <View style={styles.boxHeader}>
                        <ImageBackground style={styles.boxHeaderImage} source={require('../assets/chat1.jpg')} imageStyle={{opacity: 0.05}}>
                            <Text style={styles.headerText}>Welcome!</Text>
                        </ImageBackground>
                    </View>
                    <View style={styles.boxBody}>
                        <Button title="Login to User1" onPress={() => goTo('Chat')}/>
                        <Button title="Login to User2" onPress={() => goTo('Chat2')}/>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    main: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue'
    },
    box: {
        width: '70%',
        height: '50%',
        borderRadius: 20,
        overflow: 'hidden',
        alignItems: 'center',
        backgroundColor: '#f4f3f3ff',
        elevation: 10
    },
    boxHeader: {
        height: '50%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    boxHeaderImage: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 25
    },
    boxBody: {
        height: '50%',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});

export default CoverScreen1;