import React, { useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { SortMethod, Plant } from './types';

import { plants } from './data/plants';

import MenuBar from './components/MenuBar';
import Controls from './components/Controls';
import PlantsList from './components/PlantsList';

export default function Index() {
	const [checkedPlants, setCheckedPlants] = useState<Set<string>>(new Set());
	const [sortMethod, setSortMethod] = useState<SortMethod>('alphabetical');
	const [filteredPlants, setFilteredPlants] = useState<Plant[]>(plants);

	const handleSearch = useCallback((searchResults: Plant[]) => {
		setFilteredPlants(searchResults);
	}, []);

	const togglePlant = (plantName: string) => {
		setCheckedPlants((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(plantName)) {
				newSet.delete(plantName);
			} else {
				newSet.add(plantName);
			}
			return newSet;
		});
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<MenuBar plantCount={checkedPlants.size} />
				<Controls
					plants={plants}
					currentSortMethod={sortMethod}
					onSortMethodChange={setSortMethod}
					onSearch={handleSearch}
				/>
				<PlantsList
					plants={filteredPlants}
					sortMethod={sortMethod}
					checkedPlants={checkedPlants}
					onTogglePlant={togglePlant}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f8fafc',
	},
	content: {
		flex: 1,
		paddingTop: 22,
	},
});
