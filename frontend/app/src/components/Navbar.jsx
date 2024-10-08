import { Box, Button, Container, Flex, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { LuSun } from 'react-icons/lu';
import { IoMoon } from 'react-icons/io5'
import CreateUserModal from './CreateUserModal';

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Container maxW={"900px"}>
            <Box px={4} py={4} borderRadius={5} backgroundColor={useColorModeValue('gray.200', 'gray.700')}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    {/* Left Side */}
                    <Flex alignItems={'center'} justifyContent={'space-between'} gap={3}
                        display={{ base: 'none', sm: 'flex' }}
                    >
                        <img src="/dude.png" alt="A male friend icon" width={50} height={50} />
                        <Text fontSize={"40px"}>+</Text>
                        <img src="/girl.png" alt="A female friend icon" width={50} height={50} />
                        <Text fontSize={"40px"}>=</Text>
                        <img src="/16.png" alt="A male friend icon" width={50} height={50} />
                    </Flex>

                    {/* Right Side */}
                    <Flex gap={3} alignItems={'center'}>
                        <Text fontSize={"lg"} fontWeight={500}
                            display={{ base: 'none', md: 'block' }}
                        > BFFship
                        </Text>
                        <Button onClick={toggleColorMode}>
                            {colorMode === 'light' ? <IoMoon /> : <LuSun size={20} />}
                        </Button>
                        <CreateUserModal />
                    </Flex>
                </Flex>
            </Box>
        </Container >
    )
}

export default Navbar
