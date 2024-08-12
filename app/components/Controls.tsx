import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Plant, SortMethod } from '../types';

import SortButtons from './SortButtons';
import Search from './Search';

interface ControlsProps {
	onSortMethodChange: (method: SortMethod) => void;
	currentSortMethod: SortMethod;
	onSearch: (searchResults: Plant[]) => void;
	plants: Plant[];
}

export default function Controls({
	onSortMethodChange,
	currentSortMethod,
	onSearch,
	plants,
}: ControlsProps) {
	return (
		<View style={styles.container}>
			<Search onSearch={onSearch} plants={plants} />
			<SortButtons
				onSortMethodChange={onSortMethodChange}
				currentSortMethod={currentSortMethod}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 10,
	},
});
