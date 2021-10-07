# Euchre Night

## A new iOS game by Shawn Clary

<p align="center">
  <img width="400" src="https://user-images.githubusercontent.com/26289436/131942355-d070153e-6b0c-4447-aefb-9e77fea4a9e1.png">
</p>

<p align="center">
  <a href="https://apps.apple.com/us/app/euchre-night/id1582666948" target="_blank" rel="noreferrer">
    <img width="200" src="https://user-images.githubusercontent.com/26289436/131943331-3403418e-7029-46dd-b637-64d5e9190bcf.png">
  </a>
</p>

# About Euchre Night

Euchre Night was my first foray into developing for iOS using React-Native and a managed workflow on Expo. The most challenging aspect of this project was building the AI for the computer players as well as the UI/UX design and making sure it accomodates the various the iPhone screen sizes, including the notch.

I was very impressed with the React-Native and Expo documentation. Expo's Managed Workflow does limit you a bit on the external libraries you can use, but I found the ones they included met all my needs for this project.

From start to finish, this project took about 17 days, (not counting the copious updates and bug fixes). Most of the game logic was completed on a web-version that was created the preceding week for a hackathon where the prompt was to create a card game, however the majority of the project had to be re-tooled for the Native version, particularly in styling.

### **Dependencies & Third-Party Libraries Used**

- react
- react-dom
- react-native
- react-native-flip-card
- react-native-svg
- react-native-web
- react-native-async-storage
- expo
- expo-av
- expo-cli
- expo-device
- expo-font
- expo-linking
- expo-status-bar
- expo-store-review

# Release History

## **Current Release**

### **Version 1.0.8**

- #### Build 1

  - _Released 10/7/2021_
  - Resolved crash when user or computer goes alone
  - Resolved notch detection issue to correctly place dealer logo on teammate
  - updated app icon

## **Previous Releases**

### **Version 1.0.7**

- #### Build 1

  - _Released 10/3/2021_
  - Resolved crash when opening settings
  - Investigated reports of intermittent crashing. I made several changes to attempt to resolve this and I did not see any crashing in my tests

### **Version 1.0.6**

- #### Build 3

  - _Released 9/29/2021_
  - Fixed an issue where team score and opponent score started the game at 9 (from debug mode)
  - bundled images into the build to help with first load
    - subsequent themes added will be downloaded on-demand

- #### Build 1

  - _Released 9/27/2021_
  - Fixed an issue where left bower was not considered part of the trump suit
  - Fixed an issue where after a GameOver event, the next game would not setup properly
  - Added GameOver sound effects
  - General performance fixes

### **Version 1.0.5**

- #### Build 1

  - fixed an issue causing theme chooser to crash
  - fixed versioning/build numbers being out of sync

### **Version 1.0.2**

- #### Build 1.0.4

  - Fixed a bug where a card disappeared from your hand stopping play
  - Fixed a bug which caused the upTrump card to not reappear subsequent to the first match
  - Optimized the method the trumpStack and the upTrump card where loaded and animated to avoid timing bugs
  - Fixed a visual issue with the splash screen
  - Kicked butt, took names, had a good time

### **Version 1.0.2**

- #### Build 1.0.3

  - Bug fixes

### **Version 1.0**

- #### Build 1.0.1

  - AppStore Submission

### **Version 0.9.0**

- #### Build 0.9.0
  - launch of beta testing through TestFlight
- #### Build 0.9.1
  - Bug Fixes
- #### Build 0.9.2
  - Bug Fixes
- #### Build 0.9.3
  - Bug Fixes
- #### Build 0.9.4
  - Bug Fixes
- #### Build 0.9.5
  - Bug Fixes
- #### Build 0.9.6rc
  - Release Candidate

# Future Versions

### **Version 2.0**

Add an online multiplayer experience

# Privacy Policy

(_updated 09/02/21_)

[Click here](https://sleeptil3.github.io/euchre-native/) to view the Privacy Policy

# Licensing

(_updated 09/02/21_)

While this project is posted publically for educational and demonstrative purposes, the code herein is **©2021 Shawn Clary (All Rights Reserved)** and no portion of this code, in-part or in-whole, may be used for commercial purposes without express written permission by the developer.

# Contact & Support

- If you find a bug or have a feature request, please submit an Issue to this repository using the templates provided and provide as much detail as possible
- To get in contact with me directly, use the [contact form](https://www.sleeptil3software.com/#/contact) on my website
