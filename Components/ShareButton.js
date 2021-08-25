import React from 'react';
import { Share, Pressable } from 'react-native';
import { iconSVGs } from '../CoreElements/theme';

export default function ShareButton({ styles }) {
	const APPSTORE_URL = "https://apps.apple.com/us/app/euchre-nights/id1582666948"

	const handleShare = async () => {
		try {
			const result = await Share.share({
				message: 'Check out "Euchre" - a new iOS app based on the classic cardgame!\n\n',
				url: APPSTORE_URL
			});
		} catch (error) {
			alert("There was an error sharing");
		}
	};
	return (
		<Pressable
			accessibilityLabel={"Open Share Menu to share this App"}
			onPress={handleShare}
			style={styles.icon}
		>
			{iconSVGs.share}
		</Pressable>
	);
}


