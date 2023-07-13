import { Flex, ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
export default function Button({ value, rightAnswer, reset, score, disable }) {
  useEffect(() => {
    useStyle("#270c18");
  }, [reset]);
  function answer() {
    score(value == rightAnswer ? true : false);
    value == rightAnswer ? useStyle("#8fb3ff") : useStyle("#ed78ab");
  }
  const [style, useStyle] = useState();
  return (
    <Flex bg="pink.200" rounded="xl" w="35%" h="35%">
      <Flex
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, background: style }}
        whileHover={{
          scale: 1.3,
          borderRadius: "10px",
          rotate: [0, 30, -30, 0],
        }}
        whileTap={{ scale: 0.8 }}
        onClick={disable ? undefined : answer}
        textAlign="center"
        fontSize="lg"
        w="100%"
        h="100%"
        justifyContent="center"
        alignItems="center"
        cursor="pointer"
      >
        {value}
      </Flex>
    </Flex>
  );
}
