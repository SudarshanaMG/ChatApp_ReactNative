import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Text, Button } from "react-native-paper";

const RegisterScreen = ({navigation}: any) => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = async () => {
        const url = "https://chatapp-backend-zkol.onrender.com/register";
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, userName}),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Successfully registered');
                navigation.replace('Login');
            } else {
                alert(data.message || 'Registration failed!');
            }
        } catch (error) {
            alert('An error occurred during Registering. Please try again.');
        }
    }

    return(
        <View style={styles.container}>
                <View style={styles.box}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Register</Text>
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
                            label="UserName"
                            value={userName}
                            onChangeText={text => setUserName(text)}
                            mode="outlined"
                            keyboardType="default"
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
                            onPress={handleSignUp}
                            style={styles.loginButton}
                            contentStyle={styles.buttonContent}
                            labelStyle={styles.buttonLabel}
                        >
                            Sign Up
                        </Button>
                    </View>
                    
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Already have an account?{' '}
                            <Text 
                                style={styles.linkText}
                                onPress={() => navigation.goBack()}
                            >
                                Sign In
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

export default RegisterScreen;

function alert(arg0: any) {
    throw new Error("Function not implemented.");
}
