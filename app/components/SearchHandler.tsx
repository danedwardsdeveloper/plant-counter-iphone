import { useState, useCallback, useMemo, useEffect } from 'react';
import Fuse from 'fuse.js';

import { Plant } from '../types';

import { usePlantContext } from '../contexts/PlantContext';

import { plants as originalPlants } from '../data/plants';

interface SearchHandlerProps {
	children: (props: {
		searchTerm: string;
		handleSearch: (term: string) => void;
		handleClear: () => void;
	}) => React.ReactNode;
}

export default function SearchHandler({ children }: SearchHandlerProps) {
	const { filteredPlants, setFilteredPlants } = usePlantContext();

	const [searchTerm, setSearchTerm] = useState('');
	const [version, setVersion] = useState(0);

	useEffect(() => {
		setVersion((v) => v + 1);
	}, [originalPlants]);

	const fuse = useMemo(
		() =>
			new Fuse(filteredPlants, {
				keys: ['name', 'category'],
				threshold: 0.3,
				ignoreLocation: true,
			}),
		[originalPlants, version]
	);

	const handleSearch = useCallback(
		(term: string) => {
			setSearchTerm(term);

			if (term.trim() === '') {
				setFilteredPlants(originalPlants);
			} else {
				const exactNameMatch = filteredPlants.filter(
					(plant) => plant.name.toLowerCase() === term.toLowerCase()
				);

				const exactCategoryMatch = filteredPlants.filter(
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

				setFilteredPlants(uniqueResults);
			}
		},
		[fuse, setFilteredPlants, filteredPlants]
	);

	const handleClear = useCallback(() => {
		setSearchTerm('');
		setFilteredPlants(originalPlants);
	}, [setFilteredPlants, filteredPlants]);

	return children({ searchTerm, handleSearch, handleClear });
}
