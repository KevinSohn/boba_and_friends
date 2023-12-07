import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { registerStyles } from '../styles/RegisterScreen';
import { auth, createUserWithEmailAndPassword, setDoc, doc, db } from '../src/firebase/config';

export default function RegistrationScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState("")
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState("");

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const onRegisterPress = () => {
        console.log(email + " " + fullName + " " + password, bio);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                let curUser = userCredential.user
                setDoc(doc(db, "users", curUser.uid), {
                    name: fullName,
                    email: email,
                    likedShops: [],
                    friends: [],
                    bio: bio
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage);
                console.log(errorMessage);
            })
    }

    return (
        <View style={registerStyles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={registerStyles.logo}
                    source={require('../assets/filledStar.png')}
                />
                <TextInput
                    style={registerStyles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={registerStyles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={registerStyles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={registerStyles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={registerStyles.input}
                    placeholder='Bio'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setBio(text)}
                    value={bio}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Text style={registerStyles.errorText}>{error}</Text>
                <TouchableOpacity
                    style={registerStyles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={registerStyles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={registerStyles.footerView}>
                    <Text style={registerStyles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={registerStyles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}