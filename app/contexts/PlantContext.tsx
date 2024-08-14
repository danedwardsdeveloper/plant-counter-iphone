import { createContext, useContext, useState, ReactNode } from 'react';

import { SortMethod, Plant } from '../types';

interface PlantContextType {
	checkedPlants: Set<string>;
	togglePlant: (plantName: string) => void;
	resetCheckedPlants: () => void;
	sortMethod: SortMethod;
	setSortMethod: (method: SortMethod) => void;
	filteredPlants: Plant[];
	setFilteredPlants: (plants: Plant[]) => void;
}

const PlantContext = createContext<PlantContextType>({} as PlantContextType);

interface PlantProviderProps {
	children: ReactNode;
	initialPlants: Plant[];
}

export default function PlantProvider({
	children,
	initialPlants,
}: PlantProviderProps) {
	const [checkedPlants, setCheckedPlants] = useState<Set<string>>(new Set());
	const [sortMethod, setSortMethod] = useState<SortMethod>('alphabetical');
	const [filteredPlants, setFilteredPlants] = useState<Plant[]>(initialPlants);

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

	const resetCheckedPlants = () => {
		setCheckedPlants(new Set());
	};

	return (
		<PlantContext.Provider
			value={{
				checkedPlants,
				togglePlant,
				resetCheckedPlants,
				sortMethod,
				setSortMethod,
				filteredPlants,
				setFilteredPlants,
			}}
		>
			{children}
		</PlantContext.Provider>
	);
}

export function usePlantContext() {
	const context = useContext(PlantContext);
	if (!context) {
		throw new Error('usePlantContext must be used within a PlantProvider');
	}
	return context;
}
