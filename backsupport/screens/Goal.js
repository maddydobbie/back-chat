import { useEffect, useState, TouchableHighlight } from 'react';
import { View, SafeAreaView, FlatList, Text, TouchableOpacity } from 'react-native';
import { Image, StyleSheet, Pressable } from 'react-native';
import { createStackNavigator, createAppContainer } from  "@react-navigation/native";
import { Col, Row, Grid } from "react-native-easy-grid";

import logo from "../assets/images/logo.png"
import { COLORS, FONTS } from "../constants";
import { HomeHeader, FocusedStatusBar } from '../components';
import Login from './Login';
import ResetPwd from './ResetPwd';
import Home from './Home';
import styles from '../assets/style'

//export default class Button


const Goals = ({ navigation }) => {

	const [question, setQuestion] = useState('');
	const [r1, setR1] = useState('');
	const [r2, setR2] = useState('');
	const [r3, setR3] = useState('');
	const [r4, setR4] = useState('');
	const [loading, setLoading] = useState(true);
	const numColumns = 2;
	const [items, setItems] = useState([]);

// get question using fetch
	function loadQ(data) {
		const requestOptions = {
	        method: 'GET',
	    };
	    fetch('https://back-support-thesis.herokuapp.com/chatbot', requestOptions)
	    .then((response) => {
	    	console.log("hello?");
	    	return response.json();
	    })
	    .then((json) => {
	    	// show the q and response
	    	console.log(json);
	    	setQuestion(json.question);
	    	setR1(json.response1);
	    	setR2(json.response2);
	    	setR3(json.response3);
	    	setR4(json.response4);
	    	setItems(json.items);
	    	setLoading(false);
	    })
	    .catch((error) => console.error(error));
	}

	function handleResponse(response, question, rNum) {
		console.log(response, question);
		// post request to backend with response
		// in backend then find correct question and go to next availble suitable q
		const requestOptions = {
	        method: 'POST',
	        headers: { 'Content-Type': 'application/json' },
	        body: JSON.stringify({ response : response, question : question, rNum : rNum, items: items })
	    };
	    fetch('https://back-support-thesis.herokuapp.com/chatbot', requestOptions)
	    .then((response) => {
	    	console.log("hello?");
	    	console.log(response);
	    	return response.json();
	    })
	    .then((json) => {
	    	// show the q and response
	    	console.log("tresssssssssee");
	    	console.log(json);
	    	console.log("treee");
	    	setLoading(false);
	    	if (json.endConvo == true) {
	    		navigation.navigate("Start");
	    	} else {
		    	setQuestion(json.question);
		    	setR1(json.response1);
		    	setR2(json.response2);
		    	setR3(json.response3);
		    	setR4(json.response4);
		    	setItems(json.items);	
	    	}
	    })
	    .then(() => console.log(items))
	    .catch((error) => console.error(error));
	}

	useEffect(() => {
    	loadQ();
  	}, []);
  	if (loading) {
    	return <View><Text>Loading...</Text></View>;
  	}

  	const chatStyles = [styles.chatBotItem, styles.userItem];

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<FocusedStatusBar backgroundColor='#001F2D'/>
			<View style={styles.centered}>
				<View style={styles.chatBotBackground}>
					<View style={styles.chatBotContainer} > 
						<View style={styles.chatBotContainer}>
						    <FlatList
							    data={items}
							    keyExtractor={(item, index) => index}
							    renderItem={({item, index}) => (
								<View style={chatStyles[index % chatStyles.length]}>
								    <Text style={styles.chatBotText}>{item}</Text>
								</View>
							    )}
							/>
						</View>
					</View>
				</View>
				<View style={styles.responseContainer}>
					<View style={styles.responseItem}>
						<Pressable onPress={()=>handleResponse(r1,question,1)} style={styles.responseButton}>
							<Text style={styles.responseText}>{r1}</Text>
						</Pressable>
					</View>
					<View style={styles.responseItem}>
						<Pressable onPress={()=>handleResponse(r2,question,2)} style={styles.responseButton}>
							<Text style={styles.responseText}>{r2}</Text>
						</Pressable>
					</View>
				</View>
				<View style={styles.responseContainer}>
					<View style={styles.responseItem}>
						<Pressable onPress={()=>handleResponse(r3,question,3)} style={styles.responseButton}>
							<Text style={styles.responseText}>{r3}</Text>
						</Pressable>
					</View>
					<View style={styles.responseItem}>
						<Pressable onPress={()=>handleResponse(r4,question,4)} style={styles.responseButton}>
							<Text style={styles.responseText}>{r4}</Text>
						</Pressable>
					</View>
				</View>
			</View>

		</SafeAreaView>
	)
}

export default Goals