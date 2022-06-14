import { useEffect } from 'react';
import { Container, Text, Divider, Link, Flex, Hide, Show } from '@chakra-ui/react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

import {useAppSelector, useAppDispatch} from '../app/hooks'
import { reset } from '../features/auth/authSlice'
import LoginForm from '../components/Login/LoginForm'

const Login = () => {
  const { user, isLoading, isError, isSuccess, message } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
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
      navigate('/')
    }

    dispatch(reset())

  }, [user, isLoading, isError, isSuccess, message, dispatch, navigate])
  return (
    <Container height="100vh" maxW={{ base: "306px", xl: "351"}} px={0}>
      <Flex direction="column" height="85%" justify="center" align="center">
        <Text color="brand.mainDark" fontSize={{ base: "24px", xl:"32px" }} fontWeight="bold" mb={16}>
          Login to account
        </Text>
        <LoginForm />
        <Divider mt={10} width="250px" />
        <Text textAlign="center" fontSize="15px" mt={10}>
          Don't have an account? <br />
          Click <Link href="/register" fontWeight="bold" color="brand.blue">here</Link> to register
        </Text>
      </Flex>
      <Toaster />
    </Container>
  )
}

export default Login