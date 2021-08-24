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
							<View style={{ marginVertical: 10, alignItems: "center" }}>{iconSVGs.info}</View>
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
		backgroundColor: "rgba(0,0,0,.7)",
	},
})