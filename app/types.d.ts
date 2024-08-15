export interface Plant {
	name: string;
	category: Category;
}

export type Category =
	| 'Citrus fruits'
	| 'Berries'
	| 'Stone fruits'
	| 'Tropical fruits'
	| 'Pome fruits'
	| 'Melons'
	| 'Fruits as vegetables'
	| 'Other vegetables'
	| 'Leafy vegetables'
	| 'Cruciferous vegetables'
	| 'Root vegetables'
	| 'Squash & gourds'
	| 'Alliums'
	| 'Nuts'
	| 'Seeds'
	| 'Grains & pseudo-grains'
	| 'Legumes'
	| 'Brassicas'
	| 'Herbs'
	| 'Spices'
	| 'Fungi'
	| 'Stems & stalks'
	| 'Seaweed & algae'
	| 'Flowers';

export interface PlantCategory {
	title: string;
	data: Plant[];
}
export type SortMethod = 'alphabetical' | 'category';
