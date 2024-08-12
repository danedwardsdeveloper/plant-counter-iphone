import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import tw from 'twrnc';

import { Plant as PlantType } from '../types';

import Plant from './PlantRow';

interface PlantGroupProps {
	category: string;
	plants: PlantType[];
	checkedPlants: Set<string>;
	onTogglePlant: (plantName: string) => void;
}

export default function PlantGroup({
	category,
	plants,
	checkedPlants,
	onTogglePlant,
}: PlantGroupProps) {
	return (
		<View style={[styles.container, tw`bg-slate-200`]}>
			<Text style={styles.category}>{category}</Text>
			{plants.map((plant) => (
				<Plant
					key={plant.name}
					name={plant.name}
					isChecked={checkedPlants.has(plant.name)}
					onToggle={() => onTogglePlant(plant.name)}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 8,
		margin: 8,
		padding: 8,
	},
	category: {
		fontSize: 18,
		color: '#333',
		marginBottom: 8,
	},
});
