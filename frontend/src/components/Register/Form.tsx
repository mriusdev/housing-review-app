import { Input, Flex, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import {useAppSelector, useAppDispatch} from '../../app/hooks'
import { register, reset } from '../../features/auth/authSlice'


interface IFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const Form = () => {
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const { name, email, password, passwordConfirm } = formData

  const dispatch = useAppDispatch()

  const { user, isLoading, isError, isSuccess, message } = useAppSelector((state) => state.auth)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }))
  }

  const registerUser = () => {
    if (password !== passwordConfirm) {
      // handleError
    } else {
      const processedFormData = {
        name,
        email,
        password
      }
      dispatch(register(processedFormData))
    }
  }

  return (
    <Flex
      flexDirection="column"
      width={{ base: "100%", xl: "306px" }}
      rowGap={14}
    >
      <Flex flexDirection="column" rowGap={4}>
        <Input
          focusBorderColor="brand.blue"
          borderColor="#2d27278a"
          bg="#5b8ff30d"
          placeholder="Name"
          name="name"
          value={name}
          height="45px"
          color="brands.mainDark"
          onChange={onChange}
        />
        <Input
          type="email"
          focusBorderColor="brand.blue"
          borderColor="#2d27278a"
          bg="#5b8ff30d"
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
          placeholder="Password"
          name="password"
          value={password}
          height="45px"
          color="brands.mainDark"
          onChange={onChange}
        />
        <Input
          type="password"
          focusBorderColor="brand.blue"
          borderColor="#2d27278a"
          bg="#5b8ff30d"
          placeholder="Confirm password"
          name="passwordConfirm"
          value={passwordConfirm}
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
        onClick={registerUser}
      >
        Register
      </Button>
    </Flex>
  );
};

export default Form;
