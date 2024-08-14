import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

import { usePlantContext } from '../contexts/PlantContext';

import Icon from './Icon';
import About from './LogoButton';

interface MenuBarProps {
	controlsVisible: boolean;
	onToggleControls: () => void;
}

export default function MenuBar({
	controlsVisible,
	onToggleControls,
}: MenuBarProps) {
	const { checkedPlants } = usePlantContext();

	const rotateAnim = React.useRef(
		new Animated.Value(controlsVisible ? 1 : 0)
	).current;

	React.useEffect(() => {
		Animated.timing(rotateAnim, {
			toValue: controlsVisible ? 1 : 0,
			duration: 300,
			useNativeDriver: true,
		}).start();
	}, [controlsVisible, rotateAnim]);

	const rotate = rotateAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '-180deg'],
	});

	return (
		<View className="flex-row justify-between items-center mt-5 px-3">
			<About />

			<Text className="text-4xl font-bold">{checkedPlants.size}</Text>

			<TouchableOpacity onPress={onToggleControls}>
				<Animated.View style={{ transform: [{ rotate }] }}>
					<Icon name="chevron" colour="text-green-600" size={40} />
				</Animated.View>
			</TouchableOpacity>
		</View>
	);
}
