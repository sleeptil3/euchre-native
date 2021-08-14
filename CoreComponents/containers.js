import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { colors } from '../styles';

export const Flex = ({ children, justify, align, color, safe }) => {
	return safe ?
		<SafeAreaView style={{ flex: 1, justifyContent: justify, alignItems: align, backgroundColor: colors[color] }}>{children}</SafeAreaView>
		: <View style={{ flex: 1, justifyContent: justify, alignItems: align, backgroundColor: colors[color] }}>{children}</View>
}