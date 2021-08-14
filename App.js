import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, Button, Image, Modal, Pressable, ScrollView, View } from 'react-native';
import { Heading, Title, Subtitle, Body } from './CoreComponents/text';
import { Flex } from './CoreComponents/containers';
import { colors } from './styles';

export default function App() {
	const [showModal, setShowModal] = useState(false)

	return (
		<Flex safe color="background" justify="flex-start" align="center">
			<StatusBar style="light" />
			<Heading>Heading</Heading>
			<Title>Title</Title>
			<Subtitle>Subtitle</Subtitle>
			<Body>Body</Body>
			<ActivityIndicator style={{ margin: 20 }} animating="true" color={colors.secondary} size="large" />
			<Image source={require("./assets/hand.png")} style={{ height: 1261 / 8, width: 1026 / 8, resizeMode: "contain" }} />
			<Button
				accessibilityLabel="Learn more about this purple button"
				title="Press Me"
				color={colors.secondary}
				onPress={() => alert("Button Pressed")}
			/>
			<Pressable
				onPress={() => alert("Button Pressed")}
				style={({ pressed }) => {
					return (
						{
							backgroundColor: pressed ? "transparent" : colors.secondary,
							paddingVertical: 8,
							paddingHorizontal: 18,
							borderRadius: 30,
							borderColor: colors.secondary,
							borderWidth: 2,
							margin: 10
						}
					)
				}
				}
			>
				<Subtitle override={{ marginBottom: 0, fontSize: 16 }}>Press Me</Subtitle>
			</Pressable>
			<Pressable
				onPress={() => setShowModal(true)}
				style={({ pressed }) => {
					return (
						{
							backgroundColor: pressed ? "transparent" : colors.secondary,
							paddingVertical: 8,
							paddingHorizontal: 18,
							borderRadius: 30,
							borderColor: colors.secondary,
							borderWidth: 2,
							margin: 10
						}
					)
				}}
			>
				<Subtitle override={{ marginBottom: 0, fontSize: 16 }}>Show Modal</Subtitle>
			</Pressable>
			<Modal
				animationType="slide"
				transparent={true}
				visible={showModal}
			>
				<View style={{ justifyContent: "center", alignItems: "center", position: "absolute", bottom: 24, width: "100%" }} >
					<View style={{ width: "88%", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 32, backgroundColor: colors.secondary }}>
						<Flex justify="space-between" align="center">
							<Subtitle override={{ fontWeight: "bold" }}>Modal</Subtitle>
							<View>
								<Subtitle align="center" override={{ marginBottom: 7, fontSize: 24 }}>Welcome to the modal</Subtitle>
								<Body align="center" override={{ marginBottom: 32, fontSize: 16 }}>Here is a bunch of modal text that would be displayed, happily, forthwith, and in perpetuity.</Body>
							</View>
							<Pressable
								onPress={() => setShowModal(false)}
								style={({ pressed }) => {
									return (
										{
											backgroundColor: pressed ? colors.white : "transparent",
											borderColor: colors.secondary,
											borderRadius: 30,
											paddingVertical: 12,
											paddingHorizontal: 50,
											borderWidth: 1,
											borderColor: colors.white,
											marginBottom: 10
										}
									)
								}}
							>
								<Subtitle align="center" override={{ marginBottom: 0, fontSize: 18 }}>Close</Subtitle>
							</Pressable>

							{/* <Button title="Close" color={colors.white} onPress={() => setShowModal(false)} /> */}
						</Flex>
					</View>
				</View>
			</Modal>
		</Flex>
	);
}