import { Button, Stack, Container, Text } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import { useState } from 'react'
import UserGrid from './components/UserGrid'

export const BACKEND_API_URL = import.meta.env.MODE === "development" ? "http://127.0.0.1:5000/api" : "/api";

function App() {
  const [users, setUsers] = useState([])
  return (
    <>
      <Stack minH={"100vh"}>
        <Navbar setUsers={setUsers} />

        <Container maxW={"100vw"} my={4}>
          <Text fontWeight={'bold'} letterSpacing={'2px'} textTransform={'uppercase'}
            textAlign={'center'} mb={8} fontSize={{ base: '3xl', md: '50' }}
          >
            <Text as={'span'} bgGradient={'linear(to-r, cyan.400, blue.500)'} bgClip={'text'}>My Besties</Text>
          </Text>

          <UserGrid users={users} setUsers={setUsers} />
        </Container>
      </Stack >
    </>
  )
}

export default App
