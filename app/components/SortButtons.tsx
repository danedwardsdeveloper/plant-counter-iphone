import { TouchableOpacity, Text } from 'react-native';

import { SortMethod } from '../types';

interface SortButtonsProps {
	onSortMethodChange: (method: SortMethod) => void;
	currentSortMethod: SortMethod;
}

export default function SortButtons({
	onSortMethodChange,
	currentSortMethod,
}: SortButtonsProps) {
	const renderButton = (method: SortMethod, label: string) => (
		<TouchableOpacity
			className={`
        bg-slate-200 p-3 rounded-lg m-1
        ${method === currentSortMethod ? 'bg-green-300' : ''}
      `}
			onPress={() => onSortMethodChange(method)}
		>
			<Text
				className={`
          text-sm font-semibold
          ${method === currentSortMethod ? 'text-black' : 'text-gray-600'}
        `}
			>
				{label}
			</Text>
		</TouchableOpacity>
	);

	return (
		<>
			{renderButton('alphabetical', 'Alphabetical')}
			{renderButton('category', 'Category')}
		</>
	);
}
