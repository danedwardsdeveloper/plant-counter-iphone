import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSquare } from '@fortawesome/free-regular-svg-icons/faSquare';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons/faCheckSquare';

import tw from 'twrnc';

interface PlantProps {
	name: string;
	isChecked: boolean;
	onToggle: () => void;
}

export default function PlantRow({ name, isChecked, onToggle }: PlantProps) {
	return (
		<View style={tw.style(isChecked && 'bg-blue-100')}>
			<Pressable onPress={onToggle} style={styles.pressable}>
				<Text style={[styles.name, isChecked && styles.checkedText]}>
					{name}
				</Text>
				<FontAwesomeIcon
					icon={isChecked ? faCheckSquare : faSquare}
					size={30}
					color={isChecked ? 'green' : 'black'}
				/>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	pressable: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 8,
		paddingHorizontal: 8,
		marginVertical: 4,
		marginHorizontal: 8,
		borderRadius: 8,
	},
	name: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'black',
	},
	checkedText: {
		color: 'green',
	},
});
