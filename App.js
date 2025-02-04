import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated
} from 'react-native';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';

const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const tiers = [
  { min: 0, max: 20, name: 'Beginner Explorer', emoji: '🌱' },
  { min: 21, max: 50, name: 'Wildlife Wanderer', emoji: '🐾' },
  { min: 51, max: 90, name: 'Jungle Scout', emoji: '🌴' },
  { min: 91, max: 140, name: 'Safari Seeker', emoji: '🦒' },
  { min: 141, max: 200, name: 'Savanna Adventurer', emoji: '🐘' },
  { min: 201, max: 280, name: 'Oceanic Pathfinder', emoji: '🐠' },
  { min: 281, max: 370, name: 'Forest Guardian', emoji: '🦉' },
  { min: 371, max: 480, name: 'Mountain Voyager', emoji: '🏔️' },
  { min: 481, max: 600, name: 'Animal Whisperer', emoji: '🐾✨' },
  { min: 601, max: Infinity, name: 'Nature Legend', emoji: '🌍🌟' },
];


const IMAGE_WIDTH = 500;
const ANIMATION_DURATION = 170000;

const animalsByContinent = { 
  Global:[
    { name: 'Lion', image: require('./assets/images/lion.jpg'), funFact: 'This animal is the only cat that lives in groups.', difficulty: 'Easy' },
      { name: 'Elephant', image: require('./assets/images/elephant.jpg'), funFact: 'This animal is the largest land animal on Earth.', difficulty: 'Easy' },
      { name: 'Giraffe', image: require('./assets/images/giraffe.jpg'), funFact: 'This animal has a long neck to reach high trees for food.', difficulty: 'Easy' },
      { name: 'Zebra', image: require('./assets/images/zebra.jpg'), funFact: 'This animal’s stripes are unique to each individual.', difficulty: 'Easy' },
      { name: 'Cheetah', image: require('./assets/images/cheetah.jpg'), funFact: 'This animal is the fastest land animal, capable of speeds up to 60 mph.', difficulty: 'Medium' },
      { name: 'Hippo', image: require('./assets/images/hippo.jpg'), funFact: 'This animal spends most of its time submerged in water.', difficulty: 'Medium' },
      { name: 'Gorilla', image: require('./assets/images/gorilla.jpg'), funFact: 'This animal shares 98% of its DNA with humans.', difficulty: 'Medium' },
      { name: 'Brown Bear', image: require('./assets/images/brown_bear.jpg'), funFact: 'This animal is found in forests and tundras across Europe.', difficulty: 'Easy' },
      { name: 'European Wolf', image: require('./assets/images/european_wolf.jpg'), funFact: 'This animal is native to the forests of Europe.', difficulty: 'Medium' },
      { name: 'Red Fox', image: require('./assets/images/red_fox.jpg'), funFact: 'This animal is found throughout Europe, known for its bushy tail.', difficulty: 'Easy' },
      { name: 'Wild Boar', image: require('./assets/images/wild_boar.jpg'), funFact: 'This animal is found in forests and grasslands across Europe.', difficulty: 'Medium' },
      { name: 'European Bison', image: require('./assets/images/european_bison.jpg'), funFact: 'This animal is one of the heaviest land animals in Europe.', difficulty: 'Hard' },
      { name: 'Mouflon', image: require('./assets/images/mouflon.jpg'), funFact: 'This animal is a wild sheep found in Europe, especially in mountainous regions.', difficulty: 'Hard' },
      { name: 'European Hedgehog', image: require('./assets/images/european_hedgehog.jpg'), funFact: 'This small animal is known for its spiny coat and nocturnal behavior.', difficulty: 'Easy' },
      { name: 'Eurasian Lynx', image: require('./assets/images/eurasian_lynx.jpg'), funFact: 'This animal is a solitary big cat found in European forests.', difficulty: 'Hard' },
      { name: 'Beaver', image: require('./assets/images/beaver.jpg'), funFact: 'This animal is known for building dams and lodges in rivers.', difficulty: 'Medium' },
      { name: 'Golden Eagle', image: require('./assets/images/golden_eagle.jpg'), funFact: 'This animal is a large bird of prey found in the mountains and forests of Europe.', difficulty: 'Hard' },
      { name: 'European Starling', image: require('./assets/images/european_starling.jpg'), funFact: 'This bird species is known for its massive flocks and ability to mimic human speech.', difficulty: 'Medium' },
      { name: 'Alpine Ibex', image: require('./assets/images/alpine_ibex.jpg'), funFact: 'A wild goat with magnificent curved horns, found in the European Alps.', difficulty: 'Hard' },
      { name: 'Otterhound', image: require('./assets/images/otterhound.jpg'), funFact: 'A large dog breed from England, known for its otter hunting abilities.', difficulty: 'Hard' },
      { name: 'Marmot', image: require('./assets/images/marmot.jpg'), funFact: 'This ground-dwelling rodent is found in European mountain ranges.', difficulty: 'Medium' },
      { name: 'Wildcat', image: require('./assets/images/wildcat.jpg'), funFact: 'This animal is the ancestor of the domestic cat and lives in forests.', difficulty: 'Hard' },
      { name: 'European Green Lizard', image: require('./assets/images/european_green_lizard.jpg'), funFact: 'This brightly colored lizard is found in the Mediterranean region.', difficulty: 'Medium' },
      { name: 'European Turtle Dove', image: require('./assets/images/european_turtle_dove.jpg'), funFact: 'A migratory bird that symbolizes peace.', difficulty: 'Medium' },
      { name: 'Cappuccino Monkey', image: require('./assets/images/cappuccino_monkey.jpg'), funFact: 'This primate is known for its sociable behavior and vocalizations.', difficulty: 'Hard' },
      { name: 'European Brown Hare', image: require('./assets/images/european_brown_hare.jpg'), funFact: 'This hare is faster than most rabbits and can leap over obstacles.', difficulty: 'Easy' },
      { name: 'Jaguar', image: require('./assets/images/jaguar.jpg'), funFact: 'This animal is the largest cat in the Americas.', difficulty: 'Hard' },
      { name: 'Sloth', image: require('./assets/images/sloth.jpg'), funFact: 'This animal is known for its slow movement and long sleep periods.', difficulty: 'Easy' },
      { name: 'Llama', image: require('./assets/images/llama.jpg'), funFact: 'This animal is a domesticated species native to the Andes mountains.', difficulty: 'Medium' },
      { name: 'Capybara', image: require('./assets/images/capybara.jpg'), funFact: 'This animal is the largest rodent in the world.', difficulty: 'Medium' },
      { name: 'Anaconda', image: require('./assets/images/anaconda.jpg'), funFact: 'This animal is the heaviest snake in the world.', difficulty: 'Hard' },
      { name: 'Piranha', image: require('./assets/images/piranha.jpg'), funFact: 'This animal is known for its sharp teeth and carnivorous diet.', difficulty: 'Hard' },
      { name: 'Macaw', image: require('./assets/images/macaw.jpg'), funFact: 'This animal is a brightly colored bird known for its intelligence and social behavior.', difficulty: 'Medium' },
      { name: 'Monkey', image: require('./assets/images/monkey.jpg'), funFact: 'This animal is known for its social behavior and intelligence.', difficulty: 'Medium' },
      { name: 'Toco Toucan', image: require('./assets/images/toco_toucan.jpg'), funFact: 'This animal is recognized by its large, colorful beak.', difficulty: 'Medium' },
      { name: 'Poison Dart Frog', image: require('./assets/images/poison_dart_frog.jpg'), funFact: 'This frog is known for its brightly colored skin and toxic secretion.', difficulty: 'Hard' },
      { name: 'Giant River Otter', image: require('./assets/images/giant_river_otter.jpg'), funFact: 'This otter species is found in the Amazon River and is known for its social behavior.', difficulty: 'Medium' },
      { name: 'Condor', image: require('./assets/images/andean_condor.jpg'), funFact: 'This large bird of prey is native to the Andes mountains and has one of the largest wingspans of any bird.', difficulty: 'Hard' },
      { name: 'Tamarin Monkey', image: require('./assets/images/tamarin_monkey.jpg'), funFact: 'This small monkey species is known for its distinctive facial hair.', difficulty: 'Easy' },
      { name: 'Guanaco', image: require('./assets/images/guanaco.jpg'), funFact: 'This animal is closely related to the llama and is found in the Andes.', difficulty: 'Medium' },
      { name: 'Caiman', image: require('./assets/images/caiman.jpg'), funFact: 'This crocodilian species is found in South America and is often mistaken for an alligator.', difficulty: 'Hard' },
      { name: 'Tapir', image: require('./assets/images/south_american_tapir.jpg'), funFact: 'This herbivorous mammal is known for its prehensile snout and stocky body.', difficulty: 'Medium' },
      { name: 'Harpy Eagle', image: require('./assets/images/harpy_eagle.jpg'), funFact: 'This powerful bird of prey is found in the tropical rainforests of South America.', difficulty: 'Hard' },
      { name: 'Pygmy Marmoset', image: require('./assets/images/pygmy_marmoset.jpg'), funFact: 'This tiny monkey is the smallest primate in the world.', difficulty: 'Easy' },
      { name: 'Vampire Bat', image: require('./assets/images/vampire_bat.jpg'), funFact: 'This bat feeds on the blood of other animals, particularly livestock.', difficulty: 'Hard' },
      { name: 'Giant Anteater', image: require('./assets/images/giant_anteater.jpg'), funFact: 'This animal is known for its long snout and diet of ants and termites.', difficulty: 'Medium' },
      { name: 'Stork', image: require('./assets/images/jabiru_stork.jpg'), funFact: 'This large stork species is found in wetlands across South America.', difficulty: 'Medium' },
      { name: 'Hippo', image: require('./assets/images/pygmy_hippo.jpg'), funFact: 'This smaller cousin of the common hippopotamus is found in the forests of West Africa.', difficulty: 'Hard' },
      { name: 'Sea Lion', image: require('./assets/images/south_american_sea_lion.jpg'), funFact: 'This sea lion is native to the coasts of South America and is known for its loud bark.', difficulty: 'Medium' },
      { name: 'Rhea', image: require('./assets/images/rhea.jpg'), funFact: 'This large, flightless bird is native to South America and is similar to an ostrich.', difficulty: 'Medium' },
      { name: 'Agouti', image: require('./assets/images/agouti.jpg'), funFact: 'This rodent is known for its ability to store food in burrows and forests.', difficulty: 'Easy' },
      { name: 'Vicuna', image: require('./assets/images/vicuna.jpg'), funFact: 'This wild relative of the llama is found in the Andes and produces a highly prized wool.', difficulty: 'Medium' },
      { name: 'Ocelot', image: require('./assets/images/ocelot.jpg'), funFact: 'This small wild cat is found in the rainforests of South America and is known for its beautiful coat.', difficulty: 'Hard' },
      { name: 'Turtle', image: require('./assets/images/turtle.jpg'), funFact: 'This reptile is known for its Hard shell and slow movement.', difficulty: 'Easy' },
      { name: 'Iguana', image: require('./assets/images/iguana.jpg'), funFact: 'This herbivorous lizard is found in the rainforests and coastal regions of South America.', difficulty: 'Medium' },
      { name: 'Jaguarundi', image: require('./assets/images/jaguarundi.jpg'), funFact: 'This small wild cat is found in the grasslands and forests of South America.', difficulty: 'Medium' },
      { name: 'Mandrill', image: require('./assets/images/mandrill.jpg'), funFact: 'This colorful primate is found in the rainforests of Central Africa, though it also roams parts of South America.', difficulty: 'Hard' },
      { name: 'Electric Eel', image: require('./assets/images/electric_eel.jpg'), funFact: 'This eel is capable of generating electric shocks to stun its prey.', difficulty: 'Hard' },
      { name: 'Caracara', image: require('./assets/images/crested_caracara.jpg'), funFact: 'This bird of prey is often found scavenging in the open grasslands of South America.', difficulty: 'Medium' }, { name: 'Eurasian Eagle Owl', image: require('./assets/images/eurasian_eagle_owl.jpg'), funFact: 'A large owl species known for its powerful wingspan and intimidating presence.', difficulty: 'Hard' },
      { name: 'Bearded Vulture', image: require('./assets/images/bearded_vulture.jpg'), funFact: 'This large bird of prey is known for its diet of bone marrow.', difficulty: 'Hard' },
      { name: 'Swallow', image: require('./assets/images/swallow.jpg'), funFact: 'This bird migrates thousands of miles and is a symbol of the changing seasons.', difficulty: 'Easy' },
      { name: 'Booby', image: require('./assets/images/booby.jpg'), funFact: 'A seabird known for its colorful feet and acrobatic flying abilities.', difficulty: 'Medium' },
      { name: 'Tiger', image: require('./assets/images/tiger.jpg'), funFact: 'This animal is the largest species of cat.', difficulty: 'Hard' },
    { name: 'Panda', image: require('./assets/images/panda.jpg'), funFact: 'This animal spends most of its time eating bamboo.', difficulty: 'Easy' },
    { name: 'Red Panda', image: require('./assets/images/red_panda.jpg'), funFact: 'This animal is a tree-dwelling species native to the Himalayas.', difficulty: 'Medium' },
    { name: 'Elephant', image: require('./assets/images/elephant.jpg'), funFact: 'This animal is the largest land mammal.', difficulty: 'Medium' },
    { name: 'Snow Leopard', image: require('./assets/images/snow_leopard.jpg'), funFact: 'This animal is known for its powerful build and thick fur coat.', difficulty: 'Hard' },
    { name: 'Bengal Tiger', image: require('./assets/images/bengal_tiger.jpg'), funFact: 'This animal is native to the Indian subcontinent and is a symbol of strength.', difficulty: 'Hard' },
    { name: 'Yak', image: require('./assets/images/yak.jpg'), funFact: 'This animal is a Hardy bovine that lives in the Himalayan mountain range.', difficulty: 'Medium' },
    { name: 'Komodo Dragon', image: require('./assets/images/komodo_dragon.jpg'), funFact: 'This animal is the largest lizard in the world.', difficulty: 'Hard' },
    { name: 'Gibbon', image: require('./assets/images/gibbon.jpg'), funFact: 'This animal is known for its acrobatic movement in trees.', difficulty: 'Medium' },
    { name: 'Siberian Husky', image: require('./assets/images/siberian_husky.jpg'), funFact: 'This dog breed is known for its endurance and ability to withstand cold climates.', difficulty: 'Medium' },
    { name: 'Pangolin', image: require('./assets/images/pangolin.jpg'), funFact: 'This animal is covered in scales and feeds on ants and termites.', difficulty: 'Hard' },
    { name: 'Macaque', image: require('./assets/images/macaque.jpg'), funFact: 'A group of monkeys known for their intelligence and social behavior.', difficulty: 'Medium' },
    { name: 'Rhinoceros', image: require('./assets/images/rhinoceros.jpg'), funFact: 'This animal has thick skin and one or two horns on its snout.', difficulty: 'Medium' },
    { name: 'Asian Elephant', image: require('./assets/images/asian_elephant.jpg'), funFact: 'A smaller cousin of the African elephant, found throughout Asia.', difficulty: 'Medium' },
    { name: 'Sloth Bear', image: require('./assets/images/sloth_bear.jpg'), funFact: 'This bear feeds primarily on insects and has a specialized long tongue.', difficulty: 'Hard' },
    { name: 'Cobra', image: require('./assets/images/cobra.jpg'), funFact: 'This snake is known for its hood, which it expands when threatened.', difficulty: 'Medium' },
    { name: 'Muntjac', image: require('./assets/images/muntjac.jpg'), funFact: 'A small species of deer native to Southeast Asia.', difficulty: 'Easy' },
    { name: 'Indian Leopard', image: require('./assets/images/indian_leopard.jpg'), funFact: 'This big cat is known for its spotted coat and powerful build.', difficulty: 'Hard' },
    { name: 'Gaur', image: require('./assets/images/gaur.jpg'), funFact: 'This wild cattle species is found in the forests of South and Southeast Asia.', difficulty: 'Medium' },
    { name: 'Wild Boar', image: require('./assets/images/wild_boar.jpg'), funFact: 'This species of boar is found throughout Asia and is a common wild mammal.', difficulty: 'Medium' },
    { name: 'Clouded Leopard', image: require('./assets/images/clouded_leopard.jpg'), funFact: 'This cat species is known for its distinctive cloud-like spots on its coat.', difficulty: 'Hard' },
    { name: 'Binturong', image: require('./assets/images/binturong.jpg'), funFact: 'This animal is known for its prehensile tail and strong odor resembling popcorn.', difficulty: 'Hard' },
    { name: 'Kangaroo', image: require('./assets/images/kangaroo.jpg'), funFact: 'This animal is native to Australia but is found in parts of Southeast Asia.', difficulty: 'Easy' },
    { name: 'Dhole', image: require('./assets/images/dhole.jpg'), funFact: 'This wild dog is found in the forests of Central and South Asia.', difficulty: 'Medium' },
    { name: 'Asian Black Bear', image: require('./assets/images/asian_black_bear.jpg'), funFact: 'This bear is found in forests across Asia and is often seen climbing trees.', difficulty: 'Medium' },
    { name: 'Snow Leopard', image: require('./assets/images/snow_leopard.jpg'), funFact: 'A solitary cat known for its elusive nature and stunning coat.', difficulty: 'Hard' },
    { name: 'Komodo Dragon', image: require('./assets/images/komodo_dragon.jpg'), funFact: 'This giant lizard is the largest species of lizard and native to Indonesia.', difficulty: 'Hard' },
    { name: 'Tiger Shark', image: require('./assets/images/tiger_shark.jpg'), funFact: 'A large, aggressive shark found in tropical and subtropical waters of Asia.', difficulty: 'Medium' },
    { name: 'Indian Peafowl', image: require('./assets/images/indian_peafowl.jpg'), funFact: 'This bird is famous for its colorful tail feathers used in mating displays.', difficulty: 'Easy' },
    { name: 'Bengal Tiger', image: require('./assets/images/bengal_tiger.jpg'), funFact: 'This animal is native to the Indian subcontinent and is the most numerous tiger species.', difficulty: 'Hard' },
    { name: 'Alpine Ibex', image: require('./assets/images/alpine_ibex.jpg'), funFact: 'A wild goat with magnificent curved horns, found in the European Alps.', difficulty: 'Medium' },
    { name: 'Gharial', image: require('./assets/images/gharial.jpg'), funFact: 'A critically endangered crocodilian species with a long, narrow snout, native to India and Nepal.', difficulty: 'Hard' },
    { name: 'Spotted Deer', image: require('./assets/images/spotted_deer.jpg'), funFact: 'This species of deer is commonly found in Indian forests and grasslands.', difficulty: 'Easy' },
    { name: 'Blackbuck', image: require('./assets/images/blackbuck.jpg'), funFact: 'This antelope species is known for its spiral-shaped horns and is found in the Indian subcontinent.', difficulty: 'Medium' },
    { name: 'Bear', image: require('./assets/images/bear.jpg'), funFact: 'This animal is known for its hibernation and powerful strength.', difficulty: 'Medium' },
    { name: 'Bison', image: require('./assets/images/bison.jpg'), funFact: 'This animal is one of the largest land mammals in North America.', difficulty: 'Medium' },
    { name: 'Raccoon', image: require('./assets/images/raccoon.jpg'), funFact: 'This animal is known for its dexterous front paws and curious nature.', difficulty: 'Easy' },
    { name: 'Wolf', image: require('./assets/images/wolf.jpg'), funFact: 'This animal lives and hunts in packs to improve its hunting success.', difficulty: 'Medium' },
    { name: 'Coyote', image: require('./assets/images/coyote.jpg'), funFact: 'This animal is known for its adaptability and survival in diverse environments.', difficulty: 'Medium' },
    { name: 'Moose', image: require('./assets/images/moose.jpg'), funFact: 'This animal is the largest species in the deer family.', difficulty: 'Hard' },
    { name: 'Cougar', image: require('./assets/images/cougar.jpg'), funFact: 'This animal is the most widespread wild cat in the Americas.', difficulty: 'Medium' },
    { name: 'Alligator', image: require('./assets/images/alligator.jpg'), funFact: 'This animal has been around for millions of years and is known for its powerful jaws.', difficulty: 'Medium' },
    { name: 'Fox', image: require('./assets/images/fox.jpg'), funFact: 'This animal is known for its cleverness and agility.', difficulty: 'Medium' },
    { name: 'Otter', image: require('./assets/images/otter.jpg'), funFact: 'This animal is a playful aquatic mammal with a thick, water-repellent coat.', difficulty: 'Easy' },
    { name: 'Bald Eagle', image: require('./assets/images/bald_eagle.jpg'), funFact: 'This bird is the national symbol of the United States and is known for its powerful flight.', difficulty: 'Medium' },
    { name: 'Squirrel', image: require('./assets/images/squirrel.jpg'), funFact: 'This animal is known for storing food and its bushy tail.', difficulty: 'Easy' },
    { name: 'Porcupine', image: require('./assets/images/porcupine.jpg'), funFact: 'This animal is known for its sharp quills, which it uses for defense.', difficulty: 'Hard' },
    { name: 'Armadillo', image: require('./assets/images/armadillo.jpg'), funFact: 'This animal has a tough, leathery shell that protects it from predators.', difficulty: 'Medium' },
    { name: 'Opossum', image: require('./assets/images/opossum.jpg'), funFact: 'This marsupial is known for "playing dead" when threatened.', difficulty: 'Easy' },
    { name: 'Hawk', image: require('./assets/images/hawk.jpg'), funFact: 'This bird is a skilled hunter with sharp talons and excellent vision.', difficulty: 'Medium' },
    { name: 'Beaver', image: require('./assets/images/beaver.jpg'), funFact: 'This animal is known for building dams and lodges in rivers.', difficulty: 'Medium' },
    { name: 'Rabbit', image: require('./assets/images/rabbit.jpg'), funFact: 'This animal is known for its rapid reproduction rate and large ears.', difficulty: 'Easy' },
    { name: 'Skunk', image: require('./assets/images/skunk.jpg'), funFact: 'This animal is known for its ability to spray a foul-smelling liquid when threatened.', difficulty: 'Medium' },
    { name: 'Wild Turkey', image: require('./assets/images/wild_turkey.jpg'), funFact: 'This bird is native to North America and known for its colorful feathers.', difficulty: 'Easy' },
    { name: 'Lynx', image: require('./assets/images/lynx.jpg'), funFact: 'This wild cat is known for its tufted ears and short tail.', difficulty: 'Hard' },
    { name: 'Puma', image: require('./assets/images/puma.jpg'), funFact: 'This cat is also known as the mountain lion and is one of the most widespread large cats in the Americas.', difficulty: 'Medium' },
    { name: 'Marmot', image: require('./assets/images/marmot.jpg'), funFact: 'This large ground squirrel is known for living in burrows and is often seen in the mountains.', difficulty: 'Easy' },
    { name: 'Badger', image: require('./assets/images/badger.jpg'), funFact: 'This animal is known for its digging habits and aggressive nature.', difficulty: 'Hard' },
    { name: 'Black Bear', image: require('./assets/images/black_bear.jpg'), funFact: 'This bear is found throughout North America and is known for its omnivorous diet.', difficulty: 'Medium' },
    { name: 'Vulture', image: require('./assets/images/vulture.jpg'), funFact: 'This bird is a scavenger and plays a key role in ecosystems by cleaning up carrion.', difficulty: 'Hard' },
    { name: 'Pronghorn', image: require('./assets/images/pronghorn.jpg'), funFact: 'This animal is the fastest land mammal in North America and can run at speeds over 50 mph.', difficulty: 'Medium' },
    { name: 'Mountain Goat', image: require('./assets/images/mountain_goat.jpg'), funFact: 'This goat species is known for its climbing abilities in the rugged mountains.', difficulty: 'Medium' },
    { name: 'Hummingbird', image: require('./assets/images/hummingbird.jpg'), funFact: 'This bird is known for its ability to hover in mid-air by rapidly flapping its wings.', difficulty: 'Easy' },
    { name: 'Golden Eagle', image: require('./assets/images/golden_eagle.jpg'), funFact: 'This bird of prey is known for its hunting skills and powerful flight.', difficulty: 'Medium' },
    { name: 'American Bison', image: require('./assets/images/american_bison.jpg'), funFact: 'This species of bison is known for its massive size and was nearly driven to extinction.', difficulty: 'Medium' },
    { name: 'Coyote', image: require('./assets/images/coyote.jpg'), funFact: 'This adaptable predator can thrive in urban environments and is known for its eerie howls.', difficulty: 'Medium' },
    { name: 'Whitetail Deer', image: require('./assets/images/whitetail_deer.jpg'), funFact: 'This species of deer is found in forests and grasslands and is easily recognizable by its white tail.', difficulty: 'Easy' },
    { name: 'Elk', image: require('./assets/images/elk.jpg'), funFact: 'This large deer species is known for its impressive antlers and migratory behavior.', difficulty: 'Medium' },
    { name: 'Rattlesnake', image: require('./assets/images/rattlesnake.jpg'), funFact: 'This venomous snake is known for its distinctive rattle, which it uses to warn predators.', difficulty: 'Hard' },
    { name: 'Grizzly Bear', image: require('./assets/images/grizzly_bear.jpg'), funFact: 'This subspecies of brown bear is known for its strength and powerful build.', difficulty: 'Medium' },
    { name: 'Snowy Owl', image: require('./assets/images/snowy_owl.jpg'), funFact: 'This bird is known for its white plumage and is native to the cold northern regions of North America.', difficulty: 'Medium' },
    { name: 'Red Fox', image: require('./assets/images/red_fox.jpg'), funFact: 'This fox species is found throughout North America and is known for its bushy tail.', difficulty: 'Medium' },
    { name: 'Common Eider', image: require('./assets/images/common_eider.jpg'), funFact: 'A sea duck found along northern European coasts.', difficulty: 'Medium' },
      { name: 'Sparrowhawk', image: require('./assets/images/sparrowhawk.jpg'), funFact: 'This bird of prey is known for its agility and hunting skills.', difficulty: 'Medium' },
      { name: 'Wren', image: require('./assets/images/wren.jpg'), funFact: 'A tiny, energetic bird known for its high-pitched song.', difficulty: 'Easy' },
      { name: 'Woodpecker', image: require('./assets/images/woodpecker.jpg'), funFact: 'This bird is famous for its drumming sounds while searching for insects.', difficulty: 'Easy' },
      { name: 'Raven', image: require('./assets/images/raven.jpg'), funFact: 'Known for its intelligence, ravens can use tools and mimic sounds.', difficulty: 'Medium' },
      { name: 'Cuckoo', image: require('./assets/images/cuckoo.jpg'), funFact: 'This bird is known for laying its eggs in other birds’ nests.', difficulty: 'Medium' },
      { name: 'Fallow Deer', image: require('./assets/images/fallow_deer.jpg'), funFact: 'A species of deer that is easily recognizable by its distinctive spotted coat.', difficulty: 'Medium' },
      { name: 'Grey Seal', image: require('./assets/images/grey_seal.jpg'), funFact: 'This seal species is commonly found along Europe’s coasts.', difficulty: 'Medium' },
      { name: 'Moorhen', image: require('./assets/images/moorhen.jpg'), funFact: 'A small water bird found in wetlands and ponds across Europe.', difficulty: 'Medium' },
      { name: 'Kestrel', image: require('./assets/images/common_kestrel.jpg'), funFact: 'This small falcon is known for hovering in mid-air while hunting.', difficulty: 'Medium' },
      { name: 'Mink', image: require('./assets/images/mink.jpg'), funFact: 'A small carnivorous mammal often found near water.', difficulty: 'Medium' },
      { name: 'Frog', image: require('./assets/images/frog.jpg'), funFact: 'A common amphibian found in wetlands across Europe.', difficulty: 'Easy' },
      { name: 'Mole', image: require('./assets/images/mole.jpg'), funFact: 'This small mammal is known for its underground burrowing.', difficulty: 'Medium' },
      { name: 'Kangaroo', image: require('./assets/images/kangaroo.jpg'), funFact: 'This animal can leap over 3 meters in a single jump.', difficulty: 'Medium' },
      { name: 'Rhino', image: require('./assets/images/rhino.jpg'), funFact: 'This animal has thick skin to protect itself from thorns and predators.', difficulty: 'Medium' },
      { name: 'Panda', image: require('./assets/images/panda.jpg'), funFact: 'This animal’s diet is made up of 99% bamboo.', difficulty: 'Medium' },
      { name: 'Lionfish', image: require('./assets/images/lionfish.jpg'), funFact: 'Known for its venomous spines.', difficulty: 'Hard' },
      { name: 'Meerkat', image: require('./assets/images/meerkat.jpg'), funFact: 'This small mongoose is famous for standing on its hind legs.', difficulty: 'Medium' },
      { name: 'African Wild Dog', image: require('./assets/images/african_wild_dog.jpg'), funFact: 'This animal has a highly social pack structure.', difficulty: 'Hard' },
      { name: 'Leopard', image: require('./assets/images/leopard.jpg'), funFact: 'This animal is an excellent climber and can drag prey into trees.', difficulty: 'Medium' },
      { name: 'Crocodile', image: require('./assets/images/crocodile.jpg'), funFact: 'This animal can grow to over 7 meters long.', difficulty: 'Hard' },
      { name: 'Ostrich', image: require('./assets/images/ostrich.jpg'), funFact: 'This animal is the fastest bird on land.', difficulty: 'Easy' },
      { name: 'Warthog', image: require('./assets/images/warthog.jpg'), funFact: 'This animal uses its tusks for defense.', difficulty: 'Medium' },
      { name: 'Hyena', image: require('./assets/images/hyena.jpg'), funFact: 'This animal is known for its laughter-like call.', difficulty: 'Medium' },
      { name: 'Kudu', image: require('./assets/images/kudu.jpg'), funFact: 'A graceful antelope species with spiral horns.', difficulty: 'Hard' },
      { name: 'Gazelle', image: require('./assets/images/gazelle.jpg'), funFact: 'This animal is known for its speed and agility.', difficulty: 'Medium' },
      { name: 'Wildebeest', image: require('./assets/images/wildebeest.jpg'), funFact: 'This animal is part of the famous migration across the Serengeti.', difficulty: 'Medium' },
      { name: 'African Grey Parrot', image: require('./assets/images/african_grey_parrot.jpg'), funFact: 'This bird is highly intelligent and can mimic human speech.', difficulty: 'Medium' },
      { name: 'Pangolin', image: require('./assets/images/pangolin.jpg'), funFact: 'This animal’s scales are made of keratin, the same material as human nails.', difficulty: 'Hard' },
      { name: 'Cobra', image: require('./assets/images/cobra.jpg'), funFact: 'This snake can spread its hood when threatened.', difficulty: 'Hard' },
      { name: 'Mandrill', image: require('./assets/images/mandrill.jpg'), funFact: 'This primate is known for its colorful face.', difficulty: 'Hard' },
      { name: 'Aardvark', image: require('./assets/images/aardvark.jpg'), funFact: 'This nocturnal mammal is known for digging into ant and termite mounds.', difficulty: 'Hard' },
      { name: 'Black Mamba', image: require('./assets/images/black_mamba.jpg'), funFact: 'One of the fastest and most venomous snakes in Africa.', difficulty: 'Hard' },
      { name: 'Okapi', image: require('./assets/images/okapi.jpg'), funFact: 'This animal looks like a zebra but is related to giraffes.', difficulty: 'Hard' },
      { name: 'Baboons', image: require('./assets/images/baboons.jpg'), funFact: 'These primates live in troops and are highly social.', difficulty: 'Medium' },
      { name: 'African Buffalo', image: require('./assets/images/african_buffalo.jpg'), funFact: 'This animal is known for its unpredictable nature and is one of the Big Five.', difficulty: 'Hard' },
      { name: 'Secretary Bird', image: require('./assets/images/secretary_bird.jpg'), funFact: 'This bird is known for its long legs and hunting ability.', difficulty: 'Hard' },
      { name: 'Vulture', image: require('./assets/images/vulture.jpg'), funFact: 'This scavenger plays a critical role in ecosystems by cleaning up carrion.', difficulty: 'Medium' },
      { name: 'Binturong', image: require('./assets/images/binturong.jpg'), funFact: 'Also called the bearcat, it has a distinct smell of popcorn.', difficulty: 'Hard' },
      { name: 'Giant Forest Hog', image: require('./assets/images/giant_forest_hog.jpg'), funFact: 'This is the largest wild pig in Africa.', difficulty: 'Hard' },
      { name: 'Sable Antelope', image: require('./assets/images/sable_antelope.jpg'), funFact: 'This antelope species is known for its stunning black coat and long, curved horns.', difficulty: 'Hard' },
      { name: 'Impala', image: require('./assets/images/impala.jpg'), funFact: 'A Medium-sized antelope known for its graceful leaps.', difficulty: 'Medium' },
      { name: 'Springbok', image: require('./assets/images/springbok.jpg'), funFact: 'A highly agile antelope that is a symbol of South Africa.', difficulty: 'Medium' },
      { name: 'Eland', image: require('./assets/images/eland.jpg'), funFact: 'This antelope is one of the largest and most graceful in Africa.', difficulty: 'Hard' },
      { name: 'Jackal', image: require('./assets/images/jackal.jpg'), funFact: 'This opportunistic animal often works in pairs or small groups.', difficulty: 'Medium' },
      { name: 'Serval', image: require('./assets/images/serval.jpg'), funFact: 'This wild cat is known for its incredible leaping ability.', difficulty: 'Medium' },
      { name: 'Giant Tortoise', image: require('./assets/images/giant_tortoise.jpg'), funFact: 'This slow-moving reptile can live for over 100 years.', difficulty: 'Medium' },
      { name: 'Sitatunga', image: require('./assets/images/sitatunga.jpg'), funFact: 'A rare swamp-dwelling antelope found in Central Africa.', difficulty: 'Hard' },
      { name: 'Aardwolf', image: require('./assets/images/aardwolf.jpg'), funFact: 'This animal preys mainly on termites and is related to the hyena.', difficulty: 'Hard' }, 
  ],

    Africa: [
      { name: 'Lion', image: require('./assets/images/lion.jpg'), funFact: 'This animal is the only cat that lives in groups.', difficulty: 'Easy' },
      { name: 'Elephant', image: require('./assets/images/elephant.jpg'), funFact: 'This animal is the largest land animal on Earth.', difficulty: 'Easy' },
      { name: 'Giraffe', image: require('./assets/images/giraffe.jpg'), funFact: 'This animal has a long neck to reach high trees for food.', difficulty: 'Easy' },
      { name: 'Zebra', image: require('./assets/images/zebra.jpg'), funFact: 'This animal’s stripes are unique to each individual.', difficulty: 'Easy' },
      { name: 'Cheetah', image: require('./assets/images/cheetah.jpg'), funFact: 'This animal is the fastest land animal, capable of speeds up to 60 mph.', difficulty: 'Medium' },
      { name: 'Hippo', image: require('./assets/images/hippo.jpg'), funFact: 'This animal spends most of its time submerged in water.', difficulty: 'Medium' },
      { name: 'Gorilla', image: require('./assets/images/gorilla.jpg'), funFact: 'This animal shares 98% of its DNA with humans.', difficulty: 'Medium' },
      { name: 'Kangaroo', image: require('./assets/images/kangaroo.jpg'), funFact: 'This animal can leap over 3 meters in a single jump.', difficulty: 'Medium' },
      { name: 'Rhino', image: require('./assets/images/rhino.jpg'), funFact: 'This animal has thick skin to protect itself from thorns and predators.', difficulty: 'Medium' },
      { name: 'Panda', image: require('./assets/images/panda.jpg'), funFact: 'This animal’s diet is made up of 99% bamboo.', difficulty: 'Medium' },
      { name: 'Lionfish', image: require('./assets/images/lionfish.jpg'), funFact: 'Known for its venomous spines.', difficulty: 'Hard' },
      { name: 'Meerkat', image: require('./assets/images/meerkat.jpg'), funFact: 'This small mongoose is famous for standing on its hind legs.', difficulty: 'Medium' },
      { name: 'African Wild Dog', image: require('./assets/images/african_wild_dog.jpg'), funFact: 'This animal has a highly social pack structure.', difficulty: 'Hard' },
      { name: 'Leopard', image: require('./assets/images/leopard.jpg'), funFact: 'This animal is an excellent climber and can drag prey into trees.', difficulty: 'Medium' },
      { name: 'Crocodile', image: require('./assets/images/crocodile.jpg'), funFact: 'This animal can grow to over 7 meters long.', difficulty: 'Hard' },
      { name: 'Ostrich', image: require('./assets/images/ostrich.jpg'), funFact: 'This animal is the fastest bird on land.', difficulty: 'Easy' },
      { name: 'Warthog', image: require('./assets/images/warthog.jpg'), funFact: 'This animal uses its tusks for defense.', difficulty: 'Medium' },
      { name: 'Hyena', image: require('./assets/images/hyena.jpg'), funFact: 'This animal is known for its laughter-like call.', difficulty: 'Medium' },
      { name: 'Kudu', image: require('./assets/images/kudu.jpg'), funFact: 'A graceful antelope species with spiral horns.', difficulty: 'Hard' },
      { name: 'Gazelle', image: require('./assets/images/gazelle.jpg'), funFact: 'This animal is known for its speed and agility.', difficulty: 'Medium' },
      { name: 'Wildebeest', image: require('./assets/images/wildebeest.jpg'), funFact: 'This animal is part of the famous migration across the Serengeti.', difficulty: 'Medium' },
      { name: 'African Grey Parrot', image: require('./assets/images/african_grey_parrot.jpg'), funFact: 'This bird is highly intelligent and can mimic human speech.', difficulty: 'Medium' },
      { name: 'Pangolin', image: require('./assets/images/pangolin.jpg'), funFact: 'This animal’s scales are made of keratin, the same material as human nails.', difficulty: 'Hard' },
      { name: 'Cobra', image: require('./assets/images/cobra.jpg'), funFact: 'This snake can spread its hood when threatened.', difficulty: 'Hard' },
      { name: 'Mandrill', image: require('./assets/images/mandrill.jpg'), funFact: 'This primate is known for its colorful face.', difficulty: 'Hard' },
      { name: 'Aardvark', image: require('./assets/images/aardvark.jpg'), funFact: 'This nocturnal mammal is known for digging into ant and termite mounds.', difficulty: 'Hard' },
      { name: 'Black Mamba', image: require('./assets/images/black_mamba.jpg'), funFact: 'One of the fastest and most venomous snakes in Africa.', difficulty: 'Hard' },
      { name: 'Okapi', image: require('./assets/images/okapi.jpg'), funFact: 'This animal looks like a zebra but is related to giraffes.', difficulty: 'Hard' },
      { name: 'Baboons', image: require('./assets/images/baboons.jpg'), funFact: 'These primates live in troops and are highly social.', difficulty: 'Medium' },
      { name: 'African Buffalo', image: require('./assets/images/african_buffalo.jpg'), funFact: 'This animal is known for its unpredictable nature and is one of the Big Five.', difficulty: 'Hard' },
      { name: 'Secretary Bird', image: require('./assets/images/secretary_bird.jpg'), funFact: 'This bird is known for its long legs and hunting ability.', difficulty: 'Hard' },
      { name: 'Vulture', image: require('./assets/images/vulture.jpg'), funFact: 'This scavenger plays a critical role in ecosystems by cleaning up carrion.', difficulty: 'Medium' },
      { name: 'Binturong', image: require('./assets/images/binturong.jpg'), funFact: 'Also called the bearcat, it has a distinct smell of popcorn.', difficulty: 'Hard' },
      { name: 'Giant Forest Hog', image: require('./assets/images/giant_forest_hog.jpg'), funFact: 'This is the largest wild pig in Africa.', difficulty: 'Hard' },
      { name: 'Sable Antelope', image: require('./assets/images/sable_antelope.jpg'), funFact: 'This antelope species is known for its stunning black coat and long, curved horns.', difficulty: 'Hard' },
      { name: 'Impala', image: require('./assets/images/impala.jpg'), funFact: 'A Medium-sized antelope known for its graceful leaps.', difficulty: 'Medium' },
      { name: 'Springbok', image: require('./assets/images/springbok.jpg'), funFact: 'A highly agile antelope that is a symbol of South Africa.', difficulty: 'Medium' },
      { name: 'Eland', image: require('./assets/images/eland.jpg'), funFact: 'This antelope is one of the largest and most graceful in Africa.', difficulty: 'Hard' },
      { name: 'Jackal', image: require('./assets/images/jackal.jpg'), funFact: 'This opportunistic animal often works in pairs or small groups.', difficulty: 'Medium' },
      { name: 'Serval', image: require('./assets/images/serval.jpg'), funFact: 'This wild cat is known for its incredible leaping ability.', difficulty: 'Medium' },
      { name: 'Giant Tortoise', image: require('./assets/images/giant_tortoise.jpg'), funFact: 'This slow-moving reptile can live for over 100 years.', difficulty: 'Medium' },
      { name: 'Sitatunga', image: require('./assets/images/sitatunga.jpg'), funFact: 'A rare swamp-dwelling antelope found in Central Africa.', difficulty: 'Hard' },
      { name: 'Aardwolf', image: require('./assets/images/aardwolf.jpg'), funFact: 'This animal preys mainly on termites and is related to the hyena.', difficulty: 'Hard' },
    ],
  
    Europe: [
      { name: 'Brown Bear', image: require('./assets/images/brown_bear.jpg'), funFact: 'This animal is found in forests and tundras across Europe.', difficulty: 'Easy' },
      { name: 'European Wolf', image: require('./assets/images/european_wolf.jpg'), funFact: 'This animal is native to the forests of Europe.', difficulty: 'Medium' },
      { name: 'Red Fox', image: require('./assets/images/red_fox.jpg'), funFact: 'This animal is found throughout Europe, known for its bushy tail.', difficulty: 'Easy' },
      { name: 'Wild Boar', image: require('./assets/images/wild_boar.jpg'), funFact: 'This animal is found in forests and grasslands across Europe.', difficulty: 'Medium' },
      { name: 'European Bison', image: require('./assets/images/european_bison.jpg'), funFact: 'This animal is one of the heaviest land animals in Europe.', difficulty: 'Hard' },
      { name: 'Mouflon', image: require('./assets/images/mouflon.jpg'), funFact: 'This animal is a wild sheep found in Europe, especially in mountainous regions.', difficulty: 'Hard' },
      { name: 'European Hedgehog', image: require('./assets/images/european_hedgehog.jpg'), funFact: 'This small animal is known for its spiny coat and nocturnal behavior.', difficulty: 'Easy' },
      { name: 'Eurasian Lynx', image: require('./assets/images/eurasian_lynx.jpg'), funFact: 'This animal is a solitary big cat found in European forests.', difficulty: 'Hard' },
      { name: 'Beaver', image: require('./assets/images/beaver.jpg'), funFact: 'This animal is known for building dams and lodges in rivers.', difficulty: 'Medium' },
      { name: 'Golden Eagle', image: require('./assets/images/golden_eagle.jpg'), funFact: 'This animal is a large bird of prey found in the mountains and forests of Europe.', difficulty: 'Hard' },
      { name: 'European Starling', image: require('./assets/images/european_starling.jpg'), funFact: 'This bird species is known for its massive flocks and ability to mimic human speech.', difficulty: 'Medium' },
      { name: 'Alpine Ibex', image: require('./assets/images/alpine_ibex.jpg'), funFact: 'A wild goat with magnificent curved horns, found in the European Alps.', difficulty: 'Hard' },
      { name: 'Otterhound', image: require('./assets/images/otterhound.jpg'), funFact: 'A large dog breed from England, known for its otter hunting abilities.', difficulty: 'Hard' },
      { name: 'Marmot', image: require('./assets/images/marmot.jpg'), funFact: 'This ground-dwelling rodent is found in European mountain ranges.', difficulty: 'Medium' },
      { name: 'Wildcat', image: require('./assets/images/wildcat.jpg'), funFact: 'This animal is the ancestor of the domestic cat and lives in forests.', difficulty: 'Hard' },
      { name: 'European Green Lizard', image: require('./assets/images/european_green_lizard.jpg'), funFact: 'This brightly colored lizard is found in the Mediterranean region.', difficulty: 'Medium' },
      { name: 'European Turtle Dove', image: require('./assets/images/european_turtle_dove.jpg'), funFact: 'A migratory bird that symbolizes peace.', difficulty: 'Medium' },
      { name: 'Cappuccino Monkey', image: require('./assets/images/cappuccino_monkey.jpg'), funFact: 'This primate is known for its sociable behavior and vocalizations.', difficulty: 'Hard' },
      { name: 'European Brown Hare', image: require('./assets/images/european_brown_hare.jpg'), funFact: 'This hare is faster than most rabbits and can leap over obstacles.', difficulty: 'Easy' },
      { name: 'Eurasian Eagle Owl', image: require('./assets/images/eurasian_eagle_owl.jpg'), funFact: 'A large owl species known for its powerful wingspan and intimidating presence.', difficulty: 'Hard' },
      { name: 'Bearded Vulture', image: require('./assets/images/bearded_vulture.jpg'), funFact: 'This large bird of prey is known for its diet of bone marrow.', difficulty: 'Hard' },
      { name: 'Swallow', image: require('./assets/images/swallow.jpg'), funFact: 'This bird migrates thousands of miles and is a symbol of the changing seasons.', difficulty: 'Easy' },
      { name: 'Booby', image: require('./assets/images/booby.jpg'), funFact: 'A seabird known for its colorful feet and acrobatic flying abilities.', difficulty: 'Medium' },
      { name: 'Common Eider', image: require('./assets/images/common_eider.jpg'), funFact: 'A sea duck found along northern European coasts.', difficulty: 'Medium' },
      { name: 'Sparrowhawk', image: require('./assets/images/sparrowhawk.jpg'), funFact: 'This bird of prey is known for its agility and hunting skills.', difficulty: 'Medium' },
      { name: 'Wren', image: require('./assets/images/wren.jpg'), funFact: 'A tiny, energetic bird known for its high-pitched song.', difficulty: 'Easy' },
      { name: 'Woodpecker', image: require('./assets/images/woodpecker.jpg'), funFact: 'This bird is famous for its drumming sounds while searching for insects.', difficulty: 'Easy' },
      { name: 'Raven', image: require('./assets/images/raven.jpg'), funFact: 'Known for its intelligence, ravens can use tools and mimic sounds.',difficulty: 'Medium' },
      { name: 'Cuckoo', image: require('./assets/images/cuckoo.jpg'), funFact: 'This bird is known for laying its eggs in other birds’ nests.', difficulty: 'Medium' },
      { name: 'Fallow Deer', image: require('./assets/images/fallow_deer.jpg'), funFact: 'A species of deer that is easily recognizable by its distinctive spotted coat.', difficulty: 'Medium' },
      { name: 'Grey Seal', image: require('./assets/images/grey_seal.jpg'), funFact: 'This seal species is commonly found along Europe’s coasts.', difficulty: 'Medium' },
      { name: 'Moorhen', image: require('./assets/images/moorhen.jpg'), funFact: 'A small water bird found in wetlands and ponds across Europe.', difficulty: 'Medium' },
      { name: 'Kestrel', image: require('./assets/images/common_kestrel.jpg'), funFact: 'This small falcon is known for hovering in mid-air while hunting.', difficulty: 'Medium' },
      { name: 'Mink', image: require('./assets/images/mink.jpg'), funFact: 'A small carnivorous mammal often found near water.', difficulty: 'Medium' },
      { name: 'Frog', image: require('./assets/images/frog.jpg'), funFact: 'A common amphibian found in wetlands across Europe.', difficulty: 'Easy' },
      { name: 'Mole', image: require('./assets/images/mole.jpg'), funFact: 'This small mammal is known for its underground burrowing.', difficulty: 'Medium' },
  ],

  Asia: [
    { name: 'Tiger', image: require('./assets/images/tiger.jpg'), funFact: 'This animal is the largest species of cat.', difficulty: 'Hard' },
    { name: 'Panda', image: require('./assets/images/panda.jpg'), funFact: 'This animal spends most of its time eating bamboo.', difficulty: 'Easy' },
    { name: 'Red Panda', image: require('./assets/images/red_panda.jpg'), funFact: 'This animal is a tree-dwelling species native to the Himalayas.', difficulty: 'Medium' },
    { name: 'Elephant', image: require('./assets/images/elephant.jpg'), funFact: 'This animal is the largest land mammal.', difficulty: 'Medium' },
    { name: 'Snow Leopard', image: require('./assets/images/snow_leopard.jpg'), funFact: 'This animal is known for its powerful build and thick fur coat.', difficulty: 'Hard' },
    { name: 'Bengal Tiger', image: require('./assets/images/bengal_tiger.jpg'), funFact: 'This animal is native to the Indian subcontinent and is a symbol of strength.', difficulty: 'Hard' },
    { name: 'Yak', image: require('./assets/images/yak.jpg'), funFact: 'This animal is a Hardy bovine that lives in the Himalayan mountain range.', difficulty: 'Medium' },
    { name: 'Komodo Dragon', image: require('./assets/images/komodo_dragon.jpg'), funFact: 'This animal is the largest lizard in the world.', difficulty: 'Hard' },
    { name: 'Gibbon', image: require('./assets/images/gibbon.jpg'), funFact: 'This animal is known for its acrobatic movement in trees.', difficulty: 'Medium' },
    { name: 'Siberian Husky', image: require('./assets/images/siberian_husky.jpg'), funFact: 'This dog breed is known for its endurance and ability to withstand cold climates.', difficulty: 'Medium' },
    { name: 'Pangolin', image: require('./assets/images/pangolin.jpg'), funFact: 'This animal is covered in scales and feeds on ants and termites.', difficulty: 'Hard' },
    { name: 'Macaque', image: require('./assets/images/macaque.jpg'), funFact: 'A group of monkeys known for their intelligence and social behavior.', difficulty: 'Medium' },
    { name: 'Rhinoceros', image: require('./assets/images/rhinoceros.jpg'), funFact: 'This animal has thick skin and one or two horns on its snout.', difficulty: 'Medium' },
    { name: 'Asian Elephant', image: require('./assets/images/asian_elephant.jpg'), funFact: 'A smaller cousin of the African elephant, found throughout Asia.', difficulty: 'Medium' },
    { name: 'Sloth Bear', image: require('./assets/images/sloth_bear.jpg'), funFact: 'This bear feeds primarily on insects and has a specialized long tongue.', difficulty: 'Hard' },
    { name: 'Cobra', image: require('./assets/images/cobra.jpg'), funFact: 'This snake is known for its hood, which it expands when threatened.', difficulty: 'Medium' },
    { name: 'Muntjac', image: require('./assets/images/muntjac.jpg'), funFact: 'A small species of deer native to Southeast Asia.', difficulty: 'Easy' },
    { name: 'Indian Leopard', image: require('./assets/images/indian_leopard.jpg'), funFact: 'This big cat is known for its spotted coat and powerful build.', difficulty: 'Hard' },
    { name: 'Gaur', image: require('./assets/images/gaur.jpg'), funFact: 'This wild cattle species is found in the forests of South and Southeast Asia.', difficulty: 'Medium' },
    { name: 'Wild Boar', image: require('./assets/images/wild_boar.jpg'), funFact: 'This species of boar is found throughout Asia and is a common wild mammal.', difficulty: 'Medium' },
    { name: 'Clouded Leopard', image: require('./assets/images/clouded_leopard.jpg'), funFact: 'This cat species is known for its distinctive cloud-like spots on its coat.', difficulty: 'Hard' },
    { name: 'Binturong', image: require('./assets/images/binturong.jpg'), funFact: 'This animal is known for its prehensile tail and strong odor resembling popcorn.', difficulty: 'Hard' },
    { name: 'Kangaroo', image: require('./assets/images/kangaroo.jpg'), funFact: 'This animal is native to Australia but is found in parts of Southeast Asia.', difficulty: 'Easy' },
    { name: 'Dhole', image: require('./assets/images/dhole.jpg'), funFact: 'This wild dog is found in the forests of Central and South Asia.', difficulty: 'Medium' },
    { name: 'Asian Black Bear', image: require('./assets/images/asian_black_bear.jpg'), funFact: 'This bear is found in forests across Asia and is often seen climbing trees.', difficulty: 'Medium' },
    { name: 'Snow Leopard', image: require('./assets/images/snow_leopard.jpg'), funFact: 'A solitary cat known for its elusive nature and stunning coat.', difficulty: 'Hard' },
    { name: 'Komodo Dragon', image: require('./assets/images/komodo_dragon.jpg'), funFact: 'This giant lizard is the largest species of lizard and native to Indonesia.', difficulty: 'Hard' },
    { name: 'Tiger Shark', image: require('./assets/images/tiger_shark.jpg'), funFact: 'A large, aggressive shark found in tropical and subtropical waters of Asia.', difficulty: 'Medium' },
    { name: 'Indian Peafowl', image: require('./assets/images/indian_peafowl.jpg'), funFact: 'This bird is famous for its colorful tail feathers used in mating displays.', difficulty: 'Easy' },
    { name: 'Bengal Tiger', image: require('./assets/images/bengal_tiger.jpg'), funFact: 'This animal is native to the Indian subcontinent and is the most numerous tiger species.', difficulty: 'Hard' },
    { name: 'Alpine Ibex', image: require('./assets/images/alpine_ibex.jpg'), funFact: 'A wild goat with magnificent curved horns, found in the European Alps.', difficulty: 'Medium' },
    { name: 'Gharial', image: require('./assets/images/gharial.jpg'), funFact: 'A critically endangered crocodilian species with a long, narrow snout, native to India and Nepal.', difficulty: 'Hard' },
    { name: 'Spotted Deer', image: require('./assets/images/spotted_deer.jpg'), funFact: 'This species of deer is commonly found in Indian forests and grasslands.', difficulty: 'Easy' },
    { name: 'Blackbuck', image: require('./assets/images/blackbuck.jpg'), funFact: 'This antelope species is known for its spiral-shaped horns and is found in the Indian subcontinent.', difficulty: 'Medium' },
],

NorthAmerica: [
  { name: 'Bear', image: require('./assets/images/bear.jpg'), funFact: 'This animal is known for its hibernation and powerful strength.', difficulty: 'Medium' },
  { name: 'Bison', image: require('./assets/images/bison.jpg'), funFact: 'This animal is one of the largest land mammals in North America.', difficulty: 'Medium' },
  { name: 'Raccoon', image: require('./assets/images/raccoon.jpg'), funFact: 'This animal is known for its dexterous front paws and curious nature.', difficulty: 'Easy' },
  { name: 'Wolf', image: require('./assets/images/wolf.jpg'), funFact: 'This animal lives and hunts in packs to improve its hunting success.', difficulty: 'Medium' },
  { name: 'Coyote', image: require('./assets/images/coyote.jpg'), funFact: 'This animal is known for its adaptability and survival in diverse environments.', difficulty: 'Medium' },
  { name: 'Moose', image: require('./assets/images/moose.jpg'), funFact: 'This animal is the largest species in the deer family.', difficulty: 'Hard' },
  { name: 'Cougar', image: require('./assets/images/cougar.jpg'), funFact: 'This animal is the most widespread wild cat in the Americas.', difficulty: 'Medium' },
  { name: 'Alligator', image: require('./assets/images/alligator.jpg'), funFact: 'This animal has been around for millions of years and is known for its powerful jaws.', difficulty: 'Medium' },
  { name: 'Fox', image: require('./assets/images/fox.jpg'), funFact: 'This animal is known for its cleverness and agility.', difficulty: 'Medium' },
  { name: 'Otter', image: require('./assets/images/otter.jpg'), funFact: 'This animal is a playful aquatic mammal with a thick, water-repellent coat.', difficulty: 'Easy' },
  { name: 'Bald Eagle', image: require('./assets/images/bald_eagle.jpg'), funFact: 'This bird is the national symbol of the United States and is known for its powerful flight.', difficulty: 'Medium' },
  { name: 'Squirrel', image: require('./assets/images/squirrel.jpg'), funFact: 'This animal is known for storing food and its bushy tail.', difficulty: 'Easy' },
  { name: 'Porcupine', image: require('./assets/images/porcupine.jpg'), funFact: 'This animal is known for its sharp quills, which it uses for defense.', difficulty: 'Hard' },
  { name: 'Armadillo', image: require('./assets/images/armadillo.jpg'), funFact: 'This animal has a tough, leathery shell that protects it from predators.', difficulty: 'Medium' },
  { name: 'Opossum', image: require('./assets/images/opossum.jpg'), funFact: 'This marsupial is known for "playing dead" when threatened.', difficulty: 'Easy' },
  { name: 'Hawk', image: require('./assets/images/hawk.jpg'), funFact: 'This bird is a skilled hunter with sharp talons and excellent vision.', difficulty: 'Medium' },
  { name: 'Beaver', image: require('./assets/images/beaver.jpg'), funFact: 'This animal is known for building dams and lodges in rivers.', difficulty: 'Medium' },
  { name: 'Rabbit', image: require('./assets/images/rabbit.jpg'), funFact: 'This animal is known for its rapid reproduction rate and large ears.', difficulty: 'Easy' },
  { name: 'Skunk', image: require('./assets/images/skunk.jpg'), funFact: 'This animal is known for its ability to spray a foul-smelling liquid when threatened.', difficulty: 'Medium' },
  { name: 'Wild Turkey', image: require('./assets/images/wild_turkey.jpg'), funFact: 'This bird is native to North America and known for its colorful feathers.', difficulty: 'Easy' },
  { name: 'Lynx', image: require('./assets/images/lynx.jpg'), funFact: 'This wild cat is known for its tufted ears and short tail.', difficulty: 'Hard' },
  { name: 'Puma', image: require('./assets/images/puma.jpg'), funFact: 'This cat is also known as the mountain lion and is one of the most widespread large cats in the Americas.', difficulty: 'Medium' },
  { name: 'Marmot', image: require('./assets/images/marmot.jpg'), funFact: 'This large ground squirrel is known for living in burrows and is often seen in the mountains.', difficulty: 'Easy' },
  { name: 'Badger', image: require('./assets/images/badger.jpg'), funFact: 'This animal is known for its digging habits and aggressive nature.', difficulty: 'Hard' },
  { name: 'Black Bear', image: require('./assets/images/black_bear.jpg'), funFact: 'This bear is found throughout North America and is known for its omnivorous diet.', difficulty: 'Medium' },
  { name: 'Vulture', image: require('./assets/images/vulture.jpg'), funFact: 'This bird is a scavenger and plays a key role in ecosystems by cleaning up carrion.', difficulty: 'Hard' },
  { name: 'Pronghorn', image: require('./assets/images/pronghorn.jpg'), funFact: 'This animal is the fastest land mammal in North America and can run at speeds over 50 mph.', difficulty: 'Medium' },
  { name: 'Mountain Goat', image: require('./assets/images/mountain_goat.jpg'), funFact: 'This goat species is known for its climbing abilities in the rugged mountains.', difficulty: 'Medium' },
  { name: 'Hummingbird', image: require('./assets/images/hummingbird.jpg'), funFact: 'This bird is known for its ability to hover in mid-air by rapidly flapping its wings.', difficulty: 'Easy' },
  { name: 'Golden Eagle', image: require('./assets/images/golden_eagle.jpg'), funFact: 'This bird of prey is known for its hunting skills and powerful flight.', difficulty: 'Medium' },
  { name: 'American Bison', image: require('./assets/images/american_bison.jpg'), funFact: 'This species of bison is known for its massive size and was nearly driven to extinction.', difficulty: 'Medium' },
  { name: 'Coyote', image: require('./assets/images/coyote.jpg'), funFact: 'This adaptable predator can thrive in urban environments and is known for its eerie howls.', difficulty: 'Medium' },
  { name: 'Whitetail Deer', image: require('./assets/images/whitetail_deer.jpg'), funFact: 'This species of deer is found in forests and grasslands and is easily recognizable by its white tail.', difficulty: 'Easy' },
  { name: 'Elk', image: require('./assets/images/elk.jpg'), funFact: 'This large deer species is known for its impressive antlers and migratory behavior.', difficulty: 'Medium' },
  { name: 'Rattlesnake', image: require('./assets/images/rattlesnake.jpg'), funFact: 'This venomous snake is known for its distinctive rattle, which it uses to warn predators.', difficulty: 'Hard' },
  { name: 'Grizzly Bear', image: require('./assets/images/grizzly_bear.jpg'), funFact: 'This subspecies of brown bear is known for its strength and powerful build.', difficulty: 'Medium' },
  { name: 'Snowy Owl', image: require('./assets/images/snowy_owl.jpg'), funFact: 'This bird is known for its white plumage and is native to the cold northern regions of North America.', difficulty: 'Medium' },
  { name: 'Red Fox', image: require('./assets/images/red_fox.jpg'), funFact: 'This fox species is found throughout North America and is known for its bushy tail.', difficulty: 'Medium' },
],

SouthAmerica :[
  { name: 'Jaguar', image: require('./assets/images/jaguar.jpg'), funFact: 'This animal is the largest cat in the Americas.', difficulty: 'Hard' },
  { name: 'Sloth', image: require('./assets/images/sloth.jpg'), funFact: 'This animal is known for its slow movement and long sleep periods.', difficulty: 'Easy' },
  { name: 'Llama', image: require('./assets/images/llama.jpg'), funFact: 'This animal is a domesticated species native to the Andes mountains.', difficulty: 'Medium' },
  { name: 'Capybara', image: require('./assets/images/capybara.jpg'), funFact: 'This animal is the largest rodent in the world.', difficulty: 'Medium' },
  { name: 'Anaconda', image: require('./assets/images/anaconda.jpg'), funFact: 'This animal is the heaviest snake in the world.', difficulty: 'Hard' },
  { name: 'Piranha', image: require('./assets/images/piranha.jpg'), funFact: 'This animal is known for its sharp teeth and carnivorous diet.', difficulty: 'Hard' },
  { name: 'Macaw', image: require('./assets/images/macaw.jpg'), funFact: 'This animal is a brightly colored bird known for its intelligence and social behavior.', difficulty: 'Medium' },
  { name: 'Monkey', image: require('./assets/images/monkey.jpg'), funFact: 'This animal is known for its social behavior and intelligence.', difficulty: 'Medium' },
  { name: 'Toco Toucan', image: require('./assets/images/toco_toucan.jpg'), funFact: 'This animal is recognized by its large, colorful beak.', difficulty: 'Medium' },
  { name: 'Poison Dart Frog', image: require('./assets/images/poison_dart_frog.jpg'), funFact: 'This frog is known for its brightly colored skin and toxic secretion.', difficulty: 'Hard' },
  { name: 'Giant River Otter', image: require('./assets/images/giant_river_otter.jpg'), funFact: 'This otter species is found in the Amazon River and is known for its social behavior.', difficulty: 'Medium' },
  { name: 'Condor', image: require('./assets/images/andean_condor.jpg'), funFact: 'This large bird of prey is native to the Andes mountains and has one of the largest wingspans of any bird.', difficulty: 'Hard' },
  { name: 'Tamarin Monkey', image: require('./assets/images/tamarin_monkey.jpg'), funFact: 'This small monkey species is known for its distinctive facial hair.', difficulty: 'Easy' },
  { name: 'Guanaco', image: require('./assets/images/guanaco.jpg'), funFact: 'This animal is closely related to the llama and is found in the Andes.', difficulty: 'Medium' },
  { name: 'Caiman', image: require('./assets/images/caiman.jpg'), funFact: 'This crocodilian species is found in South America and is often mistaken for an alligator.', difficulty: 'Hard' },
  { name: 'Tapir', image: require('./assets/images/south_american_tapir.jpg'), funFact: 'This herbivorous mammal is known for its prehensile snout and stocky body.', difficulty: 'Medium' },
  { name: 'Harpy Eagle', image: require('./assets/images/harpy_eagle.jpg'), funFact: 'This powerful bird of prey is found in the tropical rainforests of South America.', difficulty: 'Hard' },
  { name: 'Pygmy Marmoset', image: require('./assets/images/pygmy_marmoset.jpg'), funFact: 'This tiny monkey is the smallest primate in the world.', difficulty: 'Easy' },
  { name: 'Vampire Bat', image: require('./assets/images/vampire_bat.jpg'), funFact: 'This bat feeds on the blood of other animals, particularly livestock.', difficulty: 'Hard' },
  { name: 'Giant Anteater', image: require('./assets/images/giant_anteater.jpg'), funFact: 'This animal is known for its long snout and diet of ants and termites.', difficulty: 'Medium' },
  { name: 'Stork', image: require('./assets/images/jabiru_stork.jpg'), funFact: 'This large stork species is found in wetlands across South America.', difficulty: 'Medium' },
  { name: 'Hippo', image: require('./assets/images/pygmy_hippo.jpg'), funFact: 'This smaller cousin of the common hippopotamus is found in the forests of West Africa.', difficulty: 'Hard' },
  { name: 'Sea Lion', image: require('./assets/images/south_american_sea_lion.jpg'), funFact: 'This sea lion is native to the coasts of South America and is known for its loud bark.', difficulty: 'Medium' },
  { name: 'Rhea', image: require('./assets/images/rhea.jpg'), funFact: 'This large, flightless bird is native to South America and is similar to an ostrich.', difficulty: 'Medium' },
  { name: 'Agouti', image: require('./assets/images/agouti.jpg'), funFact: 'This rodent is known for its ability to store food in burrows and forests.', difficulty: 'Easy' },
  { name: 'Vicuna', image: require('./assets/images/vicuna.jpg'), funFact: 'This wild relative of the llama is found in the Andes and produces a highly prized wool.', difficulty: 'Medium' },
  { name: 'Ocelot', image: require('./assets/images/ocelot.jpg'), funFact: 'This small wild cat is found in the rainforests of South America and is known for its beautiful coat.', difficulty: 'Hard' },
  { name: 'Turtle', image: require('./assets/images/turtle.jpg'), funFact: 'This reptile is known for its Hard shell and slow movement.', difficulty: 'Easy' },
  { name: 'Iguana', image: require('./assets/images/iguana.jpg'), funFact: 'This herbivorous lizard is found in the rainforests and coastal regions of South America.', difficulty: 'Medium' },
  { name: 'Jaguarundi', image: require('./assets/images/jaguarundi.jpg'), funFact: 'This small wild cat is found in the grasslands and forests of South America.', difficulty: 'Medium' },
  { name: 'Mandrill', image: require('./assets/images/mandrill.jpg'), funFact: 'This colorful primate is found in the rainforests of Central Africa, though it also roams parts of South America.', difficulty: 'Hard' },
  { name: 'Electric Eel', image: require('./assets/images/electric_eel.jpg'), funFact: 'This eel is capable of generating electric shocks to stun its prey.', difficulty: 'Hard' },
  { name: 'Caracara', image: require('./assets/images/crested_caracara.jpg'), funFact: 'This bird of prey is often found scavenging in the open grasslands of South America.', difficulty: 'Medium' },
],
};

