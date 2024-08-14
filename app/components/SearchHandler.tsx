import { useState, useCallback, useMemo, useEffect } from 'react';
import Fuse from 'fuse.js';
import { Plant } from '../types';

interface SearchHandlerProps {
	plants: Plant[];
	onSearch: (searchResults: Plant[]) => void;
	children: (props: {
		searchTerm: string;
		handleSearch: (term: string) => void;
		handleClear: () => void;
	}) => React.ReactNode;
}

export default function SearchHandler({
	plants,
	onSearch,
	children,
}: SearchHandlerProps) {
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

	return children({ searchTerm, handleSearch, handleClear });
}
