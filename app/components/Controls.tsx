import { View } from 'react-native';

import { Plant, SortMethod } from '../types';

import SearchBar from './SearchBar';
import ResetButton from './ResetButton';
import SortButtons from './SortButtons';

interface ControlsProps {
	onSortMethodChange: (method: SortMethod) => void;
	currentSortMethod: SortMethod;
	onSearch: (searchResults: Plant[]) => void;
	plants: Plant[];
	onReset: () => void;
}

export default function Controls({
	onSortMethodChange,
	currentSortMethod,
	onSearch,
	plants,
	onReset,
}: ControlsProps) {
	return (
		<View className="mt-3 mx-3">
			<View className="mb-3">
				<SearchBar onSearch={onSearch} plants={plants} />
			</View>
			<View className="flex-row justify-between ">
				<View className="max-w-1/3">
					<ResetButton />
				</View>
				<View className="flex-2 flex-row justify-around border border-gray-300 rounded-lg">
					<SortButtons
						onSortMethodChange={onSortMethodChange}
						currentSortMethod={currentSortMethod}
					/>
				</View>
			</View>
		</View>
	);
}
