import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
	View,
	Button,
	StyleSheet,
	Alert,
	Platform,
	Text,
	Vibration,
	SafeAreaView,
} from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
	const [showBox, setShowBox] = useState(true);
	const [sound, setSound] = useState();
	const ONE_SECOND_IN_MS = 1000;

	async function playSound() {
		const { sound } = await Audio.Sound.createAsync(
			require('./assets/music.mp3')
		);
		setSound(sound);

		await sound.playAsync();
	}

	useEffect(() => {
		return sound
			? () => {
					sound.stopAsync();
					setSound(!sound);
			  }
			: undefined;
	}, [sound]);

	const showConfirmDialog = () => {
		return Alert.alert(
			'Confirmation dialog box',
			'Do you want to ring the bell or vibrate? Please click any button !!',
			[
				{
					text: 'Ring',
					onPress: () => {
						playSound();
					},
				},
				{
					text: 'Rung',
					onPress: () => {
						Vibration.vibrate(3 * ONE_SECOND_IN_MS);
					},
				},
			]
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.screen}>
				<Text style={styles.text}>Hello LogBook 1</Text>
				<Button
					title="Click to show confirmation dialog box"
					onPress={() => showConfirmDialog()}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 30,
		marginBottom: 15,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		paddingTop: 44,
		padding: 8,
	},
});
