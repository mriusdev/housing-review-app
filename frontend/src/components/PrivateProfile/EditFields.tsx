import React from 'react'
import { Container, Box, Text, Flex, Icon, Button, Input } from "@chakra-ui/react";

interface IProps {
  name?: string;
  email?: string;
  institution?: string;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditFields = ({ name, email, institution, onClick, onChange }: IProps) => {
  return (
    <>
      <Flex direction="column" rowGap={4}>
        <Flex direction="column">
          <Text fontSize="15px" fontWeight="bold">Name</Text>
          {/* <Text fontSize="15px" color="gray.400">this is an edit field</Text> */}
          <Input
            type="text"
            focusBorderColor="brand.blue"
            borderColor="#2d27278a"
            bg="#5b8ff30d"
            fontSize={{ base: "15px", xl: "14px"}}
            placeholder={name}
            name="name"
            value={name}
            height="33px"
            color="brands.mainDark"
            onChange={onChange}
          />
        </Flex>

        <Flex direction="column">
          <Text fontSize="15px" fontWeight="bold">Email</Text>
          {/* <Text fontSize="15px" color="gray.400">asdasd@gmail.com</Text> */}
          <Input
            type="email"
            focusBorderColor="brand.blue"
            borderColor="#2d27278a"
            bg="#5b8ff30d"
            fontSize={{ base: "15px", xl: "14px"}}
            placeholder={email}
            name="email"
            value={email}
            height="33px"
            color="brands.mainDark"
            onChange={onChange}
          />
        </Flex>

        <Flex direction="column">
          <Text fontSize="15px" fontWeight="bold">Institution</Text>
          {/* <Text fontSize="15px" color="gray.400">ddd Kolegija</Text> */}
          <Input
            type="text"
            focusBorderColor="brand.blue"
            borderColor="#2d27278a"
            bg="#5b8ff30d"
            fontSize={{ base: "15px", xl: "14px"}}
            placeholder={institution}
            name="institution"
            value={institution}
            height="33px"
            color="brands.mainDark"
            onChange={onChange}
          />
        </Flex>
      </Flex>

      <Button
        colorScheme="yellow"
        fontWeight="bold"
        fontSize="15px"
        color="brands.mainDark"
        width="100%"
        onClick={onClick}
      >
        Save Changes
      </Button>
    </>
  )
}

export default EditFields