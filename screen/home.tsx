import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, List, Appbar } from 'react-native-paper';
import { auth } from '../firebase';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }: any) => {
    const [users, setUsers] = useState<any[]>([]);
    const currentUser = auth.currentUser;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://chatapp-backend-zkol.onrender.com/users');
                const data = await response.json();
                const filtered = data.filter((u: any) => u.uid !== currentUser?.uid);
                setUsers(filtered);
                console.log(filtered);
            } catch (error) {
                console.error('Failed to fetch users', error);
            }
        };

        fetchUsers();
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigation.popTo('Login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <SafeAreaView>
            <Appbar.Header style={styles.header}>
                <Appbar.Content title="Home" />
                <Appbar.Action icon="logout" onPress={handleLogout} />
            </Appbar.Header>

            <View style={styles.container}>
                <Text style={styles.heading}>Available Users</Text>
                <FlatList
                    data={users}
                    keyExtractor={(item) => item.uid}
                    renderItem={({ item }) => (
                        <List.Item
                            title={item.userName}
                            left={() => <List.Icon icon="account" />}
                            onPress={() => navigation.navigate('Chat', {user: item})}
                            style={styles.list}
                        />
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'lightblue',
    },
    container: {
        height: '100%',
        paddingHorizontal: 16,
        paddingTop: 16,
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
        backgroundColor: 'lightblue',
        elevation: 2
    },
});

export default HomeScreen;
