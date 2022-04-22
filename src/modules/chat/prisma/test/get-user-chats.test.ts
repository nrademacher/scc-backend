import { prismaTestClient as prisma } from '#internal/services'
import { createUser } from '../../../user/prisma/lib/create-user'
import { sendMessage, getMessage, getAllChats, getUserChats } from '../lib'

describe('message retrieval', () => {
    afterEach(async () => {
        await prisma.chat.deleteMany()
        await prisma.user.deleteMany()
    })

    it('gets a message by id', async () => {
        const { id } = await createUser({
            name: 'john doe',
            email: 'john@itemis.com',
            password: '123313Al;XXX',
        })

        const message = await sendMessage({ userId: id, message: 'Hello, world!' })

        const retrievedMessage = await getMessage(message.id)

        expect(retrievedMessage).toStrictEqual(message)
    })

    it('gets all messages', async () => {
        const { id } = await createUser({
            name: 'john doe',
            email: 'john@itemis.com',
            password: '123313Al;XXX',
        })

        const messageOne = await sendMessage({
            userId: id,
            message: 'Hello, world!',
        })
        const messageTwo = await sendMessage({
            userId: id,
            message: 'Hello again!',
        })

        const retrievedMessages = await getAllChats()

        expect(retrievedMessages).toStrictEqual([messageOne, messageTwo])
    })

    it('gets messages from a specific user', async () => {
        const { id: userOneId } = await createUser({
            name: 'john doe',
            email: 'john@itemis.com',
            password: '123313Al;XXX',
            role: 'TECHNICAL_LEAD',
        })

        const { id: userTwoId } = await createUser({
            name: 'jane doe',
            email: 'jane@itemis.com',
            password: 'dhadu9.!@!@FFF',
            role: 'TECHNICAL_LEAD',
        })

        const messageOne = await sendMessage({
            userId: userOneId,
            message: 'Hello from John!',
        })
        await sendMessage({
            userId: userTwoId,
            message: 'Hello from Jane!',
        })
        const messageThree = await sendMessage({
            userId: userOneId,
            message: 'Hello again from John!',
        })

        const retrievedMessages = await getUserChats(userOneId)

        expect(retrievedMessages).toStrictEqual([messageOne, messageThree])
    })
})
