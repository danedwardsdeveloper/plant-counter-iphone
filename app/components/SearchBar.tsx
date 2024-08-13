import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';

import { Plant } from '../types';

import SearchManager from './SearchHandler';
import Icon from './Icon';

interface SearchBarProps {
	plants: Plant[];
	onSearch: (searchResults: Plant[]) => void;
}

export default function SearchBar({ plants, onSearch }: SearchBarProps) {
	return (
		<SearchManager plants={plants} onSearch={onSearch}>
			{({ searchTerm, handleSearch, handleClear }) => (
				<View className="flex-row items-center justify-center border border-gray-300 rounded-lg bg-slate m-2">
					<View className="absolute left-2.5">
						<Icon
							name="magnifyingGlass"
							size={30}
							colour="text-gray-500"
						/>
					</View>
					<TextInput
						value={searchTerm}
						onChangeText={handleSearch}
						placeholder="Search"
						className="flex-1 text-base py-3 text-center"
					/>
					{searchTerm.length > 0 && (
						<TouchableOpacity onPress={handleClear} className="p-2.5">
							<Icon name="close" size={30} colour="text-gray-500" />
						</TouchableOpacity>
					)}
				</View>
			)}
		</SearchManager>
	);
}
