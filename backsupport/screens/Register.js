import { useState } from 'react';
import { View, SafeAreaView, FlatList, Text } from 'react-native';
import { Image, StyleSheet, Pressable, TextInput, TouchableOpacity } from 'react-native';
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
import Login from './Login';

const schema = yup.object().shape({
	email: yup.string()
		.required("Email is required")
		.email("Invalid email."),
	name: yup.string()
		.required("Name is required"),
	username: yup.string()
		.required("Username is required"),
	pwd: yup.string()
		.required("Password is required")
})

const Register = ({ navigation }) => {

	const {control, handleSubmit, errors, reset, watch} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			email: ' ',
			name: ' ',
			username: ' ',
			pwd: ' ',
			confirmPwd: ' ',
		},
	})


	const emailWatch = watch('email');
	const pwdWatch = watch('pwd');
	const usernameWatch = watch('username');
	//console.log(emailWatch);
	//console.log(pwdWatch);

	function submit(data) {
		console.log("submitted");
		console.log(data)
		const requestOptions = {
	        method: 'POST',
	        headers: { 'Content-Type': 'application/json' },
	        body: JSON.stringify({ email: data["email"], name: data["name"], username: data["username"], password : data["pwd"] })
	    };
		console.log("this is request options")
	    console.log(requestOptions)
	    fetch('https://back-support-thesis.herokuapp.com/signup', requestOptions)
	    .then((response) => {
	    	console.log(response);
	    	console.log("hello");
	    	return response.json();
	    })
	    .then((json) => {
	    	console.log(json);
	    	if (json.success == true) {
	    		// route to start
	    		console.log("yay you signed up");
	    		navigation.navigate("Login")
	    	} else {
	    		// alert 
	    		console.log("nope youre a dummy.");
	    		username = ' ';
				pwd = ' ';
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
					<Controller control={control} name='email' render={({onChange, value}) => (
						<TextInput placeholder='Email' style={styles.formInput} onChangeText={value => onChange(value)} />
					)} />
					<Text style={styles.error} >{errors.email?.message}</Text>
					<Controller control={control} name='name' render={({onChange, value}) => (
						<TextInput placeholder='Name' style={styles.formInput} onChangeText={value => onChange(value)} />
					)} />
					<Text style={styles.error} >{errors.name?.message}</Text>
					<Controller control={control} name='username' render={({onChange, value}) => (
						<TextInput placeholder='Username' style={styles.formInput} onChangeText={value => onChange(value)} />
					)} />
					<Text style={styles.error} >{errors.username?.message}</Text>
					<Controller control={control} name='pwd' render={({onChange, value}) => (
						<TextInput placeholder='Password' secureTextEntry={true} style={styles.formInput} onChangeText={value => onChange(value)} />
					)} />
					<Text style={styles.error} >{errors.pwd?.message}</Text>
					<Controller control={control} name='confirmPwd' render={({onChange, value}) => (
						<TextInput placeholder='Confirm Password' secureTextEntry={true} style={styles.formInput} onChangeText={value => onChange(value)} />
					)} />
					<Text style={styles.error} >{errors.pwd?.message}</Text>
					<TouchableOpacity style={styles.buttonMain} 
					onPress={handleSubmit(submit)}>
						<Text style={styles.buttonText}>Create account</Text>
					</TouchableOpacity>
				</View>
			</View>

		</SafeAreaView>
	)
}

export default Register