import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    overflow: 'hidden', // Prevent any extra images from showing

  },
  backgroundContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%', // Ensure the container takes the full screen height
    width: 400 * 4, // Double the width for two images
  },
  backgroundImage: {
    width: 400,
    height: '110%', // Match container height
    resizeMode: 'cover', // Ensures the image covers the area
  },
  refreshButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "rgba(255, 145, 0, 0.88)",
    padding: 5,
    borderRadius: 20,
  },
  logo: {
    width: 300, // Adjust width as needed
    height: 150, // Adjust height as needed
  },
  title: { 
    fontFamily: 'BubblegumSans',
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#FF69B4', // Playful hot pink
    textShadowColor: '#FFD1DC', // Fuzzy pink glow
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  wallpaperImage: {
    resizeMode: 'cover', // Ensures the wallpaper fills the screen
    opacity: 0.9,        // Adds slight transparency for a smoother look
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adds a semi-transparent dark overlay
  },
  difficultyText: {
    fontFamily: 'BubblegumSans',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

  difficultyCircle: {
  width: 20,
  height: 20,
  borderRadius: 10, // Make it a circle
  marginTop: 10,
  alignSelf: 'center',
},

  subtitle: {
    fontSize: 28,
    marginBottom: 20,
    color: '#FFB6C1', // Light pastel pink
    fontFamily: 'BubblegumSans',
    textShadowColor: '#FFD1DC',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  continentButton: {
    backgroundColor: '#ff8946', 
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 50, // Extra rounded for a "pill" shape
    marginBottom: 20,
    elevation: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scale: 1.1 }], // Slightly bouncy look
    shadowColor: '#FFC0CB', // Soft shadow in pastel pink
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
  },


  buttonText: {
    fontSize: 36,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: 'BubblegumSans', // Apply font
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4, // Add some playful text shadow
  },

 

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 55,
    paddingHorizontal: 0, // Increased padding 
  },
  menuButton: {
    padding: 15,
    backgroundColor: '#ff8946',
    borderRadius: 20,
    shadowColor: '#FF69B4',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    marginHorizontal: 0.1, // Add margin here
  },
  scoreBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff8946', // Soft sky blue
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    shadowColor: '#5F9EA0',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    paddingLeft: 10, // Add margin here
    paddingRight: 10, // Add margin here

  },
  scoreText: {
    fontSize: 24,
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
    fontFamily: 'BubblegumSans', // Apply font
  },
  flashcard: {
    backgroundColor: '#FFFAF0', // Soft ivory
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 10,
    shadowColor: '#F4A460',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },

  },
  cardImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#FF69B4', // Hot pink border
  },
  answerButtons: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },


  answerButton: {
    backgroundColor: '#ff8946', // Vibrant red color
    paddingVertical: 18,
    paddingHorizontal: 50,
    marginBottom: 10,
    borderRadius: 30,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    transform: [{ scale: 1.1 }], // Slightly larger buttons for fun appearance
    position: 'relative', // To position the light glare on top
    overflow: 'hidden', // Ensures no part of the light glare goes outside the button
  },

  selectedButton: {
    backgroundColor: '#2378ff', // Brighter red for selection
    borderRadius: 30, // Rounder corners
    paddingVertical: 18,
    paddingHorizontal: 50,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    transform: [{ scale: 1.1 }],
    position: 'relative', // To position the light glare on top
    overflow: 'hidden', // Ensures no part of the light glare goes outside the button
  },
  correctButton: {
    backgroundColor: 'green',
    borderRadius: 25,
    elevation: 7,
  },
  wrongButton: {
    backgroundColor: 'red',
    borderRadius: 25,
    elevation: 7,
  },
  answerText: {
    fontSize: 20,
    color: '#363636',
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: 'BubblegumSans', // Apply font
  },
  nextButton: {
    backgroundColor: '#FF6347', // Vibrant red color
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 30,
    elevation: 10,
    transform: [{ scale: 1.1 }],
    position: 'relative', // To position the light glare on top
    overflow: 'hidden', // Ensures no part of the light glare goes outside the button
  },

  nextButtonText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'BubblegumSans', // Apply font
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4, // Add some playful text shadow
  },

  continentIcon: {
    width: 30,
    height: 30,
  },
  funFactButton: {
    backgroundColor: '#ffcc00',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    left: '42%',
    transform: [{ translateX: -50 }],
  },

  funFactButtonText: {
    fontSize: 17,
    color: '#fff',
    marginLeft: 5,
    fontWeight: '600',
    fontFamily: 'BubblegumSans', // Apply font
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },

  funFactText: {
    fontFamily: 'BubblegumSans', 
    fontSize: 18,
    color: '#333',
    marginTop: 20,
    marginBottom: 25,
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffcc00', // Light background to highlight the fact
    borderRadius: 10, // Rounded corners for smoothness
    shadowColor: '#000', // Subtle shadow effect
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Adds a little depth
  },

  funFactPopup: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    right: '10%',
    backgroundColor: '#ffcc00',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
  },
  
  closeButton: {
    backgroundColor: '#ff5722',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  
  closeButtonText: {
    fontFamily: 'BubblegumSans', 
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },

  background: {
    position: 'absolute',
    width: 1200,
    height: 1200,
    top: 0,
    opacity: 0.2,
    transform: [
      {
        translateX: 0,
      },
      {
        translateY: 0,
      },
    ],      
  }, 
  settingsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF8946',
    borderRadius: 20,
    padding: 10,
    elevation: 5,
  },
  

  settingsMenu: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  
  settingsOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  
  settingsText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'BubblegumSans',
  },
  buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  width: '100%',
  marginBottom: 20,
},

