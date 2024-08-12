import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Fuse from 'fuse.js';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-regular-svg-icons/faRectangleXmark';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import tw from 'twrnc';

import { Plant } from '../types';

interface SearchProps {
	onSearch: (searchResults: Plant[]) => void;
	plants: Plant[];
}

export default function Search({ plants, onSearch }: SearchProps) {
	const [searchTerm, setSearchTerm] = useState('');
	const [version, setVersion] = useState(0);

	useEffect(() => {
		setVersion((v) => v + 1);
	}, [plants]);

	const fuse = useMemo(
		() =>
			new Fuse(plants, {
				keys: ['name', 'category'],
				threshold: 0.2,
				ignoreLocation: true,
				minMatchCharLength: 2,
			}),
		[plants, version]
	);

	const handleSearch = useCallback(
		(term: string) => {
			setSearchTerm(term);

			if (term.trim() === '') {
				onSearch(plants);
			} else {
				const exactNameMatch = plants.filter(
					(plant) => plant.name.toLowerCase() === term.toLowerCase()
				);

				const exactCategoryMatch = plants.filter(
					(plant) => plant.category.toLowerCase() === term.toLowerCase()
				);

				const fuzzyResults = fuse
					.search(term, { limit: 10 })
					.map((result) => result.item);

				const combinedResults = [
					...exactNameMatch,
					...exactCategoryMatch,
					...fuzzyResults.filter(
						(item) =>
							!exactNameMatch.some(
								(exact) => exact.name === item.name
							) &&
							!exactCategoryMatch.some(
								(exact) => exact.name === item.name
							)
					),
				];

				const uniqueResults = Array.from(new Set(combinedResults));

				onSearch(uniqueResults);
			}
		},
		[fuse, onSearch, plants]
	);

	const handleClear = useCallback(() => {
		setSearchTerm('');
		onSearch(plants);
	}, [onSearch, plants]);

	return (
		<View style={tw`p-2.5`}>
			<View
				style={tw`flex-row items-center border border-gray-300 rounded-lg bg-white`}
			>
				<View style={tw`p-2.5`}>
					<Icon
						icon={faMagnifyingGlass}
						size={20}
						color={tw.color('text-gray-400')}
					/>
				</View>
				<TextInput
					value={searchTerm}
					onChangeText={handleSearch}
					placeholder="Search by name or category..."
					style={tw`flex-1 h-10 text-base py-3`}
				/>
				{searchTerm.length > 0 && (
					<TouchableOpacity onPress={handleClear} style={tw`p-2.5`}>
						<Icon
							icon={faRectangleXmark}
							size={20}
							color={tw.color('text-red-500')}
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}
