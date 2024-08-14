import { useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

interface SharingPageProps {
	plantCount: number;
}

const SharingPage = ({ plantCount }: SharingPageProps) => {
	const viewRef = useRef<View>(null);
	const [aspectRatio, setAspectRatio] = useState(1);

	const captureAndShare = async () => {
		try {
			const uri = await captureRef(viewRef, {
				format: 'png',
				quality: 0.8,
				result: 'tmpfile',
				width: 1080,
				height: 1080 / aspectRatio,
			});

			await Sharing.shareAsync(uri, {
				mimeType: 'image/png',
				dialogTitle: 'Share your plant count',
			});

			await FileSystem.deleteAsync(uri, { idempotent: true });
		} catch (error) {
			console.error('Error sharing:', error);
		}
	};

	return (
		<View className="flex-1 justify-center items-center p-5">
			<View
				ref={viewRef}
				className={`bg-white p-5 items-center justify-center w-full ${
					aspectRatio === 16 / 9
						? 'aspect-[16/9]'
						: aspectRatio === 9 / 16
						? 'aspect-[9/16]'
						: 'aspect-square'
				}`}
			>
				<View className="flex-row items-center mb-5">
					<Image
						source={require('../../assets/images/icon.png')}
						className="w-12 h-12 mr-2"
					/>
					<Text className="text-2xl font-bold">Plant Counter</Text>
				</View>
				<Text className="text-3xl font-bold text-center">
					I've eaten {plantCount} plants this week
				</Text>
			</View>

			<View className="mt-5">
				<TouchableOpacity
					className="bg-green-500 py-3 px-4 rounded"
					onPress={captureAndShare}
				>
					<Text className="text-white text-lg font-bold">
						Share your plant count
					</Text>
				</TouchableOpacity>
			</View>

			<View className="flex-row justify-around w-full mt-5">
				<TouchableOpacity onPress={() => setAspectRatio(9 / 16)}>
					<Text className="text-blue-500">Portrait</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => setAspectRatio(16 / 9)}>
					<Text className="text-blue-500">Landscape</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => setAspectRatio(1)}>
					<Text className="text-blue-500">Square</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default SharingPage;
