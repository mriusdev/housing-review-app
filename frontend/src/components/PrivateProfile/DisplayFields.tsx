import { Text, Flex } from "@chakra-ui/react";


interface IProps {
  name?: string;
  email?: string;
  institution?: string;
}

const DisplayFields = ({name, email, institution}: IProps) => {
  return (
    <Flex direction="column" rowGap={4}>
      <Flex direction="column">
        <Text fontSize="15px" fontWeight="bold">
          Name
        </Text>
        <Text fontSize="15px" color="gray.400">
          {name}
        </Text>
      </Flex>

      <Flex direction="column">
        <Text fontSize="15px" fontWeight="bold">
          Email
        </Text>
        <Text fontSize="15px" color="gray.400">
          {email}
        </Text>
      </Flex>

      <Flex direction="column">
        <Text fontSize="15px" fontWeight="bold">
          Institution
        </Text>
        <Text fontSize="15px" color="gray.400">
          {institution}
        </Text>
      </Flex>
    </Flex>
  )
}

export default DisplayFields