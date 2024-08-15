import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, Animated, Easing } from 'react-native';

import { plants } from './data/plants';

import PlantProvider from './contexts/PlantContext';

import MenuBar from './components/MenuBar';
import Controls from './components/Controls';
import PlantList from './components/PlantList';

export default function Index() {
	const [showControls, setShowControls] = useState(false);
	const heightAnim = useRef(new Animated.Value(0)).current;

	const toggleControls = () => {
		setShowControls(!showControls);
	};

	useEffect(() => {
		Animated.timing(heightAnim, {
			toValue: showControls ? 132 : 0,
			duration: 300,
			easing: Easing.ease,
			useNativeDriver: false,
		}).start();
	}, [showControls]);

	return (
		<PlantProvider initialPlants={plants}>
			<SafeAreaView className="flex-1 bg-sky-100">
				<MenuBar
					controlsVisible={showControls}
					onToggleControls={toggleControls}
				/>

				<Animated.View
					style={{
						height: heightAnim,
						overflow: 'hidden',
					}}
				>
					<Controls />
				</Animated.View>

				<PlantList />
			</SafeAreaView>
		</PlantProvider>
	);
}
