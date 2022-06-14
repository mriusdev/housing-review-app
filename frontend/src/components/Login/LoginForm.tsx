import { Input, Flex, Button } from "@chakra-ui/react";
import { useState } from "react";

import {useAppDispatch} from '../../app/hooks'
import { login } from '../../features/auth/authSlice'

interface IFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: ""
  })

  const { email, password } = formData

  const dispatch = useAppDispatch()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }))
  }

  const loginUser = () => {
    dispatch(login(formData))
  }
  return (
    <Flex
      flexDirection="column"
      width={{ base: "100%", xl: "351px" }}
      rowGap={14}
      align="center"
    >
      <Flex flexDirection="column" rowGap={4} width="100%">
        <Input
          type="email"
          focusBorderColor="brand.blue"
          borderColor="#2d27278a"
          bg="#5b8ff30d"
          fontSize={{ base: "13px", xl: "14px"}}
          placeholder="Email"
          name="email"
          value={email}
          height="45px"
          color="brands.mainDark"
          onChange={onChange}
        />
        <Input
          type="password"
          focusBorderColor="brand.blue"
          borderColor="#2d27278a"
          bg="#5b8ff30d"
          fontSize={{ base: "13px", xl: "14px"}}
          placeholder="Password"
          name="password"
          value={password}
          height="45px"
          color="brands.mainDark"
          onChange={onChange}
        />
      </Flex>

      <Button
        colorScheme="yellow"
        fontWeight="semibold"
        fontSize="17px"
        color="brands.mainDark"
        width="100%"
        onClick={loginUser}
      >
        Login
      </Button>
    </Flex>
  )
}

export default LoginForm