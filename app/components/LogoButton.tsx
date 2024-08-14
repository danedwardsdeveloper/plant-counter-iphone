import { useState } from 'react';
import {
	Modal,
	Text,
	Pressable,
	View,
	TouchableOpacity,
	Image,
} from 'react-native';
import { BlurView } from 'expo-blur';

import { usePlantContext } from '../contexts/PlantContext';

import Icon from './Icon';

export default function LogoButton() {
	const [modalVisible, setModalVisible] = useState(false);
	const { checkedPlants } = usePlantContext();

	const useSingular: boolean = checkedPlants.size === 1;

	return (
		<>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<BlurView intensity={10} tint="dark" style={{ flex: 1 }}>
					<View className="flex-1 justify-center items-center px-5">
						<View className="bg-white rounded-3xl p-6 items-center shadow-lg w-full max-w-md">
							<Text className="text-xl font-bold text-green-700">
								Plant Counter
							</Text>

							<View className="w-20 h-6">
								<Image
									source={require('../../assets/images/appStore.png')}
									className="h-full w-full"
									resizeMode="contain"
								/>
							</View>

							<View className="w-32 h-32 mb-6">
								<Image
									source={require('../../assets/images/icon.png')}
									className="w-full h-full rounded-lg"
								/>
							</View>

							<Text className="mb-6 text-center text-2xl font-bold">
								I've eaten{' '}
								<Text className="bg-green-600 py-1 px-2 rounded text-white">
									{' '}
									{checkedPlants.size}{' '}
								</Text>{' '}
								plant{useSingular ? '' : 's'} so far this week
							</Text>

							<Pressable
								className="bg-green-600 py-3 px-6 rounded-lg"
								onPress={() => setModalVisible(false)}
							>
								<Text className="text-white font-bold text-center">
									Done
								</Text>
							</Pressable>
						</View>
					</View>
				</BlurView>
			</Modal>

			<TouchableOpacity onPress={() => setModalVisible(true)}>
				<Icon name="leaf" colour="text-green-600" size={40} />
			</TouchableOpacity>
		</>
	);
}
