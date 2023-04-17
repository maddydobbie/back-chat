import { useState } from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import { Image, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { FocusedStatusBar } from '../components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Modal from "react-native-modal";
import styles from '../assets/style'

const schema = yup.object().shape({
	title: yup.string()
		.required("Title is required"),
	description: yup.string()
		.required("Description is required"),
	date: yup.string()
		.required("Date is required")
})



const Goals = ({ navigation }) => {

	const {control, handleSubmit, errors, reset, watch} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			title: ' ',
			description: ' ',
			date: ' ',
		},
	})

	const titleWatch = watch('title');
	const descriptionWatch = watch('description');
	const dateWatch = watch('date');

  	const chatStyles = [styles.chatBotItem, styles.userItem];

	const [isModalVisible, setIsModalVisible] = useState(false);
	const handleModal = () => setIsModalVisible(() => !isModalVisible);

	function submit(data) {
		// console.log("goal submitted");
		// console.log(data)
		// const requestOptions = {
	    //     method: 'POST',
	    //     headers: { 'Content-Type': 'application/json' },
	    //     body: JSON.stringify({ title: data["title"], description: data["decription"], date: data["date"] })
	    // };
		// console.log("this is request options")
	    // console.log(requestOptions)
	    // fetch('https://back-support-thesis.herokuapp.com/goal', requestOptions)
	    // .then((response) => {
	    // 	console.log(response);
	    // 	console.log("new goal?");
	    // 	return response.json();
	    // })
	    // .then((json) => {
	    // 	console.log(json);
	    // 	if (json.success == true) {
	    // 		// clsoe modal
		// 		// display new goal on goal page
	    // 		console.log("yay added a goal");
	    // 	} else {
	    // 		// alert 
	    // 		console.log("nope youre a dummy.");
	    // 		title = ' ';
		// 		decription = ' ';
		// 		date = ' ';
	    // 	}
	    // })
	    // .catch((error) => console.error(error));

		// reset();


		console.log("hello");
		console.log(data);

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title: data["title"], description: data["decription"], date: data["date"] })
		};

		fetch('https://back-support-thesis.herokuapp.com/goal', requestOptions)
	    .then((response) => {
	    	console.log(response.json());
	    	console.log("new goal?");
	    	return response.json();
	    })
		.then((json) => {	
			if (json.success == true) {
	    		// clsoe modal
				// display new goal on goal page
	    		console.log("yay added a goal");
	    	} else {
	    		// alert 
	    		console.log("nope youre a dummy.");
	    		title = ' ';
				decription = ' ';
				date = ' ';
	    	}
		})
		.catch((error) => console.error(error));

		reset();
		
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
				<View style={{ zIndex: 0 }}>
					<Text style={styles.title}>Goals Centre</Text>
				</View>
				<Pressable style={styles.buttonStartScreen} onPress={handleModal}>
					<Text style={styles.buttonText}>Add goal</Text>
				</Pressable>
				<View>
					<Modal isVisible={isModalVisible}>
						<View style={styles.modal}>
							<Text style={styles.title}>New Goal</Text>
							<Controller control={control} name='title' render={({onChange, value}) => (
							<TextInput placeholder='Title' style={styles.modalFormInput} onChangeText={value => onChange(value)} />
							)} />
							<Text style={styles.error} >{errors.title?.message}</Text>
							<Controller control={control} name='description' render={({onChange, value}) => (
							<TextInput placeholder='Description' style={styles.modalFormInput} onChangeText={value => onChange(value)} />
							)} />
							<Text style={styles.error} >{errors.description?.message}</Text>
							<Controller control={control} name='date' render={({onChange, value}) => (
							<TextInput placeholder='Date' style={styles.modalFormInput} onChangeText={value => onChange(value)} />
							)} />
							<Text style={styles.error} >{errors.date?.message}</Text>
							<TouchableOpacity style={styles.buttonMain} onPress={handleSubmit(submit)}>
								<Text style={styles.buttonText}>Submit</Text>
							</TouchableOpacity>
							<Pressable style={styles.buttonModalSecondary} title="Hide modal" onPress={handleModal}>
								<Text style={styles.buttonTextSecondary}>Cancel</Text>
							</Pressable>
						</View>
					</Modal>
				</View>
			</View>

		</SafeAreaView>
	)
}

export default Goals