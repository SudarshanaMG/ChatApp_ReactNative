import axios from "axios";
import React, { useState } from "react";
import { View, StyleSheet, Alert, Image } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { TextInput, Text, Button, ActivityIndicator, MD2Colors } from "react-native-paper";

const RegisterScreen = ({navigation}: any) => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [loadingImage, setLoadingImage] = useState(false);
    const [fileName, setFileName] = useState<string|undefined>(undefined);
    const [uri, setUri] = useState<string|undefined>(undefined);
    // const [imageUri, setImageUri] = useState<string|undefined>(undefined);

    const cloudName = 'dgdi9wqbe';
    const uploadPreset = 'user_profiles';

    const pickImage = () => {
        launchImageLibrary({mediaType: 'photo'}, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
                return;
            }
            if (response.errorCode) {
                console.log('Image Picker Error: ', response.errorMessage);
                Alert.alert('Image selection failed');
                return;
            }
            if(response.assets){
                const { uri, fileName } = response.assets[0];
                setUri(uri);
                setFileName(fileName);
            }else{
                Alert.alert('Image selection failed');
            }
        });
    };

    const uploadImage = async () => {
        if(!uri){
            Alert.alert('select an image first');
            return;
        }
        const formData = new FormData();
        formData.append('file', {
            uri: uri,
            type: 'image/jpeg',
            name: fileName,
        });
        formData.append('upload_preset', uploadPreset);
        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                }
            );

            console.log('Upload response:', response);
            if (response && response.data && response.data.secure_url) {
                return response.data.secure_url;
            } else {
                console.log('Response received, but no secure_url found:', response.data);
                Alert.alert('Upload failed', 'No image URL returned');
                return null;
            }
        } catch (error: any) {
            console.error('Upload error:', error.response?.data || error.message);
            Alert.alert('Upload failed', 'An error occurred while uploading the image.');
            return null;
        }
    }

    const handleSignUp = async () => {
        setLoading(true);
        const url = "https://chatapp-backend-zkol.onrender.com/register";
        try {
            let uploadedImageUri = null;
            if (uri) {
                uploadedImageUri = await uploadImage();
            }
            if (uploadedImageUri) {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password, userName, imageUri: uploadedImageUri }),
                });
                const data = await response.json();
                if (response.ok) {
                    Alert.alert('Registration successful!');
                    navigation.popTo('Login');
                } else {
                    Alert.alert(data.message || 'Registration failed!');
                    console.error(data);
                }
            } else {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password, userName }),
                });
                const data = await response.json();
                if (response.ok) {
                    Alert.alert('Registration successful!');
                    navigation.popTo('Login');
                } else {
                    Alert.alert(data.message || 'Registration failed!');
                    console.error(data);
                }
            }
        } catch (error) {
            console.error(error);
            Alert.alert('An error occurred during Registering. Please try again.');
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
                        <View style={{flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center'}}>
                        <Button mode='contained' style={styles.loginButton} onPress={pickImage}>Pick an Image</Button>
                        {fileName && (
                            // <View style={{flexDirection: 'row',justifyContent: 'flex-end'}}>
                            // <Image source={{uri: imageUri}} style={{ width: 30, height: 30, marginRight: 5, borderRadius: 50}}/>
                            // <Text>{fileName}</Text>
                            // </View>
                            <Image source={{uri: uri}} style={{ width: 30, height: 30, marginRight: 5, borderRadius: 50}}/>
                        )}
                        </View>
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
                { loading && <ActivityIndicator animating={true} size={'large'} color={MD2Colors.red800} />}
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
        marginBottom: 10,
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

