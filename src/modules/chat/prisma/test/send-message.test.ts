import { prismaTestClient as prisma } from '#internal/services'
import { createUser } from '../../../user/prisma/lib/create-user'
import { sendMessage } from '../lib'

describe('messaging', () => {
    afterEach(async () => {
        await prisma.chat.deleteMany()
        await prisma.user.deleteMany()
    })

    it('sends a message to the ALL channel by default', async () => {
        const { id } = await createUser({
            name: 'john doe',
            email: 'john@itemis.com',
            password: '123313Al;XXX',
        })

        const message = await sendMessage({ userId: id, message: 'Hello, world!' })

        expect(message).toHaveProperty('message', 'Hello, world!')
        expect(message).toHaveProperty('channel', 'ALL')
    })

    it('sends a message to a specified channel', async () => {
        const { id } = await createUser({
            name: 'john doe',
            email: 'john@itemis.com',
            password: '123313Al;XXX',
        })

        const message = await sendMessage({
            userId: id,
            channel: 'ALL',
            message: 'Hello, world!',
        })

        expect(message).toHaveProperty('message', 'Hello, world!')
        expect(message).toHaveProperty('channel', 'ALL')
    })

    it('sends a message to a specified recipient if channel is PRIVATE', async () => {
        const userOne = await createUser({
            name: 'john doe',
            email: 'john@itemis.com',
            password: '123313Al;XXX',
        })

        const userTwo = await createUser({
            name: 'jane doe',
            email: 'jane@itemis.com',
            password: '123313Al;YYY',
        })

        const { message, channel, to, from } = await sendMessage({
            userId: userOne.id,
            recipientEmail: userTwo.email,
            channel: 'PRIVATE',
            message: 'Hello, Jane!',
        })

        expect(message).toBe('Hello, Jane!')
        expect(channel).toBe('PRIVATE')
        expect(to).toStrictEqual(userTwo)
        expect(from).toStrictEqual(userOne)
    })

    it('throws an error if recipient is not found', async () => {
        const { id } = await createUser({
            name: 'john doe',
            email: 'john@itemis.com',
            password: '123313Al;XXX',
        })

        await expect(
            async () =>
                await sendMessage({
                    userId: id,
                    recipientEmail: 'jane@itemis.com',
                    channel: 'PRIVATE',
                    message: 'Hello, Jane!',
                })
        ).rejects.toThrowError('user_not_found')
    })
})
