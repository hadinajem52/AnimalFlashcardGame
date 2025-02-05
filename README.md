##Animal Flashcard Game:
is an engaging, interactive flashcard app designed to help users learn about various animals while having fun! With a gamified experience, colorful visuals, and sound effects, this app challenges you to identify animals and earn points as you progress through different levels and tiers.

![front](https://github.com/user-attachments/assets/d1a61d83-9f5e-47e0-b76e-907c274c6af8)

![gamee](https://github.com/user-attachments/assets/092f350d-d128-4984-bc29-94fcde78aa67)

##Key Features
Interactive Flashcards:



View detailed flashcards showcasing animal images, fun facts, and difficulty levels.
Swipe through cards and test your knowledge by selecting the correct animal name from multiple choices.

##Gamification & Tier System:

![tierss](https://github.com/user-attachments/assets/82f57513-d2be-442c-ab96-676e1e29312a)

Earn points for every correct answer and lose points for incorrect ones.
Advance through levels based on your score—from Beginner Explorer to Nature Legend—each tier offering its own unique title and emoji.
A visual display of your current level keeps you motivated as you progress.
Continent Selection:

Choose from different continents (or a global category) to focus on specific animal groups.
Each continent has its own icon and themed flashcards.
Fun Facts & Sound Effects:

##Reveal fun facts:

about each animal to learn interesting tidbits and trivia.
Enjoy audio feedback with sounds for correct and incorrect answers to enhance the learning experience.

![funf](https://github.com/user-attachments/assets/11b62e10-49ba-4417-9330-d9add6010b4c)


##Dynamic Animations & Backgrounds:

Smooth background animations create an immersive environment.
Animated transitions and card shakes add a dynamic, playful feel to the gameplay.
Persistent User Data:

User scores and progress are saved locally using AsyncStorage, so you can pick up right where you left off.
Custom fonts and themed graphics provide a unique and consistent style throughout the app.
Technologies Used
React Native & Expo: Build a cross-platform mobile app that works on both Android and iOS.
React Hooks: Manage state and side effects with useState, useEffect, and useMemo for optimized performance.
Animated API: Create smooth, interactive animations and transitions.
AsyncStorage: Persist user data such as scores and settings between sessions.
Audio Module (expo-av): Play sound effects for correct and incorrect answers.
Custom Fonts & Icons: Enhance the user interface with personalized fonts (e.g., BubblegumSans) and icons from libraries like FontAwesome and MaterialIcons.
How It Works
Getting Started:

When the app launches, you are greeted with a home screen where you can view your current level and choose a continent to start the game.
Optionally, you can view the tier levels to see what you need to achieve to reach the next tier.
Gameplay:

Upon selecting a continent, the game begins by displaying a series of randomized flashcards.
Each flashcard shows an animal image along with its difficulty rating (Easy, Medium, or Hard).
You choose an answer from several options. If your answer is correct, you earn points (more points for harder flashcards). If it’s incorrect, points are deducted.
Enjoy visual feedback such as shaking animations for wrong answers and sound effects that confirm whether your answer was right or wrong.
Progression:

Your score is continually updated and saved. As you accumulate points, your rank and tier change, unlocking new titles and challenges.
Fun facts can be revealed on demand to deepen your knowledge about the animal on the current flashcard.
Additional Options:

A refresh button lets you load a new image for the current flashcard if you want to take another look.
The user interface includes a menu for accessing different sections of the app, such as returning to the home screen or reviewing the tier levels.
