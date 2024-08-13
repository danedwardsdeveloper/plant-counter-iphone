import React from 'react';
import { View, Text } from 'react-native';

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
		<View className="bg-white rounded-xl p-6 mb-4">
			<Text className="text-lg text-gray-600 mb-3">{category}</Text>
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
