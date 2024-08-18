import { useState } from 'react';
import {
	Modal,
	Text,
	Pressable,
	View,
	TouchableOpacity,
	Image,
	TouchableWithoutFeedback,
} from 'react-native';
import { BlurView } from 'expo-blur';

import { usePlantContext } from '../contexts/PlantContext';

import Icon from './Icon';

export default function LogoButton() {
	const [modalVisible, setModalVisible] = useState(false);
	const { checkedPlants } = usePlantContext();

	const useSingular: boolean = checkedPlants.size === 1;

	const closeModal = () => {
		setModalVisible(false);
	};

	return (
		<>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={closeModal}
			>
				<TouchableWithoutFeedback onPress={closeModal}>
					<BlurView intensity={10} tint="dark" style={{ flex: 1 }}>
						<View className="flex-1 justify-center items-center px-5">
							<View className="bg-white rounded-3xl p-6 items-center shadow-lg w-full max-w-md">
								<Text className="mb-12 text-center text-3xl font-bold">
									I've eaten{' '}
									<View className="bg-green-600 rounded-md p3">
										<Text className="text-white text-3xl">
											{' '}
											{checkedPlants.size}{' '}
										</Text>
									</View>{' '}
									plant{useSingular ? '' : 's'} so far this week
								</Text>

								<View className="flex-row h-28 w-full justify-between">
									<View className="flex-col justify-end">
										<View className="w-22 h-8">
											<Image
												source={require('../../assets/images/appStore.png')}
												className="h-full w-full"
												resizeMode="contain"
											/>
										</View>

										<Text className="text-base font-bold text-green-700">
											Plant-Counter
										</Text>
									</View>

									<View className="w-28 h-28">
										<Image
											source={require('../../assets/images/icon.png')}
											className="w-full h-full rounded-lg"
										/>
									</View>
								</View>
							</View>
						</View>
					</BlurView>
				</TouchableWithoutFeedback>
			</Modal>

			<TouchableOpacity onPress={() => setModalVisible(true)}>
				<Icon name="leaf" colour="text-green-600" size={40} />
			</TouchableOpacity>
		</>
	);
}
