import { Flex, Grid, Spinner, Text } from '@chakra-ui/react'
import UserCard from './UserCard';
import { useEffect } from 'react';
import { useState } from 'react';
import { BACKEND_API_URL } from '../App';


const UserGrid = ({ users, setUsers }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getusers = async () => {
            try {
                const res = await fetch(`${BACKEND_API_URL}/friends`);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error)
                }
                setUsers(data)
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false)
            }
        }

        getusers();
    }, [setUsers])
    return (
        <>
            <Grid
                templateColumns={{
                    base: "1fr",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)"
                }}
                gap={4}
            >
                {users.map((user) => (
                    <UserCard key={user.id} user={user} setUsers={setUsers} />
                ))}
            </Grid>

            {isLoading && (
                <Flex justifyContent={'center'}>
                    <Spinner size={'xl'} />
                </Flex>
            )}

            {!isLoading && users.length === 0 && (
                <Flex justifyContent={"center"}>
                    <Text fontSize={"xl"}>
                        <Text as={"span"} fontSize={"xl"} fontWeight={"bold"} mr={2}>Poor You!</Text> No Friends Yet!!
                    </Text>
                </Flex>
            )}
        </>
    )
}

export default UserGrid
