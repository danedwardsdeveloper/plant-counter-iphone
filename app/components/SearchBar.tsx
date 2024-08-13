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
				<View className="flex-row items-center justify-center rounded-2xl bg-slate-200">
					<View className="flex-row items-center justify-center rounded-xl bg-slate-200 px-2.5">
						<View className="flex-row items-center flex-1">
							<Icon
								name="magnifyingGlass"
								size={30}
								colour="text-gray-600"
							/>
						</View>
						<TextInput
							value={searchTerm}
							onChangeText={handleSearch}
							placeholder="Search"
							className="flex-1 text-base py-3 text-center placeholder-gray-600"
							placeholderTextColor="#4B5563"
						/>
					</View>
					{searchTerm.length > 0 && (
						<TouchableOpacity onPress={handleClear} className="p-2.5">
							<Icon name="close" size={30} colour="text-gray-600" />
						</TouchableOpacity>
					)}
				</View>
			)}
		</SearchManager>
	);
}
