import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/Input";
import BodyText from "../components/BodyText";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g), "");
  };
  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };
  const confirInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99",
        [{ text: "Okey", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
  };
  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <View>
        <TitleText style={styles.chosenNumberText}>Choosen Number</TitleText>
        <NumberContainer style={styles.text}><Text>{selectedNumber}</Text></NumberContainer>
      </View>
    );
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <TitleText style={styles.title}>Start a New Game!</TitleText>
        <Card style={styles.inputContainer}>
          <TitleText>Select a Number</TitleText>
          <Input
            blurOnSubmit
            autoCapitalize="none"
            maxLength={2}
            autoCorrect={false}
            keyboardType="number-pad"
            style={styles.input}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.buttonInputArea}>
              <Button
                color={Colors.accent}
                title="Reset"
                onPress={resetInputHandler}
              />
            </View>
            <View style={styles.buttonInputArea}>
              <Button
                color={Colors.primary}
                title="Confirm"
                onPress={confirInputHandler}
              />
            </View>
          </View>
          {confirmed === true ? (
            <View style={styles.confirmBox}>
              {confirmedOutput}
              <MainButton
                marginVertical={5}
                onPress={() => props.onStartGame(selectedNumber)}
              >Start Game</MainButton>
            </View>
          ) : null}
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  chosenNumber: {
    fontSize: 22,
    justifyContent: 'center',
    textAlign: 'center',
  },
  chosenNumberText:{
    marginVertical: 10
  },
  confirmBox: {
    marginVertical: 30,
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },
  text: {
    textAlign: "center",
    fontFamily: "open-sans",
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  buttonInputArea: {
    width: 100,
    marginHorizontal: 10,
  },
  input: {
    width: 50,
    marginVertical: 10,
    textAlign: "center",
  },
});

export default StartGameScreen;
