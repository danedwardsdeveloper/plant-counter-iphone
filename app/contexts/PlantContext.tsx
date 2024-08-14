import { createContext, useContext, useState, ReactNode } from 'react';

interface PlantContextType {
	checkedPlants: Set<string>;
	togglePlant: (plantName: string) => void;
	resetCheckedPlants: () => void;
}

const PlantContext = createContext<PlantContextType>({} as PlantContextType);

interface PlantProviderProps {
	children: ReactNode;
}

export default function PlantProvider({ children }: PlantProviderProps) {
	const [checkedPlants, setCheckedPlants] = useState<Set<string>>(new Set());

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
			value={{ checkedPlants, togglePlant, resetCheckedPlants }}
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
