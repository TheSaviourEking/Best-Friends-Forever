import { Grid } from '@chakra-ui/react'
import UserCard from './UserCard';


const UserGrid = () => {
    const USERS = null;
    return (
        <Grid templateColumns={{
            base: '1f',
            md: "repeat (2, 1fr)",
            lg: "repeat (3, 1fr)"
        }} gap={4}>
            {USERS.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </Grid>
    )
}

export default UserGrid
