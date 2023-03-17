import { useState } from 'react';
import { View, SafeAreaView, FlatList, Text } from 'react-native';
import { Image, StyleSheet, Pressable } from 'react-native';
import { createStackNavigator, createAppContainer } from  "@react-navigation/native";

import logo from "../assets/images/logo.png"
import { COLORS, FONTS } from "../constants";
import { HomeHeader, FocusedStatusBar } from '../components';
import Login from './Login';
import ResetPwd from './ResetPwd';
import Home from './Home';
import ChatBot from './ChatBot';
import styles from '../assets/style'

//export default class Button

const Start = ({ navigation }) => {

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<FocusedStatusBar backgroundColor='#001F2D'/>
			<View style={styles.centered}>
				<View style={{ zIndex: 0 }}>
					<Image source={logo} style={styles.logoHome} resizeMode="contain" resizeMethod="resize" />
					<Text style={styles.title} >Back Support</Text>
				</View>
				<Pressable style={styles.buttonStartScreen} onPress={()=>navigation.navigate("ChatBot")}>
						<Text style={styles.buttonText}>Chat Bot</Text>
				</Pressable>
				<Pressable style={styles.buttonStartScreen} onPress={()=>navigation.navigate("ChatBot")}>
						<Text style={styles.buttonText}>Favourites</Text>
				</Pressable>
				<Pressable style={styles.buttonStartScreen} onPress={()=>navigation.navigate("ChatBot")}>
						<Text style={styles.buttonText}>Goals</Text>
				</Pressable>
			</View>

		</SafeAreaView>
	)
}

export default Start