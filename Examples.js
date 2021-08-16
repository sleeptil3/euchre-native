import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, Image, Modal, SafeAreaView, ScrollView, View } from 'react-native';
import { Heading, Title, Subtitle, Body } from './CoreElements/fontStyles';
import { Flex } from './CoreElements/containerStyles';
import { ButtonSetValue, ButtonToggle } from './CoreElements/buttonStyles';
import { colors } from './CoreElements/theme';


export default function Examples() {
	const [showModal, setShowModal] = useState(false)
	const [loading, setLoading] = useState(true)
	const [testIncrement, setTestIncrement] = useState(0)
	const [testArrayAdd, setTestArrayAdd] = useState(["a", "b", "c"])
	const [testArrayConcat, setTestArrayConcat] = useState(["a", "b", "c"])
	const [testArrayOW, setTestArrayOW] = useState(["a", "b", "c"])


	return (
		<SafeAreaView style={{ height: "100%", backgroundColor: colors.background }}>
			<ScrollView>
				<Flex justify="flex-start" align="center">
					<StatusBar style="light" hidden={false} />
					<View style={{ paddingHorizontal: 12 }}>
						<Heading align="center" color={colors.secondary} override={{ marginTop: 20 }}>CoreElements</Heading>
						<Body align="center" override={{ marginTop: 20 }}>( FontStyles )</Body>
						<Heading>Heading</Heading>
						<Title>Title</Title>
						<Subtitle>Subtitle</Subtitle>
						<Body>Body - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et netus et malesuada fames ac turpis egestas maecenas. Nam at lectus urna duis. Et sollicitudin ac orci phasellus egestas tellus rutrum. Adipiscing enim eu turpis egestas.</Body>
					</View>
					<Body align="center" override={{ marginTop: 30 }}>( ButtonStyles )</Body>
					<ButtonSetValue
						size="small"
						text="Small Button"
						setState={alert}
						value="Small Button Pressed!"
						color={colors.secondary}
					/>
					<ButtonSetValue
						altText="Example of large alert button"
						size="large"
						text="Large Button"
						setState={alert}
						value="Large Button Pressed!"
						color={colors.secondaryDark}
						pressColor={colors.secondary}
					/>
					<Body override={{ marginTop: 20 }}>Value: {testIncrement}</Body>
					<ButtonSetValue
						overwrite={true}
						size="small"
						setState={setTestIncrement}
						state={testIncrement}
						value={testIncrement + 1}
						color={colors.secondary}
						altText="Button to increment value"
						text="Button as Incrementer"
						override={{ borderRadius: 0 }}
					/>
					<Body override={{ marginTop: 20 }}>Value: {testArrayAdd.join("-")}</Body>
					<ButtonSetValue
						overwrite={false}
						size="large"
						setState={setTestArrayAdd}
						state={testArrayAdd}
						value={"d"}
						color={colors.secondaryDark}
						pressColor={colors.secondary}
						altText="Button to add to arr values"
						text="Add 'd'"
						override={{ borderRadius: 0 }}
					/>
					<Body override={{ marginTop: 20 }}>Value: {testArrayConcat.join("-")}</Body>
					<ButtonSetValue
						overwrite={false}
						size="large"
						setState={setTestArrayConcat}
						state={testArrayConcat}
						value={['d', 'e', 'f']}
						color={colors.secondaryDark}
						pressColor={colors.secondary}
						altText="Button to concat arr values"
						text="Add ['d', 'e', 'f']"
						override={{ borderRadius: 0 }}
					/>
					<Body override={{ marginTop: 20 }}>Value: {testArrayOW.join("-")}</Body>
					<ButtonSetValue
						overwrite={true}
						size="large"
						setState={setTestArrayOW}
						value={["d", "e", "f"]}
						color={colors.secondaryDark}
						pressColor={colors.secondary}
						altText="Button to overwrite arr values"
						text="Set to ['d', 'e', 'f']"
						override={{ borderRadius: 0 }}
					/>
					<Subtitle override={{ marginTop: 40, fontSize: 26 }}>Existing Native Components</Subtitle>
					<Body>(for easy access)</Body>
					<Body align="center" override={{ marginTop: 30 }}>( Activity/Loading Indicator )</Body>
					<ActivityIndicator style={{ margin: 20, marginTop: 30 }} animating={loading} color={colors.white} size="large" />
					<ButtonToggle
						size="small"
						text="Start/Stop Loading"
						color={colors.secondary}
						state={loading}
						setState={setLoading}
					/>
					<Body align="center" override={{ marginTop: 30 }}>( Lower Modal Example )</Body>
					<ButtonToggle
						size="small"
						altText="Press to show pop-up menu"
						setState={setShowModal}
						state={showModal}
						text="Show Modal"
						color={colors.secondary}
						pressColor={colors.secondaryDark}
					/>
					<Body align="center" override={{ marginTop: 30 }}>( Image )</Body>
					<Image source={require("./assets/hand.png")} style={{ height: 1026 / 8, width: 1261 / 8, marginTop: 20 }} />

					{/* ...BEGIN MODAL... */}

					<Modal
						animationType="slide"
						transparent={true}
						visible={showModal}
					>
						<View style={{ justifyContent: "center", alignItems: "center", position: "absolute", bottom: 24, width: "100%" }} >
							<View style={{ width: "88%", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 32, backgroundColor: colors.secondaryDark }}>
								<Flex justify="space-between" align="center">
									<Subtitle override={{ fontWeight: "bold", marginTop: 16 }}>Modal</Subtitle>
									<View>
										<Subtitle align="center" override={{ marginBottom: 7, fontSize: 24 }}>Welcome to the modal</Subtitle>
										<Body align="center" override={{ marginBottom: 32, fontSize: 16 }}>Here is a bunch of modal text that would be displayed, happily, forthwith, and in semi-perpetuity.</Body>
									</View>
									<ButtonToggle
										size="small"
										altText="Press to hide pop-up modal"
										setState={setShowModal}
										state={showModal}
										text="Close"
										color={colors.white}
									/>
								</Flex>
							</View>
						</View>
					</Modal>

					{/* ...END MODAL... */}

				</Flex>
			</ScrollView>
		</SafeAreaView>
	);
}