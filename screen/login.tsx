import React, { useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { TextInput, Text, Button } from "react-native-paper";
import useTokenStore from '../store/tokenStore';

const LoginScreen = ({navigation}: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const setToken = useTokenStore((state) => state.setToken);

    const handleLogin = async () => {
        const url = "https://chatapp-backend-zkol.onrender.com/login";
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                const token = data.token;
                setToken(token);
                navigation.replace('Home');
            } else {
                alert(data.message || 'Login failed!');
            }
        } catch (error) {
            alert('An error occurred during login. Please try again.');
        }
    }

    return(
        <View style={styles.container}>
                <View style={styles.box}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Sign in to your account</Text>
                    </View>
                    
                    <View style={styles.form}>
                        <TextInput
                            label="Email"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            mode="outlined"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            style={styles.input}
                            contentStyle={styles.inputContent}
                        />
                        
                        <TextInput
                            label="Password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            mode="outlined"
                            secureTextEntry={!showPassword}
                            right={
                                <TextInput.Icon 
                                    icon={showPassword ? "eye-off" : "eye"} 
                                    onPress={() => setShowPassword(!showPassword)}
                                />
                            }
                            style={styles.input}
                            contentStyle={styles.inputContent}
                        />
                        
                        <Button 
                            mode="contained" 
                            onPress={handleLogin}
                            style={styles.loginButton}
                            contentStyle={styles.buttonContent}
                            labelStyle={styles.buttonLabel}
                        >
                            Sign In
                        </Button>
                    </View>
                    
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Don't have an account?{' '}
                            <Text 
                                style={styles.linkText}
                                onPress={() => navigation.navigate('Register')}
                            >
                                Sign Up
                            </Text>
                        </Text>
                    </View>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e3f2fd'
    },
    box: {
        width: '90%',
        maxWidth: 400,
        borderRadius: 16,
        backgroundColor: '#ffffff',
        elevation: 8,
        paddingVertical: 30,
        paddingHorizontal: 30,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 25,
        color: '#000000',
        textAlign: 'center',
    },
    form: {
        marginBottom: 24,
    },
    input: {
        marginBottom: 16,
        backgroundColor: '#ffffff',
    },
    inputContent: {
        paddingHorizontal: 16,
    },
    loginButton: {
        marginTop: 8,
        borderRadius: 8,
        backgroundColor: '#1976d2',
    },
    buttonContent: {
        paddingVertical: 12,
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#666666',
        textAlign: 'center',
    },
    linkText: {
        color: '#1976d2',
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;

function alert(arg0: any) {
    throw new Error("Function not implemented.");
}
