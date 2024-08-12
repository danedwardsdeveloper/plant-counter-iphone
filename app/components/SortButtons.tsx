import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SortMethod } from '../types';

interface SortButtonsProps {
	onSortMethodChange: (method: SortMethod) => void;
	currentSortMethod: SortMethod;
}

export default function SortButtons({
	onSortMethodChange,
	currentSortMethod,
}: SortButtonsProps) {
	const renderButton = (method: SortMethod, label: string) => (
		<TouchableOpacity
			style={[
				styles.button,
				method === currentSortMethod && styles.activeButton,
			]}
			onPress={() => onSortMethodChange(method)}
		>
			<Text
				style={[
					styles.text,
					method === currentSortMethod && styles.activeText,
				]}
			>
				{label}
			</Text>
		</TouchableOpacity>
	);

	return (
		<View style={styles.sortButtons}>
			{renderButton('alphabetical', 'Alphabetical')}
			{renderButton('category', 'Category')}
		</View>
	);
}

const styles = StyleSheet.create({
	sortButtons: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 10,
	},
	button: {
		backgroundColor: 'white',
		padding: 12,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: '#D1D5DB', // gray-300
	},
	activeButton: {
		backgroundColor: '#16a34a', // green-600
		borderColor: '#16a34a', // green-600
	},
	text: {
		fontSize: 14,
		fontWeight: '600',
		textTransform: 'uppercase',
		color: '#111827', // gray-900
	},
	activeText: {
		color: 'white',
	},
});
