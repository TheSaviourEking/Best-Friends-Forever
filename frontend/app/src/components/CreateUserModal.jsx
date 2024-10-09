import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { BACKEND_API_URL } from '../App';

const CreateUserModal = ({ setUsers }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        role: '',
        description: '',
        gender: ''
    });

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch(`${BACKEND_API_URL}/friends`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputs)
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error)
            }

            toast({
                status: 'success',
                title: 'Congratulations',
                description: 'Friend created successfully',
                duration: 2000,
                position: 'top-right'
            })

            onClose();
            // TODO: 
            setUsers((prevUsers) => [...prevUsers, data]);
            setInputs({
                firstName: '', lastName: '', role: '', description: '', gender: ''
            })
        } catch (e) {
            console.error(e);

            toast({
                status: 'error',
                title: 'An error occurred',
                description: e.message,
                duration: 2000,
                position: 'top-right'
            })
        } finally {
            setIsLoading(false);
            // setInputs({
            //     firstName: '', lastName: '', role: '', description: '', gender: ''
            // })
        }
    }

    return (
        <>
            <Button onClick={onOpen}>
                <BiAddToQueue size={20} />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <form onSubmit={e => handleCreateUser(e)}>
                    <ModalContent>
                        <ModalHeader>My new Bff</ModalHeader>
                        <ModalCloseButton />

                        <ModalBody pb={6}>
                            <Flex alignItems={"center"} gap={4}>
                                <FormControl>
                                    <FormLabel>First Name</FormLabel>
                                    <Input placeholder='First Name' value={inputs.firstName}
                                        onChange={e => setInputs({ ...inputs, firstName: e.target.value })}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input placeholder='Last Name' value={inputs.lastName} onChange={e => setInputs({ ...inputs, lastName: e.target.value })} />
                                </FormControl>
                            </Flex>

                            <FormControl mt={4}>
                                <FormLabel>Role:</FormLabel>
                                <Input placeholder='Role' value={inputs.role} onChange={e => setInputs({ ...inputs, role: e.target.value })} />
                            </FormControl>

                            <FormControl>
                                <FormLabel mt={4}>Description</FormLabel>
                                <Textarea resize={"none"} overflowY={'hidden'} placeholder="He's a Software Engineer who loves to build things!" value={inputs.description} onChange={e => setInputs({ ...inputs, description: e.target.value })} />
                            </FormControl>

                            <RadioGroup mt={4}>
                                <Flex gap={5}>
                                    <Radio value='male' onChange={e => setInputs({ ...inputs, gender: e.target.value })}>Male</Radio>
                                    <Radio value='female' onChange={e => setInputs({ ...inputs, gender: e.target.value })}>Female</Radio>
                                </Flex>
                            </RadioGroup>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={5} type='submit' isLoading={isLoading}>Add</Button>
                            <Button onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    )
}

export default CreateUserModal
