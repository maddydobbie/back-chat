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
		console.log("data from form:");
		console.log(data);

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title: data["title"], description: data["description"], date: data["date"] })
		};
		console.log("here???");
		fetch('https://back-support-thesis.herokuapp.com/goal', requestOptions)
		.then((response) => {
			console.log("did we get hre?????/?");
	    	// const res = response.json();
			// console.log(res);
	    	// console.log("new goal?");
	    	// // console.log(json);
			// response.text().then(b => console.log("BLOB", b))
	    	// return response;

			console.log(response);
	    	console.log("hello");
	    	return response.json();
	    })
		.then((json) => {	
			console.log(json);
	    	if (json.success == true) {
	    		// close modal
				// display goal
	    		console.log("yay goalssss");
	    	} else {
	    		// alert 
	    		console.log("nope youre a dummy.");
	    		title = ' ';
				description = ' ';
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