import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, useToast } from '@chakra-ui/react'
import { BiTrash } from 'react-icons/bi'
import EditModal from './EditModal'
import { useState } from 'react'
import { BACKEND_API_URL } from '../App'

const UserCard = ({ user, setUsers }) => {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${BACKEND_API_URL}/friends/${user.id}`, {
                method: 'DELETE',
            })

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }

            setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));

            toast({
                status: 'success',
                title: 'Success',
                description: 'Friend deleted successfully',
                duration: 2000,
                position: 'top-right',
                // isClosable: true
            })

        } catch (e) {
            // console.error(e);

            toast({
                status: 'error',
                title: 'An error occurred',
                description: e.message,
                duration: 2000,
                position: 'top-right',
                isClosable: true
            })
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Card>
            <CardHeader>
                <Flex gap={4}>
                    <Flex flex={1} gap={4} alignItems={'center'}>
                        <Avatar src={user.imgUrl} />
                        <Box>
                            <Heading size='sm'>{user.firstName} {user.lastName}</Heading>
                            <Text>{user.role}</Text>
                        </Box>
                    </Flex>

                    <Flex>
                        {/* Edit button */}
                        <EditModal user={user} setUsers={setUsers} />
                        <IconButton variant={'ghost'} colorScheme='red' size={'sm'} aria-label='see menu' icon={<BiTrash size={20} onClick={handleDelete} />} />
                    </Flex>
                </Flex>
            </CardHeader>

            <CardBody>
                <Text>{user.description}</Text>
            </CardBody>
        </Card>
    )
}

export default UserCard
