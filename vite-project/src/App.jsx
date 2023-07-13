import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect } from "react";
import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import Button from "./Button_";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [question, useQuestion] = useState();
  const [answers, useAnswers] = useState([]);
  const [rightAnswer, useRightAnswer] = useState();
  const [reset, useReset] = useState(false);
  const [score, useScore] = useState(0);
  const [highScore, useHighScore] = useState(0);
  const [show, useShow] = useState(false);
  const [disable, useDisable] = useState(false);
  const [continueDisabled, useContinueDisabled] = useState(false);
  const [friendOnThePhone, useFriendOnThePhone] = useState();
  const [showPhone, useShowPhone] = useState(false);
  //main function
  function main_Function() {
    useContinueDisabled(true);
    useReset(!reset);
    useDisable(false);
    fetch("https://opentdb.com/api.php?amount=1")
      .then((resolve) => {
        return resolve.json();
      })
      .then(
        (resolve) => {
          console.log(resolve);
          let arrayOfanswers = [
            ...resolve.results[0].incorrect_answers,
            resolve.results[0].correct_answer,
          ];
          useRightAnswer(resolve.results[0].correct_answer);
          useAnswers(shuffle(arrayOfanswers));
          useQuestion(resolve.results[0].question);
        }
        //resolve.results[0].category
      );
  }
  //function to hide window with right answer
  function continue_() {
    useShow(false);
    main_Function();
    return;
  }
  //function to calculate score + disabling buttons
  function score_(data) {
    if (data == true) {
      useScore(score + 1);
    } else {
      useScore(0);
      useShow(true);
    }
    useDisable(true);
    useContinueDisabled(false);
    return;
  }
  //function to fifty to fifty
  function fiftyToFifty() {
    //check if the question isnt yes no
    if (answers.length > 2) {
      let z = answers.indexOf(rightAnswer);
      let d = Math.floor(Math.random() * (4 - 0)) + 0;
      while (answers[d] == rightAnswer) {
        d = Math.floor(Math.random() * (4 - 0)) + 0;
      }
      // shuffle the 2 elements
      let random = Math.floor(Math.random() * (2 - 0)) + 0;
      if (!random) {
        let backup;
        backup = d;
        d = z;
        z = backup;
      }
      useAnswers([answers[z], answers[d]]);
      return;
    }
  }
  function friendOnThePhone_() {
    if (Math.random() < 0.5) {
      useFriendOnThePhone(rightAnswer);
    } else {
      answers.length == 4
        ? useFriendOnThePhone(answers[Math.floor(Math.random() * (4 - 0)) + 0])
        : useFriendOnThePhone(answers[Math.floor(Math.random() * (2 - 0)) + 0]);
    }
    useShowPhone(true);
    return;
  }
  //useEffect to highscore, if score changes then check
  useEffect(() => {
    if (score >= highScore) {
      useHighScore(score);
    }
  }, [score]);
  useEffect(main_Function, []);
  return (
    <>
      <ChakraProvider>
        <Flex
          bgGradient="linear(to-b, #1b0811, #3e1023)"
          w="100%"
          p={8}
          h="110vh"
          color="white"
          padding="8"
          justifyContent={"space-between"}
        >
          <Flex
            m="8"
            w="800px"
            h="600px"
            justifyContent="space-between"
            alignContent="space-between"
            wrap="wrap"
          >
            <Flex
              bg="#4e182f"
              w="45%"
              h="45%"
              justifyContent="center"
              alignItems="center"
              fontSize="5lg"
              borderRadius="xl"
            >
              Current score: {score}
            </Flex>
            <Flex
              borderRadius="xl"
              bg="#4e182f"
              w="45%"
              h="45%"
              justifyContent="center"
              alignItems="center"
              fontSize="5lg"
            >
              Highest score: {highScore}
            </Flex>
            <Flex
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{
                scale: 1.2,
                borderRadius: "10px",
                rotate: [0, 30, -30, 0],
              }}
              whileTap={{ scale: 0.8 }}
              bg="#4e182f"
              w="45%"
              h="45%"
              justifyContent="center"
              alignItems="center"
              fontSize="5lg"
              onClick={fiftyToFifty}
            >
              50/50
            </Flex>
            <Flex
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{
                scale: 1.2,
                borderRadius: "10px",
                rotate: [0, 30, -30, 0],
              }}
              whileTap={{ scale: 0.8 }}
              bg="#4e182f"
              onClick={friendOnThePhone_}
              w="45%"
              h="45%"
              justifyContent="center"
              alignItems="center"
              fontSize="5lg"
            >
              Friend on the phone
            </Flex>
          </Flex>
          <Box mr={8}>
            <Flex
              w="1100px"
              height="800"
              bg="#4e182f"
              marginLeft="auto"
              marginRight="auto"
              rounded="xl"
              padding="5"
              wrap="wrap"
            >
              <Flex
                w="90%"
                height="40%"
                bg="#270c18"
                marginLeft="auto"
                marginRight="auto"
                rounded="xl"
                justifyContent="center"
                alignItems="center"
                fontSize="2xl"
              >
                {question}
              </Flex>
              <Flex
                w="90%"
                height="55%"
                marginLeft="auto"
                marginRight="auto"
                rounded="xl"
                justifyContent="space-evenly"
                alignItems="space-evenly"
                alignContent="space-evenly"
                wrap="wrap"
                gap="10px"
              >
                {answers.map((item) => (
                  <Button
                    disable={disable}
                    score={score_}
                    reset={reset}
                    key={answers.indexOf(item)}
                    value={item}
                    rightAnswer={rightAnswer}
                  ></Button>
                ))}
              </Flex>
            </Flex>

            <Flex
              as={motion.div}
              onClick={continueDisabled ? undefined : main_Function}
              whileHover={{ scale: 1.1, borderRadius: "10px" }}
              w="1100px"
              height="100"
              bg="#4e182f"
              marginLeft="auto"
              marginRight="auto"
              rounded="xl"
              justifyContent="center"
              alignItems="center"
              marginTop="5"
              cursor="pointer"
              fontSize="3xl"
            >
              Continue
            </Flex>
          </Box>
          <AnimatePresence initial={false}>
            {show && (
              <Flex
                fontSize="9xl"
                as={motion.div}
                onClick={continue_}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                top="0"
                left="0"
                position="absolute"
                w="100%"
                h="100%"
                flexFlow="column"
                justifyContent="center"
                bgGradient="linear(to-b, #1b0811, #3e1023)"
              >
                Correct answer: {rightAnswer}
              </Flex>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showPhone && (
              <Flex
                onClick={() => {
                  useShowPhone(false);
                }}
                fontSize="9xl"
                as={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                top="0"
                left="0"
                position="absolute"
                w="100%"
                h="100%"
                bgGradient="linear(to-b, #1b0811, #3e1023)"
                flexFlow="column"
                justifyContent="center"
              >
                {friendOnThePhone}
              </Flex>
            )}
          </AnimatePresence>
        </Flex>
      </ChakraProvider>
    </>
  );
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

export default App;
