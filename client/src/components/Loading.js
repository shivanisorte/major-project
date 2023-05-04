import React from "react";
import { Spinner, Box } from "@chakra-ui/react";

function Loading({ visibility }) {
  return visibility === true ? (
    <Box
      position={"fixed"}
      height={"100vh"}
      width={"100vw"}
      background={"rgba(0,0,0,0.1)"}
      zIndex={2}
    >
      <Spinner
        size="lg"
        position={"absolute"}
        left={"50%"}
        top={"40%"}
        color="blue.400"
      />
    </Box>
  ) : (
    <></>
  );
}

export default Loading;
