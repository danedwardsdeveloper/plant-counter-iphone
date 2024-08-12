import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons/faEllipsis';
import tw from 'twrnc';

interface MenuBarProps {
	plantCount: number;
}

export default function MenuBar({ plantCount }: MenuBarProps) {
	return (
		<View style={styles.header}>
			<View style={styles.counterContainer}>
				<Text style={styles.counter}>{plantCount}</Text>
			</View>
			<TouchableOpacity style={styles.menuButton}>
				<Text>
					<Icon
						icon={faEllipsis}
						size={40}
						color={tw.color('text-slate-800')}
					/>
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#e0e0e0',
		paddingBottom: 20,
	},
	counterContainer: {
		flex: 1,
		alignItems: 'center',
	},
	counter: {
		fontSize: 40,
		fontWeight: 'bold',
	},
	menuButton: {
		position: 'absolute',
		right: 15,
	},
});
