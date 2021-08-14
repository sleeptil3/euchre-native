import React from 'react';
import { Text } from 'react-native';
import { font, text } from '../styles';

export const Heading = ({ children, align, override }) => {
	return (
		<Text style={[font.heading, { textAlign: align }, override]}>{children}</Text>
	)
}

export const Title = ({ children, align, override }) => {
	return (
		<Text style={[font.title, { textAlign: align }, override]}>{children}</Text>
	)
}

export const Subtitle = ({ children, align, override }) => {
	return (
		<Text style={[font.subtitle, { textAlign: align }, override]}>{children}</Text>
	)
}

export const Body = ({ children, align, override }) => {
	return (
		<Text style={[font.body, { textAlign: align }, override]}>{children}</Text>
	)
}