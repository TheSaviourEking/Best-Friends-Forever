import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure } from '@chakra-ui/react';
import { BiEditAlt } from 'react-icons/bi';

const EditModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button onClick={onOpen}>
                <BiAddToQueue size={20} />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>My new Bff</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>
                        <Flex alignItems={"center"} gap={4}>
                            <FormControl>
                                <FormLabel>First Name</FormLabel>
                                <Input placeholder='First Name' />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Last Name</FormLabel>
                                <Input placeholder='Last Name' />
                            </FormControl>
                        </Flex>

                        <FormControl mt={4}>
                            <FormLabel>Role:</FormLabel>
                            <Input placeholder='Role' />
                        </FormControl>

                        <FormControl>
                            <FormLabel mt={4}>Description</FormLabel>
                            <Textarea resize={"none"} overflowY={'hidden'} placeholder="He's a Software Engineer who loves to build things!" />
                        </FormControl>

                        {/* <RadioGroup mt={4} defaultValue='male'>
                            <Flex gap={5}>
                                <Radio value='male'>Male</Radio>
                                <Radio value='female'>Female</Radio>
                            </Flex>
                        </RadioGroup> */}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={5}>Add</Button>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditModal
