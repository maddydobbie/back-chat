import { View, SafeAreaView, Text } from 'react-native';
import { Image, Pressable } from 'react-native';

import logo from "../assets/images/logo.png"
import { FocusedStatusBar } from '../components';
import styles from '../assets/style'

//export default class Button

const Start = ({ navigation }) => {

	function Root() {
		return (
		  <Stack.Navigator>
			<Stack.Screen name="Goals" component={'./Goals'} />
		  </Stack.Navigator>
		);
	  }

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<Pressable onPress={()=>navigation.navigate("Home")}>
					<Image source={require('../assets/icons/logout.png')} style={styles.icon} resizeMode="contain" resizeMethod="resize" />
				</Pressable>
			</View>
			<FocusedStatusBar backgroundColor='#001F2D'/>
			<View style={styles.centered}>
				<View style={{ zIndex: 0 }}>
					<Image source={logo} style={styles.logoHome} resizeMode="contain" resizeMethod="resize" />
					<Text style={styles.title} >Back Support</Text>
				</View>
				<Pressable style={styles.buttonStartScreen} onPress={()=>navigation.navigate("ChatBot")}>
						<Text style={styles.buttonText}>Chat Bot</Text>
				</Pressable>
				<Pressable style={styles.buttonStartScreen} onPress={()=>navigation.navigate("Goals")}>
						<Text style={styles.buttonText}>Goals</Text>
				</Pressable>
				<Pressable style={styles.buttonStartScreen} onPress={()=>navigation.navigate("Favourite")}>
						<Text style={styles.buttonText}>Favourites</Text>
				</Pressable>
			</View>

		</SafeAreaView>
	)
}

export default Start