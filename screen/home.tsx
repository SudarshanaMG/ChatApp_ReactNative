import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, List, Appbar } from 'react-native-paper';
import { auth } from '../firebase'; // Firebase Auth instance
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }: any) => {
    const [users, setUsers] = useState<any[]>([]);
    const currentUser = auth.currentUser;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://your-backend.com/users');
                const data = await response.json();
                const filtered = data.filter((u: any) => u.uid !== currentUser?.uid);
                setUsers(filtered);
            } catch (error) {
                console.error('Failed to fetch users', error);
            }
        };

        fetchUsers();
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigation.replace('Login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <SafeAreaView>
            <Appbar.Header>
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
                            title={item.email}
                            left={props => <List.Icon {...props} icon="account" />}
                            onPress={() => {
                                // Navigate to Chat screen with user
                            }}
                        />
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        backgroundColor: '#f5f5f5',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default HomeScreen;
