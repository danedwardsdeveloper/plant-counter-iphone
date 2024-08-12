export interface Plant {
	name: string;
	category: string;
}

export type SortMethod = 'alphabetical' | 'category';

export interface Section {
	title: string;
	data: Plant[];
}
