import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Flex, Text, Button } from "@chakra-ui/react";
import { useState } from "react";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Customize from "./pages/Customize";

function App() {
  const [displayHamburger, setDisplayHamburger] = useState<string>("none");

  return (
    <>
      <BrowserRouter>
        <Flex
          width="100vw"
          align="center"
          justify="flex-end"
          position="absolute"
          px={5}
          py={5}
          display={{ base: "flex", md: "none" }}
        >
          <Button onClick={() => setDisplayHamburger("flex")}>Menu</Button>
        </Flex>

        <Flex
          pos="fixed"
          top="0"
          left="0"
          bg="white"
          height="100vh"
          width="100vw"
          zIndex={20}
          direction="column"
          display={displayHamburger}
          rowGap={5}
        >
          <Flex justify="flex-end" my={5} mx={5}>
            <Button onClick={() => setDisplayHamburger("none")}>Close nav</Button>
          </Flex>
          <Link to="/">
            <Button colorScheme='teal' variant='outline' mx={5}>
              Home
            </Button>
          </Link>
          <Link to="/login">
            <Button colorScheme='teal' variant='outline' mx={5}>
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button colorScheme='teal' variant='outline' mx={5}>
              Register
            </Button>
          </Link>
        </Flex>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customize" element={<Customize />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
