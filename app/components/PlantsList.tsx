import React, { useMemo } from 'react';
import { View, FlatList, SectionList, StyleSheet } from 'react-native';

import { Plant, SortMethod, Section } from '../types';

import PlantRow from './PlantRow';
import PlantGroup from './PlantGroup';

interface PlantsListProps {
	plants: Plant[];
	sortMethod: SortMethod;
	checkedPlants: Set<string>;
	onTogglePlant: (plantName: string) => void;
}

export default function PlantsList({
	plants,
	sortMethod,
	checkedPlants,
	onTogglePlant,
}: PlantsListProps) {
	const sortAlphabetically = (a: Plant, b: Plant) =>
		a.name.localeCompare(b.name);
	const sortByCategory = (a: Plant, b: Plant) =>
		a.category.localeCompare(b.category);

	const groupedData = useMemo<Section[]>(() => {
		const sorted = [...plants].sort(sortByCategory);
		return sorted.reduce<Section[]>((acc, plant) => {
			const category = acc.find((g) => g.title === plant.category);
			if (category) {
				category.data.push(plant);
			} else {
				acc.push({ title: plant.category, data: [plant] });
			}
			return acc;
		}, []);
	}, [plants]);

	const renderPlantRow = ({ item }: { item: Plant }) => (
		<PlantRow
			name={item.name}
			isChecked={checkedPlants.has(item.name)}
			onToggle={() => onTogglePlant(item.name)}
		/>
	);

	const renderGrantGroup = ({ section }: { section: Section }) => (
		<PlantGroup
			category={section.title}
			plants={section.data}
			checkedPlants={checkedPlants}
			onTogglePlant={onTogglePlant}
		/>
	);

	return (
		<View style={styles.container}>
			{sortMethod === 'alphabetical' ? (
				<FlatList
					data={plants.sort(sortAlphabetically)}
					renderItem={renderPlantRow}
					keyExtractor={(item) => item.name}
					style={styles.alphabetical}
				/>
			) : (
				<SectionList
					sections={groupedData}
					renderItem={() => null}
					renderSectionHeader={renderGrantGroup}
					keyExtractor={(item) => item.name}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	alphabetical: {
		marginHorizontal: 8,
	},
});