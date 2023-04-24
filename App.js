import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import physics from './physics';
import { GameEngine } from 'react-native-game-engine';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import entities from './entities/index';
import Images from './Images';
import Constants from './Constants';

export default function App() {
  const [gameEngine, setGameEngine] = useState(null);

  const [running, setRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [score, setScore] = useState(0);
  // const [prevScore, setPrevScore] = useState(0);
  const [collisionOccurred, setCollisionOccurred] = useState(false);
  const [buttonOpacityLeft, setButtonOpacityLeft] = useState(0.9);
  const [buttonOpacityRight, setButtonOpacityRight] = useState(0.9);

  const handlePressInLeft = () => {
    const id = setInterval(
      () => gameEngine.dispatch({ type: 'move-left' }),
      40
    );
    setIntervalId(id);
    setButtonOpacityLeft(0.5);
  };

  const handlePressInRight = () => {
    const id = setInterval(
      () => gameEngine.dispatch({ type: 'move-right' }),
      40
    );
    setIntervalId(id);
    setButtonOpacityRight(0.5);
  };

  const handlePressOut = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setButtonOpacityLeft(0.9);
    setButtonOpacityRight(0.9);
  };

  const handleCollision = () => {
    if (!collisionOccurred) {
      setCollisionOccurred(true);
      setTimeout(() => setCollisionOccurred(false), setScore(score + 1), 0);
    }
  };

  // useEffect(() => {
  //   setPrevScore(score);
  // }, [score]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={Images.background}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />

      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        systems={[physics]}
        entities={entities()}
        style={styles.gameContainer}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case 'score':
              handleCollision();
              break;
            case 'game_over':
              setRunning(false);
              gameEngine.stop();
              break;
          }
        }}>
        <StatusBar style="auto" hidden={true} />
      </GameEngine>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>
      <View>
        <View>
          <TouchableOpacity
            onPressIn={handlePressInLeft}
            onPressOut={handlePressOut}
            style={[styles.buttonleft, { opacity: buttonOpacityLeft }]}>
            <View>
              <Text>Left</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            onPressIn={handlePressInRight}
            onPressOut={handlePressOut}
            style={[styles.buttonright, { opacity: buttonOpacityRight }]}>
            <View>
              <Text>Right</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {!running ? (
        <View style={styles.welcomeScreenContainer}>
          <Image
            source={Images.welcomeScreen}
            style={styles.welcomeScreenImg}
            resizeMode="stretch"
          />
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => {
              setRunning(true);
              setScore(0);
            }}>
            <Text style={styles.startButtonText}>START GAME</Text>
          </TouchableOpacity>
          <Text style={styles.scoreText}>Score: {score}</Text>
          <Text style={styles.nameText}>By Stipnek Artem</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#ecf0f1',
  },
  gameContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },

  welcomeScreenContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  welcomeScreenImg: {
    position: 'absolute',
    width: Constants.SCREEN_WIDTH,
    height: Constants.SCREEN_HEIGHT,
    alignItems: 'center',
  },

  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.WINDOW_WIDTH,
    height: Constants.WINDOW_HEIGHT,
  },

  startButton: {
    left: 0,
    top: Constants.WINDOW_WIDTH / 2.3,
    right: 0,
    bottom: 0,
    borderWidth: 3,
    borderRadius: 20 / 2,
    borderColor: 'white',
    padding: 25,
    alignItems: 'center',
  },

  startButtonText: {
    fontSize: 26,
    fontWeight: 'bold',
  },

  scoreContainer: {
    position: 'absolute',
    width: Constants.WINDOW_WIDTH / 3,
    height: Constants.WINDOW_HEIGHT / 16,
    alignItems: 'center',
  },

  scoreText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'yellow',
  },

  nameText: {
    position: 'absolute',
    bottom: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#87CEEB',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  buttonleft: {
    left: '-120%',
    top: '90%',
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderRadius: 20 / 2,
    borderColor: 'white',
    padding: 35,
    alignItems: 'center',
    opacity: 0.4,
  },
  buttonright: {
    left: '120%',
    top: '-10%',
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderRadius: 20 / 2,
    borderColor: 'white',
    padding: 35,
    alignItems: 'center',
    opacity: 0.4,
  },
});
