export interface Plant {
	name: string;
	category: Category;
}

export type SortMethod = 'alphabetical' | 'category';

export interface PlantCategory {
	title: string;
	data: Plant[];
}
