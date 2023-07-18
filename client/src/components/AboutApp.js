import { Box, Container, Flex, HStack, Heading, Text, Image } from "@chakra-ui/react";
import about_app_img from "../assets/about_app.svg"
import Footer from "./Footer";

const AboutApp = () => {
    return (
        <div>
<Flex height="100vh" justifyContent={"space-around"}>
            {/* Left half of the screen */}
            <Box flex={["0", "1", "1", "1"]} p={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100vh"
            >
                <Box position="relative" maxWidth="70%" width="auto">
                    <Image
                        src={about_app_img}
                        alt="Image Description"
                    />
                </Box>
            </Box>
            <Box flex={["1", "3/4", "3/4", "3/4"]} display="flex" flexDirection={"column"}
                alignItems="center"
                height="max-content"
                mt={"auto"} mb={"auto"}>
                {/* Right half of the screen */}
                <Heading as="h1" size="xl" mb={4} color={"purple.600"}>
                    About App
                </Heading>
                <Text fontSize="lg" p={20}>
                    Motion is a revolutionary web application designed to transform the way college mini-projects are executed and evaluated. Recognizing the lack of coordination and transparency in the current coursework process, our team set out to develop a software solution that would streamline and enhance the entire experience.

                    At Motion, we believe that collaboration, transparency, and automation are the cornerstones of successful project management and evaluation. Our web application empowers college authorities, project managers, guides, and developers alike to seamlessly coordinate, monitor, and assess mini-projects. With Motion, the future of coursework execution is transformed, bringing efficiency, accountability, and a true developer's experience to the forefront.
                </Text>
            </Box>
        </Flex>
        <Footer/>
        </div>
        

    );
};

export default AboutApp;
