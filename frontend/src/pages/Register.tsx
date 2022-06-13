import { useState, useEffect } from "react";
import { Container, Button, Text, Divider, Link, Flex, Hide, Show, Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription, } from '@chakra-ui/react'
import toast, { Toaster } from 'react-hot-toast';


import {useAppSelector, useAppDispatch} from '../app/hooks'
import { reset } from '../features/auth/authSlice'


import Form from '../components/Register/Form'

const Register = () => {

  const { user, isLoading, isError, isSuccess, message } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reset())

    let loadingToast

    if(isLoading) {
      console.log('loading is at ' + isLoading);
      
      loadingToast = toast.loading('Loading');
    }

    if(isError) {
      toast.dismiss(loadingToast)
      toast.error(message);
    }

    if(isSuccess) {
      toast.dismiss(loadingToast)
      toast.success(message);
    }



  }, [user, isLoading, isError, isSuccess, message, dispatch])
  
  return (
    <Container maxW={{ base: "306px", xl: "1024px"}} px={0}>
      <Flex flexDirection={{ base: "column", xl: "row"}} height="100vh" align="center" justify={{ base:"center", xl:"space-between" }}>
        

        <Show above="xl">
          <Flex direction="column" align="center" justify="center">
            <Text color="brand.mainDark" fontSize="32px" fontWeight="bold" mb={10}>Create a new account</Text>
            <Text textAlign="center" fontSize="16px">
              Already have an account? <br />
              Click <Link href="/login" fontWeight="bold" color="brand.blue">here</Link> to login
            </Text>
          </Flex>

          <Divider orientation='vertical' height="500px" />
          <Form />
        </Show>


        <Hide above="xl">
          <Text color="brand.mainDark"fontSize="24px" fontWeight="bold" mb={20}>Create a new account</Text>
          <Form />
          <Divider mt={10} />
          <Text textAlign="center" fontSize="15px" mt={10}>
            Already have an account? <br />
            Click <Link href="/login" fontWeight="bold" color="brand.blue">here</Link> to login
          </Text>
        </Hide>


      </Flex>
      <Toaster />
    </Container>
  )
}

export default Register