import { useState } from "react";
import {
  Box,
  Button,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Tfoot,
  Spinner,
} from "@chakra-ui/react";
import proceedToNextPhase from "../../utils/proceedToNextPhase";

function getSchedule(setLoading, setSchedule) {
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    setSchedule(true);
  }, 2000);

  setLoading(true);
}

function Schedule({ toast, setCurrentPhase }) {
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState(false);
  return (
    <div>
      {" "}
      <Box height={["70vh", "70vh", "50vh", "50vh"]} textAlign="center">
        {loading === true ? (
          <Spinner color="purple"></Spinner>
        ) : schedule === false ? (
          <Button
            mt={["5rem", 5, 0, 0]}
            width={["80%", "60%", "40%", "20%"]}
            colorScheme="purple"
            onClick={() => {
              getSchedule(setLoading, setSchedule);
            }}
          >
            Get Schedule!
          </Button>
        ) : (
          <Box width={"50%"} m={"auto"}>
            <TableContainer>
              <Table variant="striped" colorScheme="purple">
                <TableCaption>
                  Teams whose presentation can be conducted at same time ti.
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th textAlign={"center"}>Time(ti)</Th>
                    <Th textAlign={"center"}>Teams</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td textAlign={"center"}>t1</Td>
                    <Td textAlign={"center"}>T1 T2 T3</Td>
                  </Tr>
                  <Tr>
                    <Td textAlign={"center"}>t2</Td>
                    <Td textAlign={"center"}>T4 T5</Td>
                  </Tr>
                  <Tr>
                    <Td textAlign={"center"}>t3</Td>
                    <Td textAlign={"center"}>T6 T7</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        )}
        <Button
          position={"absolute"}
          right={0}
          bottom={0}
          m={3}
          p={5}
          colorScheme="purple"
          variant={"solid"}
          onClick={() => proceedToNextPhase(toast, setCurrentPhase)}
        >
          Next
        </Button>
      </Box>
    </div>
  );
}

export default Schedule;
