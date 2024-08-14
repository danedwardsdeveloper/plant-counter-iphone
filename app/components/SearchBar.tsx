import { View, TextInput, TouchableOpacity } from 'react-native';
import SearchManager from './SearchHandler';
import Icon from './Icon';

export default function SearchBar() {
	return (
		<SearchManager>
			{({ searchTerm, handleSearch, handleClear }) => (
				<View className="flex-row items-center bg-slate-200 rounded-2xl px-3">
					<Icon name="magnifyingGlass" size={20} colour="text-gray-600" />
					<TextInput
						value={searchTerm}
						onChangeText={handleSearch}
						placeholder="Search"
						className="flex-1 text-base py-3 px-1 text-gray-800"
						placeholderTextColor="#4B5563"
					/>
					{searchTerm.length > 0 && (
						<TouchableOpacity onPress={handleClear}>
							<Icon name="close" size={20} colour="text-red-600" />
						</TouchableOpacity>
					)}
				</View>
			)}
		</SearchManager>
	);
}
