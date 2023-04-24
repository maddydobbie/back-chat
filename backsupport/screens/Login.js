import { useState } from 'react';
import { View, SafeAreaView, FlatList, Text } from 'react-native';
import { Image, StyleSheet, Pressable, TextInput, TouchableOpacity, Alert } from 'react-native';
import { createStackNavigator, createAppContainer } from  "@react-navigation/native";
import { useForm, Controller, useWatch } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { isEmpty } from 'lodash';

import styles from '../assets/style'
import logo from "../assets/images/logo.png";
import { COLORS, FONTS } from "../constants";
import { HomeHeader, FocusedStatusBar } from '../components';
import Home from './Home';
import Register from './Register';
import ResetPwd from './ResetPwd';
import Start from './Start';

const schema = yup.object().shape({
	username: yup.string()
		.required("Username is required"),
	pwd: yup.string()
		.required("Password is required")
	// .max("")
})



const Login = ({ navigation }) => {

	const {control, handleSubmit, errors, reset, watch} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			username: ' ',
			pwd: ' ',
		},
	})


	const showAlert = () =>
	Alert.alert('Incorrect Login Information', ' ', [
		{
		  text: 'OK',
		  onPress: () => reset(),
		  style: 'cancel',
		},
	  ]);

	const userWatch = watch('username');
	const pwdWatch = watch('pwd');
	//const badLogin = false;

	function submit(data) {
		console.log("submitted");
		//console.log(data);
		const requestOptions = {
	        method: 'POST',
	        headers: { 'Content-Type': 'application/json' },
	        body: JSON.stringify({ username: data["username"], password : data["pwd"] })
	    };
	    fetch('https://back-support-thesis.herokuapp.com/login', requestOptions)
	    .then((response) => {
	    	console.log("hello?");
	    	return response.json();
	    })
	    .then((json) => {
	    	console.log(json);
	    	if (json.success == true) {
	    		// route to start
	    		navigation.navigate("Start")
	    	} else {
	    		showAlert();
				//handleLoginError();
	    		console.log("bad boi");
	    	}
	    })
	    .catch((error) => console.error(error));
		reset();
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<FocusedStatusBar backgroundColor='#001F2D'/>
			<View style={styles.container}>
				<Pressable onPress={()=>navigation.navigate("Home")}>
					<Image source={require('../assets/icons/back.png')} style={styles.icon} resizeMode="contain" resizeMethod="resize" />
				</Pressable>
			</View>
			<View style={styles.centered}>
				<View style={{ zIndex: 0 }}>
					<Image source={logo} style={styles.logoLogin} resizeMode="contain" resizeMethod="resize" />
					<Text style={styles.titleLogin} >Back Support</Text>
					<Controller control={control} name='username' render={({onChange, value}) => (
						<TextInput placeholder='Username' style={styles.formInput} onChangeText={value => onChange(value)} />
					)} />
					<Text style={styles.error} >{errors.username?.message}</Text>
					<Controller control={control} name='pwd' render={({onChange, value}) => (
						<TextInput placeholder='Password' secureTextEntry={true} style={styles.formInput} onChangeText={value => onChange(value)} />
					)} />
					<Text style={styles.error} >{errors.pwd?.message}</Text>
					<Pressable onPress={()=>navigation.navigate("ResetPwd")}>
						<Text style={styles.buttonHyperlink}>Forgot password</Text>
					</Pressable>
					<Pressable onPress={()=>navigation.navigate("Register")}>
						<Text style={styles.buttonHyperlink}>Create account</Text>
					</Pressable>
					<TouchableOpacity style={styles.buttonMain} 
					onPress={handleSubmit(submit)}>
						<Text style={styles.buttonText}>Submit</Text>
					</TouchableOpacity>
				</View>
			</View>

		</SafeAreaView>
	)
}

export default Login