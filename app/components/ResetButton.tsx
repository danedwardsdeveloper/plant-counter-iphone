import { TouchableOpacity, Text } from 'react-native';

interface ResetButtonProps {
	onReset: () => void;
}

export default function ResetButton({ onReset }: ResetButtonProps) {
	return (
		<TouchableOpacity
			className="
    bg-red-400 p-3 rounded-lg m-1"
			onPress={onReset}
		>
			<Text className="text-black text-sm font-semibold">Reset</Text>
		</TouchableOpacity>
	);
}