const continentIcons = {
  Global: require('./assets/icons/global-icon.png'),
  Africa: require('./assets/icons/africa-icon.png'),
  Europe: require('./assets/icons/europe-icon.png'),
  Asia: require('./assets/icons/asia-icon.png'),
  NorthAmerica: require('./assets/icons/north-america-icon.png'),
  SouthAmerica: require('./assets/icons/south-america-icon.png'),
};

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Easy':
      return 'green';
    case 'Medium':
      return 'orange';
    case 'Hard':
      return 'red';
    default:
      return 'gray';
  }
};

export default function App() {
  // Always call hooks at the top.
  const [fontsLoaded] = useFonts({
    'BubblegumSans': require('./assets/fonts/BubblegumSans-Regular.ttf'),
  });
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [confirmedAnswer, setConfirmedAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [shakeAnim] = useState(new Animated.Value(0));
  const [randomizedChoices, setRandomizedChoices] = useState([]);
  const [showFunFact, setShowFunFact] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [backgroundAnim] = useState(new Animated.Value(0));
  const [currentTier, setCurrentTier] = useState(tiers[0]); // Default to Tier 1
  const [imageKey, setImageKey] = useState(0);

  const refreshImage = () => {
    setImageKey((prevKey) => prevKey + 1); // Update key to force re-render
  };

  // Load score and determine the tier on startup
  useEffect(() => {
    const loadScore = async () => {
      try {
        const savedScore = await AsyncStorage.getItem('score');
        const userScore = savedScore !== null ? Number(savedScore) : 0;
        setScore(userScore);
        updateCurrentTier(userScore);
      } catch (error) {
        console.error('Failed to load score from AsyncStorage', error);
      }
    };
    loadScore();
  }, []);

  // Update the current tier when the score changes
  useEffect(() => {
    updateCurrentTier(score);
  }, [score]);

  const updateCurrentTier = (score) => {
    const tier = tiers.find((tier) => score >= tier.min && score <= tier.max);
    if (tier) setCurrentTier(tier);
  };

  const handleTieringPage = () => {
    // Navigate to the Tiering Page
    setIsGameStarted('TieringPage');
  };

  useEffect(() => {
    let animationDirection = 1; // 1 for right-to-left, -1 for left-to-right
  
    const animateBackground = () => {
      Animated.timing(backgroundAnim, {
        toValue: animationDirection,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }).start(() => {
        animationDirection *= -1;
        animateBackground();
      });
    };
  
    animateBackground();
  }, [backgroundAnim]);
  
  const translateX = backgroundAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [2, 0, -IMAGE_WIDTH],
  });
  
  const handleContinentSelection = (continent) => {
    setSelectedContinent(continent);
    setIsGameStarted(true);
  };

  const shuffledFlashcards = useMemo(
    () => shuffleArray(animalsByContinent[selectedContinent] || []),
    [selectedContinent]
  );

  useEffect(() => {
    if (shuffledFlashcards.length > 0) {
      const currentFlashcard = shuffledFlashcards[currentCard];
      const allChoices = shuffledFlashcards.map((card) => card.name);
      const incorrectChoices = allChoices.filter((choice) => choice !== currentFlashcard.name);
      const randomIncorrectChoices = shuffleArray(incorrectChoices).slice(0, 3);
      setRandomizedChoices(shuffleArray([currentFlashcard.name, ...randomIncorrectChoices]));
      setCorrectAnswer(currentFlashcard.name); 
    }
  }, [currentCard, shuffledFlashcards]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showFunFact ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [showFunFact, fadeAnim]);

  // Save score to AsyncStorage whenever it changes
  useEffect(() => {
    const saveScore = async () => {
      try {
        await AsyncStorage.setItem('score', score.toString());
      } catch (error) {
        console.error("Failed to save score to AsyncStorage", error);
      }
    };
    saveScore();
  }, [score]);

  const playSound = async (soundFile) => {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
  };

  const handleAnswerSelection = (answer) => {
    if (confirmedAnswer) return;
    setSelectedAnswer(answer);
  };

  const confirmAnswer = () => {
    if (!selectedAnswer) return;
    setConfirmedAnswer(true);
    const currentFlashcard = shuffledFlashcards[currentCard];
    if (selectedAnswer === correctAnswer) {
      const points = currentFlashcard.difficulty === 'Hard' ? 4 : 1;
      setScore(score + points);
      playSound(require('./assets/sounds/correct.mp3'));
    } else {
      if (score > 0) setScore(score - 1);
      playSound(require('./assets/sounds/wrong.mp3'));
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const showNextCard = () => {
    setSelectedAnswer(null);
    setConfirmedAnswer(false);
    setCurrentCard((prev) => (prev + 1) % shuffledFlashcards.length);
    refreshImage(); // Force re-render of the image
  };
  
  const shakeStyle = {
    transform: [{ translateX: shakeAnim }],
  };

  const getButtonStyle = (choice) => {
    if (!confirmedAnswer) {
      return selectedAnswer === choice ? styles.selectedButton : styles.answerButton;
    }
    if (confirmedAnswer) {
      if (choice === correctAnswer) return [styles.answerButton, styles.correctButton];
      if (choice === selectedAnswer) return [styles.answerButton, styles.wrongButton];
    }
    return styles.answerButton;
  };

  // ---------------------------
  // Render different pages based on state
  // ---------------------------
  
  if (isGameStarted === 'TieringPage') {
    // Tiering Page
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Animated.View style={[styles.backgroundContainer, { transform: [{ translateX }] }]}>
            <Image source={require('./assets/wallpapers/background.png')} style={styles.backgroundImage} />
            <Image source={require('./assets/wallpapers/background.png')} style={styles.backgroundImage} />
            <Image source={require('./assets/wallpapers/background.png')} style={styles.backgroundImage} />
            <Image source={require('./assets/wallpapers/background.png')} style={styles.backgroundImage} />
          </Animated.View>
          {tiers.map((tier, index) => (
            <View key={index} style={styles.tierItem}>
              <Text style={styles.tierText}>
                {tier.name} {tier.emoji}
              </Text>
              <Text style={styles.tierRange}>
                {tier.min}–{tier.max} points
              </Text>
            </View>
          ))}
          <TouchableOpacity style={styles.backButton} onPress={() => setIsGameStarted(false)}>
            <Text style={styles.backButtonText}> Back </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (!isGameStarted) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
        <View style={styles.container}>
          <Animated.View style={[styles.backgroundContainer, { transform: [{ translateX }] }]}>
            <Image source={require('./assets/wallpapers/background.png')} style={styles.backgroundImage} />
            <Image source={require('./assets/wallpapers/background.png')} style={styles.backgroundImage} />
            <Image source={require('./assets/wallpapers/background.png')} style={styles.backgroundImage} />
            <Image source={require('./assets/wallpapers/background.png')} style={styles.backgroundImage} />
          </Animated.View>
          <TouchableOpacity style={styles.tierButton} onPress={handleTieringPage}>
            <Image 
              source={require('./assets/icons/lionn.png')}
              style={styles.continentIcon} 
            />
            <Text style={styles.tierButtonText}> View Levels</Text>
          </TouchableOpacity>
          <Image 
            source={require('./assets/wallpapers/logo.png')} 
            style={styles.logo} 
          />
          <Text style={[{ fontFamily: 'BubblegumSans', color: '#FFF' }]}>
            Current Level: {currentTier.name} {currentTier.emoji}
          </Text>
          <Text style={styles.subtitle}>
            Select a continent:
          </Text>
          {Object.keys(animalsByContinent).map((continent) => (
            <TouchableOpacity
              key={continent}
              style={styles.continentButton}
              onPress={() => handleContinentSelection(continent)}
            >
              <Image source={continentIcons[continent]} style={styles.continentIcon} />
              <Text style={[styles.buttonText, { fontFamily: 'BubblegumSans' }]}>{continent}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    );
  }

  const currentFlashcard = shuffledFlashcards[currentCard];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <View style={styles.container}>
        <Animated.View style={[styles.backgroundContainer, { transform: [{ translateX }] }]}>
          <Image source={require('./assets/wallpapers/background.png')} style={styles.backgroundImage} />
          <Image source={require('./assets/wallpapers/background.png')} style={styles.backgroundImage} />
          <Image source={require('./assets/wallpapers/background.png')} style={styles.backgroundImage} />
          <Image source={require('./assets/wallpapers/background.png')} style={styles.backgroundImage} />
        </Animated.View>

        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.menuButton} onPress={() => setIsGameStarted(false)}>
              <Icon name="bars" size={30} color="#000" />
            </TouchableOpacity>
            <View style={styles.scoreBox}>
              <MaterialIcons name="account-balance-wallet" size={40} color="#fff" />
              <Text style={[styles.scoreText, { fontFamily: 'BubblegumSans' }]}>{score}</Text>
            </View>
            <TouchableOpacity style={styles.funFactButton} onPress={() => setShowFunFact(!showFunFact)}>
              <Text style={styles.funFactButtonText}>Fun Fact</Text>
            </TouchableOpacity>
          </View>

          <Animated.View style={[styles.flashcard, confirmedAnswer && currentFlashcard.name !== selectedAnswer ? shakeStyle : null]}>
            <Image 
              key={`${currentCard}-${imageKey}`} 
              source={currentFlashcard.image} 
              style={styles.cardImage} 
            />
            <Text style={[styles.difficultyText, { fontFamily: 'BubblegumSans' }]}>Difficulty:</Text>
            <View style={[styles.difficultyCircle, { backgroundColor: getDifficultyColor(currentFlashcard.difficulty) }]} />
            <TouchableOpacity style={styles.refreshButton} onPress={refreshImage}>
              <MaterialIcons name="refresh" size={24} color="#FFF" />
            </TouchableOpacity>
          </Animated.View>

          {showFunFact && (
            <Animated.View style={[styles.funFactPopup, { opacity: fadeAnim }]}>
              <Text style={styles.funFactText}>{currentFlashcard.funFact}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowFunFact(false)}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          <View style={styles.answerButtons}>
            {randomizedChoices.map((choice, index) => (
              <TouchableOpacity
                key={index}
                style={getButtonStyle(choice)}
                onPress={() => handleAnswerSelection(choice)}
              >
                <Text style={[styles.answerText, { fontFamily: 'BubblegumSans' }]}>{choice}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={confirmedAnswer ? showNextCard : confirmAnswer}
          >
            <Text style={[styles.nextButtonText, { fontFamily: 'BubblegumSans' }]}>
              {confirmedAnswer ? 'Next' : 'Confirm'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}