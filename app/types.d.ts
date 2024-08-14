export interface Plant {
	name: string;
	category: string;
}

export type SortMethod = 'alphabetical' | 'category';

export interface PlantCategory {
	title: string;
	data: Plant[];
}
