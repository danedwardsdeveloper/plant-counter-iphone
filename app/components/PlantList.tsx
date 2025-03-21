import { useMemo } from 'react';
import { View, Text, ScrollView, SectionList, Pressable } from 'react-native';
import Icon from './Icon';

import { Plant, PlantCategory } from '../types';

import { usePlantContext } from '../contexts/AppContext';

export default function PlantsList() {
	const { filteredPlants, sortMethod, checkedPlants, togglePlant } =
		usePlantContext();

	const sortAlphabetically = (a: Plant, b: Plant) =>
		a.name.localeCompare(b.name);
	const sortByCategory = (a: Plant, b: Plant) =>
		a.category.localeCompare(b.category);

	const alphabeticallySortedPlants = useMemo(() => {
		return [...filteredPlants].sort(sortAlphabetically);
	}, [filteredPlants]);

	const groupedData = useMemo<PlantCategory[]>(() => {
		const sorted = [...filteredPlants].sort(sortByCategory);
		return sorted.reduce<PlantCategory[]>((acc, plant) => {
			const category = acc.find((g) => g.title === plant.category);
			if (category) {
				category.data.push(plant);
			} else {
				acc.push({ title: plant.category, data: [plant] });
			}
			return acc;
		}, []);
	}, [filteredPlants]);

	const renderPlantRow = (
		name: string,
		isChecked: boolean,
		onToggle: () => void
	) => (
		<Pressable
			key={name}
			onPress={onToggle}
			className="flex flex-row items-center justify-between py-2 bg-white"
		>
			<Text
				className={`text-lg font-bold ${
					isChecked ? 'text-green-500 line-through' : 'text-black'
				}`}
			>
				{name}
			</Text>
			<Icon
				name={isChecked ? `checkbox` : `square`}
				colour={isChecked ? `text-green-500` : `text-gray-400`}
				size={40}
			/>
		</Pressable>
	);

	const renderPlantGroup = ({ section }: { section: PlantCategory }) => (
		<View key={section.title} className="mx-3 mb-3 p-6 bg-white rounded-2xl">
			<Text className="text-lg text-gray-600 mb-3">{section.title}</Text>
			{section.data.map((plant) =>
				renderPlantRow(plant.name, checkedPlants.has(plant.name), () =>
					togglePlant(plant.name)
				)
			)}
		</View>
	);

	const renderPlantRows = (plantsToRender: Plant[]) => {
		return plantsToRender.map((plant) =>
			renderPlantRow(plant.name, checkedPlants.has(plant.name), () =>
				togglePlant(plant.name)
			)
		);
	};

	const NothingFoundMessage = () => (
		<View className="mt-3 items-center pt-10 px-6 py-3 mx-3 bg-white rounded-2xl">
			<Text className="text-xl text-red-600">Sorry, no results.</Text>
		</View>
	);

	if (filteredPlants.length === 0) {
		return <NothingFoundMessage />;
	}

	return (
		<View className="flex-1">
			{sortMethod === 'alphabetical' ? (
				<ScrollView className="flex-1 mt-3">
					<View className="mx-3 mb-20 px-6 py-3 bg-white rounded-2xl overflow-hidden">
						{renderPlantRows(alphabeticallySortedPlants)}
					</View>
				</ScrollView>
			) : (
				<SectionList
					sections={groupedData}
					renderItem={() => null}
					renderSectionHeader={renderPlantGroup}
					keyExtractor={(item) => item.name}
					contentContainerStyle={{ paddingTop: 12 }}
				/>
			)}
		</View>
	);
}