muteButton: {
  backgroundColor: '#ff8946',
  paddingVertical: 15,
  paddingHorizontal: 25,
  borderRadius: 30,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},

resetButton: {
  backgroundColor: '#ff8946',
  paddingVertical: 15,
  paddingHorizontal: 25,
  borderRadius: 30,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},

buttonText: {
  fontSize: 18,
  color: '#fff',
  marginLeft: 10,
  fontFamily: 'BubblegumSans',
},

tierContainer: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
  backgroundColor: '#FFF8E1', // Soft ivory to match the theme
},
tierHeader: {
  fontSize: 36,
  fontWeight: 'bold',
  fontFamily: 'BubblegumSans',
  color: '#FF69B4', // Hot pink
  textShadowColor: '#FFD1DC',
  textShadowOffset: { width: 0, height: 2 },
  textShadowRadius: 6,
  marginBottom: 20,
},
tierDescription: {
  fontSize: 20,
  fontFamily: 'BubblegumSans',
  color: '#FF8946', // Vibrant orange
  textAlign: 'center',
  marginVertical: 10,
  paddingHorizontal: 20,
},
tierIcon: {
  width: 80,
  height: 80,
  marginBottom: 20,
},
tierList: {
  width: '100%',
  paddingVertical: 10,
  paddingHorizontal: 20,
},
tierItem: {
  backgroundColor: '#FFFAF0', // Soft ivory
  padding: 15,
  borderRadius: 15,
  marginVertical: 10,
  flexDirection: 'row',
  alignItems: 'center',
  elevation: 5,
  shadowColor: '#FFD1DC',
  shadowOpacity: 0.3,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 4 },
},
tierItemText: {
  fontSize: 18,
  fontFamily: 'BubblegumSans',
  color: '#FF69B4',
  flex: 1,
  marginLeft: 15,
},
currentTierBadge: {
  backgroundColor: '#FF69B4', // Hot pink
  paddingVertical: 8,
  paddingHorizontal: 15,
  borderRadius: 20,
  shadowColor: '#FFC0CB',
  shadowOpacity: 0.5,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 5 },
},
currentTierBadgeText: {
  fontSize: 14,
  fontFamily: 'BubblegumSans',
  color: '#FFF',
  fontWeight: 'bold',
},
tieringButton: {
  backgroundColor: '#FF8946', // Vibrant orange
  paddingVertical: 15,
  paddingHorizontal: 50,
  borderRadius: 50,
  marginTop: 30,
  elevation: 8,
  shadowColor: '#FFC0CB', // Soft shadow in pastel pink
  shadowOpacity: 0.4,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 5 },
},
tieringButtonText: {
  fontSize: 24,
  color: '#FFF',
  fontFamily: 'BubblegumSans',
  fontWeight: 'bold',
  textAlign: 'center',
  textShadowColor: '#000',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 4,
},

backButton: {
  position: 'absolute',
  bottom: 10,
  backgroundColor: '#FF8946', // Vibrant orange
  padding: 10,
  borderRadius: 20,
  shadowColor: '#FFC0CB', // Soft pink shadow
  shadowOpacity: 0.5,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 4 },
  elevation: 5,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},
backButtonText: {
  fontSize: 18,
  color: '#fff',
  fontFamily: 'BubblegumSans',
  fontWeight: 'bold',
  marginLeft: 5, // Space between icon and text
  textShadowColor: '#000',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 4,
},

tierButton: {
  backgroundColor: '#FF8946', 
  paddingVertical: 15,
  paddingHorizontal: 30,
  borderRadius: 30,
  marginVertical: 10,
  elevation: 8,
  shadowColor: '#FFC0CB', // Soft pink shadow
  shadowOpacity: 0.4,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 5 },
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},
tierButtonText: {
  fontSize: 20,
  color: '#fff',
  fontFamily: 'BubblegumSans',
  fontWeight: 'bold',
  textAlign: 'center',
  textShadowColor: '#000',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 4,
},

});

export default styles;
