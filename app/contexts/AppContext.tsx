import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SortMethod, Plant } from '../types';

interface AppContextType {
	checkedPlants: Set<string>;
	togglePlant: (plantName: string) => void;
	resetCheckedPlants: () => void;
	sortMethod: SortMethod;
	setSortMethod: (method: SortMethod) => void;
	filteredPlants: Plant[];
	setFilteredPlants: (plants: Plant[]) => void;
}

const STORAGE_KEYS = {
	CHECKED_PLANTS: '@plant_counter_checked_plants',
	SORT_METHOD: '@plant_counter_sort_method',
} as const;

const AppContext = createContext<AppContextType>({} as AppContextType);

interface Props {
	children: ReactNode;
	initialPlants: Plant[];
}

export default function AppProvider({ children, initialPlants }: Props) {
	const [checkedPlants, setCheckedPlants] = useState<Set<string>>(new Set());
	const [sortMethod, setSortMethod] = useState<SortMethod>('alphabetical');
	const [filteredPlants, setFilteredPlants] = useState<Plant[]>(initialPlants);

	useEffect(() => {
		const loadSavedData = async () => {
			try {
				const savedCheckedPlants = await AsyncStorage.getItem(
					STORAGE_KEYS.CHECKED_PLANTS
				);
				if (savedCheckedPlants) {
					setCheckedPlants(new Set(JSON.parse(savedCheckedPlants)));
				}

				const savedSortMethod = await AsyncStorage.getItem(
					STORAGE_KEYS.SORT_METHOD
				);
				if (savedSortMethod) {
					setSortMethod(savedSortMethod as SortMethod);
				}
			} catch (error) {
				console.error('Error loading saved data:', error);
			}
		};

		loadSavedData();
	}, []);

	const togglePlant = async (plantName: string) => {
		setCheckedPlants((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(plantName)) {
				newSet.delete(plantName);
			} else {
				newSet.add(plantName);
			}

			AsyncStorage.setItem(
				STORAGE_KEYS.CHECKED_PLANTS,
				JSON.stringify(Array.from(newSet))
			).catch((error) =>
				console.error('Error saving checked plants:', error)
			);

			return newSet;
		});
	};

	const resetCheckedPlants = async () => {
		setCheckedPlants(new Set());
		try {
			await AsyncStorage.removeItem(STORAGE_KEYS.CHECKED_PLANTS);
		} catch (error) {
			console.error('Error resetting checked plants:', error);
		}
	};

	const handleSetSortMethod = async (method: SortMethod) => {
		setSortMethod(method);
		try {
			await AsyncStorage.setItem(STORAGE_KEYS.SORT_METHOD, method);
		} catch (error) {
			console.error('Error saving sort method:', error);
		}
	};

	return (
		<AppContext.Provider
			value={{
				checkedPlants,
				togglePlant,
				resetCheckedPlants,
				sortMethod,
				setSortMethod: handleSetSortMethod,
				filteredPlants,
				setFilteredPlants,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export function usePlantContext() {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('usePlantContext must be used within the AppProvider');
	}
	return context;
}
