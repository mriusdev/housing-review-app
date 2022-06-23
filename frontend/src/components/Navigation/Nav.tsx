import { Container, Text, Flex, Icon, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import './nav.css'

const Nav = () => {
  return (
    <div className="nav-sticky">
      <Container display={{base: "none", md: "block"}} maxWidth="1024px" borderRadius="10px" bg="brand.mainDark" px="20px" py="10px">
        <Flex justify="space-between" align="center">
          <Link to="/">
            <Text color="white" fontWeight="semibold">
              Home
            </Text>
          </Link>
          
          <Flex columnGap="15px">
            <Link to="/customize">
              <Text color="white" fontWeight="semibold">
                Profile
              </Text>
            </Link>

            <Link to="/register">
              <Text color="white" fontWeight="semibold">
                Register
              </Text>
            </Link>

            <Link to="/login">
              <Text color="white" fontWeight="semibold">
                Login
              </Text>
            </Link>
            
          </Flex>
        </Flex>
      </Container>
    </div>
  )
}

export default Nav