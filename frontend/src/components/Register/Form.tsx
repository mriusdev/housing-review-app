import {FC} from 'react'
import { Input, Flex, Button } from '@chakra-ui/react'

interface Props {

}

const Form:FC<Props> = () => {
  return (
    <Flex flexDirection="column" width={{base: "100%", xl: "306px"}} rowGap={14}>
      <Flex flexDirection="column" rowGap={4}>
        <Input focusBorderColor="brand.blue" borderColor="#2d27278a" bg="#5b8ff30d" placeholder='Name' height="45px" color="brands.mainDark" />
        <Input type="email" focusBorderColor="brand.blue" borderColor="#2d27278a" bg="#5b8ff30d" placeholder='Email' height="45px" color="brands.mainDark"/>
        <Input type="password" focusBorderColor="brand.blue" borderColor="#2d27278a" bg="#5b8ff30d" placeholder='Password' height="45px" color="brands.mainDark"/>
        <Input type="password" focusBorderColor="brand.blue" borderColor="#2d27278a" bg="#5b8ff30d" placeholder='Confirm password' height="45px" color="brands.mainDark"/>
      </Flex>

      <Button colorScheme="yellow" fontWeight="semibold" fontSize="17px" color="brands.mainDark">Register</Button>
    </Flex>
  )
}

export default Form