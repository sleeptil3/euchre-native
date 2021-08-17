import React from 'react';
import { View, SafeAreaView } from 'react-native';

export const Flex = ({ direction, children, justify, align, color, safe, fill, height, width, override }) => {
	return safe ?
		<SafeAreaView style={[{ flex: fill || 1, flexDirection: direction ? direction : "column", height: height || "auto", width: width || "auto", justifyContent: justify, alignItems: align, backgroundColor: color || "transparent" }, { ...override }]}>{children}</SafeAreaView>
		: <View style={[{ flex: fill || 1, flexDirection: direction ? direction : "column", height: height || "auto", width: width || "auto", justifyContent: justify || "flex-start", alignItems: align || "flex-start", backgroundColor: color || "transparent" }, { ...override }]}>{children}</View>
}