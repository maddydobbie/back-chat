import { View, SafeAreaView, Text } from 'react-native';
import { Image, Pressable } from 'react-native';

import logo from "../assets/images/logo.png"
import { FocusedStatusBar } from '../components';
import styles from '../assets/style'


const Favourite = ({ navigation }) => {

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
				<Pressable onPress={()=>navigation.navigate("Start")}>
					<Image source={require('../assets/icons/back.png')} style={styles.icon} resizeMode="contain" resizeMethod="resize" />
				</Pressable>
			</View>
			<FocusedStatusBar backgroundColor='#001F2D'/>
			<View style={styles.centered}>
                <Text style={styles.buttonText}>Coming soon...</Text>
			</View>

		</SafeAreaView>
	)
}

export default Favourite