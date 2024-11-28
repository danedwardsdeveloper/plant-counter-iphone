import { useState, useCallback } from 'react';
import { Modal, Text, Pressable, View, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { usePlantContext } from '../contexts/AppContext';

export default function ResetButton() {
	const [modalVisible, setModalVisible] = useState(false);
	const { checkedPlants, resetCheckedPlants } = usePlantContext();

	const handleReset = useCallback(() => {
		setModalVisible(false);
		resetCheckedPlants();
	}, [resetCheckedPlants]);

	const isDisabled = checkedPlants.size === 0;

	return (
		<View className="flex-1 justify-center items-center">
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<BlurView intensity={20} tint="dark" style={{ flex: 1 }}>
					<View className="flex-1 justify-center items-center  ">
						<View className="m-5 bg-white rounded-3xl p-9 items-center shadow-lg">
							<Text className="mb-4 text-center text-lg font-bold">
								Are you sure you want to reset?
							</Text>
							<View className="flex-row justify-between w-full">
								<Pressable
									className="bg-gray-300 p-3 rounded-lg m-1"
									onPress={() => setModalVisible(false)}
								>
									<Text className="text-black font-bold text-center">
										Cancel
									</Text>
								</Pressable>
								<Pressable
									className="bg-red-400 p-3 rounded-lg m-1"
									onPress={handleReset}
								>
									<Text className="text-black font-bold text-center">
										Reset
									</Text>
								</Pressable>
							</View>
						</View>
					</View>
				</BlurView>
			</Modal>
			<TouchableOpacity
				className={`bg-red-400 p-3 rounded-lg m-1 ${
					isDisabled ? 'opacity-50' : ''
				}`}
				onPress={() => setModalVisible(true)}
				disabled={isDisabled}
			>
				<Text className="text-black text-sm font-semibold">Reset</Text>
			</TouchableOpacity>
		</View>
	);
}
