import { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native';

import { SortMethod, Plant } from './types';

import { plants } from './data/plants';

import MenuBar from './components/MenuBar';
import Controls from './components/Controls';
import PlantList from './components/PlantList';

export default function Index() {
	const [checkedPlants, setCheckedPlants] = useState<Set<string>>(new Set());
	const [sortMethod, setSortMethod] = useState<SortMethod>('alphabetical');
	const [filteredPlants, setFilteredPlants] = useState<Plant[]>(plants);
	const [showControls, setShowControls] = useState(false);

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

	const toggleControls = () => {
		setShowControls(!showControls);
	};

	const resetCheckedPlants = () => {
		setCheckedPlants(new Set());
	};

	return (
		<SafeAreaView className="flex-1 bg-sky-100">
			<MenuBar
				plantCount={checkedPlants.size}
				controlsVisible={showControls}
				onToggleControls={toggleControls}
			/>
			{showControls && (
				<Controls
					plants={plants}
					currentSortMethod={sortMethod}
					onSortMethodChange={setSortMethod}
					onSearch={handleSearch}
					onReset={resetCheckedPlants}
				/>
			)}
			<PlantList
				plants={filteredPlants}
				sortMethod={sortMethod}
				checkedPlants={checkedPlants}
				onTogglePlant={togglePlant}
			/>
		</SafeAreaView>
	);
}
