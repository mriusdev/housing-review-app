import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Flex, Button, Container } from "@chakra-ui/react";
import { useState } from "react";

import { useAppSelector, useAppDispatch } from "./app/hooks";
import { logout, reset } from './features/auth/authSlice'
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CustomizeProfile from "./pages/CustomizeProfile";
import Nav from "./components/Navigation/Nav";
import Protected from "./components/Protected";
import CreateReview from "./pages/CreateReview";

function App() {
  const [displayHamburger, setDisplayHamburger] = useState<string>("none");

  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch()

  const logoutOperations = () => {
    dispatch(logout())
    dispatch(reset())
    setDisplayHamburger("none")
  }
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
          zIndex={20}
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
          align="center"
        >
          <Flex justify="flex-end" my={5} px={5} width="100%">
            <Button onClick={() => setDisplayHamburger("none")}>Close nav</Button>
          </Flex>

            <Link to="/" onClick={() => setDisplayHamburger("none")}>
              <Button width="306px" colorScheme='teal' variant='outline' mx={5}>
                Home
              </Button>
            </Link>
            {user ? 
              <>
                <Button width="306px" colorScheme='teal' onClick={logoutOperations} variant='outline' mx={5}>
                  Sign Out
                </Button>

                <Link to="/customize" onClick={() => setDisplayHamburger("none")}>
                  <Button colorScheme='teal' width="306px" variant='outline' mx={5}>
                    Profile
                  </Button>
                </Link>

                <Link to="/create-review" onClick={() => setDisplayHamburger("none")}>
                  <Button colorScheme='teal' width="306px" variant='outline' mx={5}>
                    Create Review
                  </Button>
                </Link>
              </>
              :
              <>
                <Link to="/login" onClick={() => setDisplayHamburger("none")}>
                  <Button width="306px" colorScheme='teal' variant='outline' mx={5}>
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setDisplayHamburger("none")}>
                  <Button width="306px" colorScheme='teal' variant='outline' mx={5}>
                    Register
                  </Button>
                </Link>
              </>
            }

        </Flex>
          

        <Nav isUserFound={user}/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <Protected isUserFound={user}>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/customize"
            element={
              <Protected isUserFound={user}>
                <CustomizeProfile />
              </Protected>
            }
          />
          <Route
            path="/create-review"
            element={
              <Protected isUserFound={user}>
                <CreateReview />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
