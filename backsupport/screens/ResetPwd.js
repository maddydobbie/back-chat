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
import Register from './Register';
import ConfirmResetPwd from './ConfirmResetPwd';

const schema = yup.object().shape({
	email: yup.string()
		.required("Email is required")
		.email("Invalid email."),
	pwd: yup.string()
		.required("Password is required")
		.min(8, "Password must have a minimum of 8 characters.")
	// .max("")
})

const ResetPwd = ({ navigation }) => {

	const {control, handleSubmit, errors, reset, watch} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			email: ' ',
			pwd: ' ',
		},
	})


	const emailWatch = watch('email');
	const pwdWatch = watch('pwd');
	//console.log(emailWatch);
	//console.log(pwdWatch);

	function submit(data) {
		console.log("submitted");
		console.log(data)

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
					<TouchableOpacity style={styles.buttonMain} 
					onPress={handleSubmit(submit)}>
						<Text style={styles.buttonText}>Send Email</Text>
					</TouchableOpacity>
				</View>
			</View>

		</SafeAreaView>
	)
}

export default ResetPwd