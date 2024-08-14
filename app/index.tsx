import { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native';

import { Plant } from './types';

import PlantProvider from './contexts/PlantContext';

import { plants } from './data/plants';

import MenuBar from './components/MenuBar';
import Controls from './components/Controls';
import PlantList from './components/PlantList';

export default function Index() {
	const [showControls, setShowControls] = useState(false);

	const toggleControls = () => {
		setShowControls(!showControls);
	};

	// const handleSearch = useCallback((searchResults: Plant[]) => {
	// 	setFilteredPlants(searchResults);
	// }, []);

	return (
		<PlantProvider initialPlants={plants}>
			<SafeAreaView className="flex-1 bg-sky-100">
				<MenuBar
					controlsVisible={showControls}
					onToggleControls={toggleControls}
				/>

				{showControls && <Controls />}

				<PlantList />
			</SafeAreaView>
		</PlantProvider>
	);
}
