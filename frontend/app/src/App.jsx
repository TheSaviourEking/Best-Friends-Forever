import { Button, Stack, Container, Text } from '@chakra-ui/react'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Stack minH={"100vh"}>
        <Navbar />

        <Button>Hello</Button>

        <Container maxW={"100vw"} my={4}>
          <Text fontWeight={'bold'} letterSpacing={'2px'} textTransform={'uppercase'}
            textAlign={'center'} mb={8} fontSize={{ base: '3xl', md: '50' }}
          >
            <Text as={'span'} bgGradient={'linear(to-r, cyan.400, blue.500)'} bgClip={'text'}>My Besties</Text>
          </Text>
        </Container>
      </Stack >
    </>
  )
}

export default App
