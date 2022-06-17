import { useState } from "react";
import { Container, Box, Text, Flex, Icon } from "@chakra-ui/react";
import { VscEdit } from 'react-icons/vsc';
import { MdOutlineCancel } from 'react-icons/md';

import {useAppSelector, useAppDispatch} from '../app/hooks'
import { toggleEdit } from '../features/profile/privateProfileSlice'
import EditFields from '../components/PrivateProfile/EditFields' 

interface IEditMode {
  isEdit: boolean;
}

const Customize = () => {
  const { isEdit } = useAppSelector((state) => state.privateProfile)

  const [edit, setEdit] = useState<IEditMode>({
    isEdit
  })

  const [mockData, setMockData] = useState<{name: string; email: string; institution: string}>({
    name: "Andrius M",
    email: 'andrius@mgma.com',
    institution: 'Kauno Kolegija'
  })

  const { name, email, institution } = mockData

  const dispatch = useAppDispatch()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMockData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <>
      <Flex bg="brand.orange" direction="column" justify="center" align="center" width="100vw" height="30vh" borderBottom="4px" borderColor={ isEdit ? "brand.purple" : "brand.blue" } >
        <Flex width="306px" height="100%" direction="column" align="center" justify="center" pos="relative">
          <Text fontWeight="bold" fontSize="24px" color="brand.mainDark" py={2}>Profile Settings</Text>
          <Text textAlign="center" lineHeight="16px" fontSize="13px" color="brand.mainDark">Created at: <br />
            2022 - 02 - 03
          </Text>

          <Flex cursor="pointer" align="center" justify="center" bg={ isEdit ? "brand.purple" : "brand.blue" } borderRadius="50%" pos="absolute" right="0" bottom="-7" padding={4} onClick={() => dispatch(toggleEdit())}>
            <Icon as={ isEdit ? MdOutlineCancel : VscEdit} height="24px" width="24px" />
          </Flex>

        </Flex>

      </Flex>
      <Container maxWidth="306px" padding={0} mt={10}>
        <Flex direction="column" rowGap={16}>
          { isEdit ? (
            <EditFields name={name} email={email} institution={institution} onChange={onChange} />
          ): (
            <Flex direction="column" rowGap={4}>
              <Flex direction="column">
                <Text fontSize="15px" fontWeight="bold">Name</Text>
                <Text fontSize="15px" color="gray.400">{name}</Text>
              </Flex>

              <Flex direction="column">
                <Text fontSize="15px" fontWeight="bold">Email</Text>
                <Text fontSize="15px" color="gray.400">{email}</Text>
              </Flex>

              <Flex direction="column">
                <Text fontSize="15px" fontWeight="bold">Institution</Text>
                <Text fontSize="15px" color="gray.400">{institution}</Text>
              </Flex>
            </Flex>
          )}
          

          <Flex columnGap={3}>
            <Flex align="center" justify="center">
              <Icon as={VscEdit} />
            </Flex>
            <Text lineHeight="16px" fontSize="13px" color="brand.mainDark">
              Updated at: <br />
              2022 - 02 - 03
            </Text>
          </Flex>
        </Flex>
        
      </Container>
    </>
  );
};

export default Customize;
