import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSquare } from '@fortawesome/free-regular-svg-icons/faSquare';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons/faCheckSquare';

interface PlantProps {
	name: string;
	isChecked: boolean;
	onToggle: () => void;
}

export default function PlantRow({ name, isChecked, onToggle }: PlantProps) {
	return (
		<View>
			<Pressable
				onPress={onToggle}
				className="flex flex-row items-center justify-between py-2"
			>
				<Text
					className={`text-lg font-bold ${
						isChecked ? 'text-green-500 line-through' : 'text-black'
					}`}
				>
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
