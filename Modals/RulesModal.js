import React, { useContext } from 'react'
import { View, Modal, StyleSheet, Pressable, Image, ScrollView } from 'react-native'
import { DataContext } from '../GameContext'
import { Flex } from '../CoreElements/containerStyles'
import { Title, List, Italic, Body, DefaultText, Heading } from '../CoreElements/fontStyles'
import { colors, iconSVGs, styles } from '../CoreElements/theme'
import Svg, { Path } from 'react-native-svg'
import { ButtonURLLink } from '../CoreElements/buttonStyles'

export default function RulesModal() {
	const { setShowRulesModal, showRulesModal, setShowStartModal } = useContext(DataContext)

	const handleClose = () => {
		setShowRulesModal(false)
		setShowStartModal(true)
	}

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={showRulesModal}
		>
			<View style={styles.settingsScreen}>
				<View style={styles.settings}>
					<ScrollView style={localStyles.modal}>
						<View style={{ margin: 20 }}>
							<View style={{ marginVertical: 10, alignItems: "center" }} >
								<Svg width="69" height="69" viewBox="0 0 69 69" fill="none" xmlns="http://www.w3.org/2000/svg">
									<Path d="M34.5 69C53.3735 69 69 53.3397 69 34.5C69 15.6265 53.3397 0 34.4662 0C15.6265 0 0 15.6265 0 34.5C0 53.3397 15.6603 69 34.5 69ZM34.5 63.25C18.5353 63.25 5.78382 50.4647 5.78382 34.5C5.78382 18.5353 18.5015 5.75 34.4662 5.75C50.4309 5.75 63.2162 18.5353 63.25 34.5C63.2838 50.4647 50.4647 63.25 34.5 63.25ZM34.1956 22.4588C36.6647 22.4588 38.5926 20.4971 38.5926 18.0279C38.5926 15.5588 36.6647 13.5971 34.1956 13.5971C31.7603 13.5971 29.7985 15.5588 29.7985 18.0279C29.7985 20.4971 31.7603 22.4588 34.1956 22.4588ZM28.5809 53.1029H42.3471C43.7338 53.1029 44.8162 52.0882 44.8162 50.7015C44.8162 49.3824 43.7338 48.3338 42.3471 48.3338H38.1529V31.1176C38.1529 29.2912 37.2397 28.0735 35.5147 28.0735H29.1559C27.7691 28.0735 26.6868 29.1221 26.6868 30.4412C26.6868 31.8279 27.7691 32.8426 29.1559 32.8426H32.775V48.3338H28.5809C27.1941 48.3338 26.1118 49.3824 26.1118 50.7015C26.1118 52.0882 27.1941 53.1029 28.5809 53.1029Z" fill={colors.white} />
								</Svg>
							</View>
							<View style={{ marginBottom: 20 }} >
								<Heading align="center">How to Play</Heading>
								<Italic override={{ marginBottom: 20 }} align="center">(from <ButtonURLLink url="https://bicyclecards.com/how-to-play/euchre/">bicyclecards.com</ButtonURLLink>)</Italic>
							</View>
							<View style={{ marginHorizontal: 10, borderWidth: 1, borderRadius: 10, borderColor: colors.white, padding: 12, paddingBottom: 0 }}>
								<Body>A Note From The Developer:</Body>
								<Body>These rules are slightly different from the "official" rules on bicycle.com and are aligned with the way I always played growing up in Ohio. I shall dub these the "Midwest Rules."</Body>
								<Body>It was quite common for different people to have different "house rules," so I guess in this case, you're in my house.</Body>
							</View>
							<View style={{ marginVertical: 20 }}>
								<Body>Euchre (and its variations) is the reason why modern card decks were first packaged with jokers, a card originally designed to act as the right and left "bowers" (high trumps). Although later eclipsed by Bridge (as with so many other games of this type), Euchre is still well known in America and is an excellent social game.</Body>
								<Body>The game is best for four participants, playing two against two as partners.</Body>
								<Title override={{ fontSize: 24 }}>The Pack</Title>
								<Body>This is the standard 24-card version of Euchre, the most standard: (A, K, Q, J, 10, 9 of each suit)</Body>
								<Title override={{ fontSize: 24 }}>Object of the Game</Title>
								<Body>The goal is to win at least three tricks. If the side that fixed the trump fails to get three tricks, it is said to be "euchred." Winning all five tricks is called a "march."</Body>
								<Title override={{ fontSize: 24 }}>Rank of Cards</Title>
								<Body>The highest trump is the jack of the trump suit, called the "right bower." The second-highest trump is the jack of the other suit of the same color called the "left bower." (Example: If diamonds are trumps, the right bower is J♦ and left bower is J♥.) The remaining trumps, and also the plain suits, rank as follows: A (high), K, Q, J, 10, 9.</Body>
								<Title override={{ fontSize: 24 }}>Card Values/Scoring</Title>
								<Body>The following shows all scoring situations:</Body>
								<List>Partnership making trump wins 3 or 4 tricks – 1 point</List>
								<List>Partnership making trump wins 5 tricks – 2 points</List>
								<List>Lone hand wins 3 or 4 tricks – 1 point</List>
								<List>Lone hand wins 5 tricks – 4 points</List>
								<Body>• Partnership or lone hand is euchred, opponents score 2 points</Body>
								<Body>The first player or partnership to score 10 points, wins the game.</Body>
								<Title override={{ fontSize: 24 }}>The Deal</Title>
								<Body>You are always the dealer on the first match of the game. The cards are dealt clockwise (automatically), to the left, beginning with the player to the left of the dealer. Each player receives five cards. After the first deal, the deal passes to the player on the dealer's left.</Body>
								<Body>On completing the deal, the dealer places the rest of the pack in the center of the table and turns the top card face up. Should the card turned up be accepted as trump by any player, the dealer adds it to their hand and chooses a card to discard.</Body>
								<Title override={{ fontSize: 24 }}>Declaring Trump for the Match</Title>
								<Body>Beginning with the player to the left of the dealer, each player passes or accepts the turn-up as trump. The team that declares trump is the "calling team" for the match. The dealer then makes their discard.</Body>
								<Body>If all four players pass in the first round, each player in turn, starting with the player to the dealer's left, has the option of passing again or of naming the trump suit. The rejected suit may not be named.</Body>
								<Body>If all four players pass in the second round, the selection of Trump is "Stuck to the Dealer", which means the dealer must select Trump, which forces their team to be the calling team for the match.</Body>
								<Title override={{ fontSize: 24 }}>Going "Alone"</Title>
								<Body>If the player who fixes the trump suit believes that they can win without the help of their partner's cards, the player can "go alone." This must be called when declaring Trump, which is done by pressing and holding your selection. This player's partner then turns their cards face down and does not participate in the current play. Taking all 5 tricks while going alone will award you double points.</Body>
								<Title override={{ fontSize: 24 }}>The Play</Title>
								<Body>The opening lead is made by the player to the dealer's left. If possible, each player must follow suit to a lead. If unable to follow suit, the player may trump or discard any card. A trick is won by the highest card of the suit led, or, if it contains trumps, by the highest trump. The winner of a trick leads next.</Body>
								<Title override={{ fontSize: 24 }}>Getting "Euchred"</Title>
								<Body>If you are the Calling Team, but are unable to win at least 3 tricks, you have been "Euchred" and 2 points are awarded to the opposing team.</Body>
							</View>
							<Pressable
								accessibilityLabel={"Press to begin the game"}
								onPress={handleClose}
							>
								<View
									style={{
										justifyContent: "space-around",
										alignItems: "center",
										flexDirection: "row",
										backgroundColor: "rgba(0, 0, 0, .75)",
										borderWidth: 1,
										borderColor: colors.white,
										borderRadius: 40,
										paddingHorizontal: 50,
										paddingVertical: 12,
										marginBottom: 20
									}}
								>
									<DefaultText align="center">Close</DefaultText>
								</View>
							</Pressable>
						</View>
					</ScrollView>
				</View>
			</View>
		</Modal>
	)
}

const localStyles = StyleSheet.create({
	modal: {
		width: "100%",
		borderRadius: 32,
		borderWidth: 2,
		borderColor: "rgba(255,255,255,.5)",
		backgroundColor: "rgba(0,0,0,.5)",
	},
})