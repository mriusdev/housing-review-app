import { Input, Flex, Button, Text } from "@chakra-ui/react";
import { useState } from "react";

import {useAppDispatch} from '../../app/hooks'
import { register } from '../../features/auth/authSlice'


interface IFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface IWarningError {
  formField: string;
  warning: boolean;
  warningMsg: string;
}

const Form = () => {
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const [formWarning, setFormWarning] = useState<IWarningError>({
    formField: "",
    warning: false,
    warningMsg: ''
  })

  const { name, email, password, passwordConfirm } = formData

  const dispatch = useAppDispatch()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }))

    if(formWarning.warning && formWarning.formField === e.target.name) {
      setFormWarning({
        formField: "",
        warning: false,
        warningMsg: ""
      })
    }
  }

  const registerUser = () => {
    if (password !== passwordConfirm) {
      setFormWarning({
        formField: "password",
        warning: true,
        warningMsg: "Passwords must match"
      })

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
          fontSize={{ base: "13px", xl: "14px"}}
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
        <Input
          type="password"
          focusBorderColor="brand.blue"
          borderColor="#2d27278a"
          bg="#5b8ff30d"
          fontSize={{ base: "13px", xl: "14px"}}
          placeholder="Confirm password"
          name="passwordConfirm"
          value={passwordConfirm}
          height="45px"
          color="brands.mainDark"
          onChange={onChange}
        />
        {formWarning.warning && (
          <Text color="red.500" fontSize="sm" >
            {formWarning.warningMsg}
          </Text>
        )}
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
