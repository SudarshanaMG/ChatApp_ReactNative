import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Image } from 'react-native';
import { Text, List, Appbar, ActivityIndicator, MD2Colors } from 'react-native-paper';
import { auth } from '../store/firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTokenStore from '../store/tokenStore';

const HomeScreen = ({ navigation }: any) => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const currentUser = auth.currentUser;
    const setToken = useTokenStore((state) => state.setToken);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://chatapp-backend-zkol.onrender.com/users');
                const data = await response.json();
                const filtered = data.filter((u: any) => u.uid !== currentUser?.uid);
                setUsers(filtered);
                setLoading(false);
                // console.log(filtered);
            } catch (error) {
                console.error('Failed to fetch users', error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            setToken('');
            setUsers([]);
            navigation.popTo('Login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <SafeAreaView>
            <Appbar.Header style={styles.header}>
                <Appbar.Content title="Home" color='#fff' />
                <Appbar.Action icon="logout" color='#fff' onPress={handleLogout} />
            </Appbar.Header>

            <View style={styles.container}>
                <Text style={styles.heading}>Available Users</Text>
                { loading ? <ActivityIndicator animating={true} color={MD2Colors.red800} /> : 
                    (users.length == 0) ? <Text>No Users</Text> : 
                        (<FlatList
                            data={users}
                            keyExtractor={(item) => item.uid}
                            renderItem={({ item }) => (
                                <List.Item
                                    title={item.userName}
                                    titleStyle={{color: '#fff'}}
                                    left={() => <Image style={styles.avatar} source={{uri: item.imageUri}}/>}
                                    onPress={() => navigation.navigate('Chat', {user: item})}
                                    style={styles.list}
                                />
                            )}
                        />)
                }
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#005A9C',
    },
    container: {
        height: '100%',
        paddingHorizontal: 16,
        paddingTop: 16,
        justifyContent: 'center',
        backgroundColor: '#c8e7feff',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    list: {
        borderRadius: 16,
        marginBottom: 15,
        padding: 8,
        backgroundColor: '#005A9C',
        elevation: 2
    },
    avatar: {
        marginTop: 3,
        height: 30,
        width: 30,
        borderRadius: 50
    },
});

export default HomeScreen;
