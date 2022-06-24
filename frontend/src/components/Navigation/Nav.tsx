import { Container, Text, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import './nav.css'
import { useAppDispatch } from "../../app/hooks";
import { logout, reset } from "../../features/auth/authSlice"
import { IUser } from '../../features/auth/authSlice'

interface Props {
  isUserFound: IUser | null
}

const Nav = ({isUserFound}:Props) => {
  const dispatch = useAppDispatch()
  const logoutOperations = () => {
    dispatch(logout())
    dispatch(reset())
  }
  return (
    <div className="nav-custom">
      <Container display={{base: "none", md: "block"}} maxWidth="1024px" borderRadius="10px" px="20px" py="10px">
        <Flex justify="space-between" align="center">
          <Link to="/">
            <Text color="brand.mainDark" fontWeight="semibold">
              Home
            </Text>
          </Link>
          
          <Flex columnGap="15px">
            {isUserFound ?
              <>
                <Link to="/customize">
                  <Text color="brand.mainDark" fontWeight="semibold">
                    Profile
                  </Text>
                </Link>
                <Text color="brand.mainDark" fontWeight="semibold" onClick={logoutOperations}>
                  Sign Out
                </Text>
              </>
              :
              <>
                <Link to="/register">
                  <Text color="brand.mainDark" fontWeight="semibold">
                    Register
                  </Text>
                </Link>

                <Link to="/login">
                  <Text color="brand.mainDark" fontWeight="semibold">
                    Login
                  </Text>
                </Link>
              </>
            }
          </Flex>
        </Flex>
      </Container>
    </div>
  )
}

export default Nav