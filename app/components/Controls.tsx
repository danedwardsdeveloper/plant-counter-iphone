import { View } from 'react-native';

import { usePlantContext } from '../contexts/PlantContext';

import SearchBar from './SearchBar';
import ResetButton from './ResetButton';
import SortButtons from './SortButtons';

export default function Controls() {
	const { sortMethod, setSortMethod } = usePlantContext();

	return (
		<View className="mt-3 mx-3">
			<View className="mb-3">
				<SearchBar />
			</View>
			<View className="flex-row justify-between ">
				<View className="max-w-1/3">
					<ResetButton />
				</View>
				<View className="flex-2 flex-row justify-around border border-gray-300 rounded-lg">
					<SortButtons
						onSortMethodChange={setSortMethod}
						currentSortMethod={sortMethod}
					/>
				</View>
			</View>
		</View>
	);
}
