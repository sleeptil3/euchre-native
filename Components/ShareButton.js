import React from 'react';
import { Share, Pressable } from 'react-native';
import { iconSVGs } from '../CoreElements/theme';

export default function ShareButton({ styles }) {
	const handleShare = async () => {
		try {
			const result = await Share.share({
				message: 'Check out "Euchre" - a new iOS app based on the classic cardgame!\n\n',
				url: "https://sleeptil3software.com/"
			});
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					console.log(result.activityType)
				} else {
					console.log("no result.activityType")
				}
			} else if (result.action === Share.dismissedAction) {
				console.log("dismissed")
			}
		} catch (error) {
			alert(error.message);
		}
	};
	return (
		<Pressable
			accessibilityLabel={"Change settings"}
			onPress={handleShare}
			style={styles.icon}
		>
			{iconSVGs.share}
		</Pressable>
	);
}


