import { useState } from 'react';
import { View, SafeAreaView, FlatList, Text } from 'react-native';
import { Image, StyleSheet, Pressable } from 'react-native';
import { createStackNavigator, createAppContainer } from  "@react-navigation/native";

import logo from "../assets/images/logo.png"
import { COLORS, FONTS } from "../constants";
import { HomeHeader, FocusedStatusBar } from '../components';
import Login from './Login';
import ResetPwd from './ResetPwd';
import Start from './Start';
import styles from '../assets/style'

//export default class Button

const Home = ({ navigation }) => {

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<FocusedStatusBar backgroundColor='#001F2D'/>
			<View style={styles.centered}>
				<View style={{ zIndex: 0 }}>
					<Image source={logo} style={styles.logoHome} resizeMode="contain" resizeMethod="resize" />
					<Text style={styles.title} >Back Support</Text>
					<Text style={styles.subTitle} >LOWER BACK PAIN MANAGEMENT SYSTEM</Text>
					<Pressable style={styles.buttonMain} onPress={()=>navigation.navigate("Login")}>
						<Text style={styles.buttonText}>Login</Text>
					</Pressable>
					<Pressable>
						<Text style={styles.buttonHyperlink} onPress={()=>navigation.navigate("Register")}>Create account</Text>
					</Pressable>
				</View>
			</View>

		</SafeAreaView>
	)
}

export default Home