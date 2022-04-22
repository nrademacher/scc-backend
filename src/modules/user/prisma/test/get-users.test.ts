import { prismaTestClient as prisma } from '#internal/services'
import { createUser, getUserByEmail, getUserById, getUsersByRole } from '../lib'

describe('user retrieval', () => {
    afterEach(async () => {
        await prisma.user.deleteMany()
    })

    it('gets a user by id', async () => {
        const user = await createUser({
            name: 'john doe',
            email: 'john@itemis.com',
            password: '123313Al;XXX',
        })

        const retrievedUser = await getUserById(user.id)

        expect(retrievedUser).toStrictEqual(user)
    })

    it('gets a user by email', async () => {
        const user = await createUser({
            name: 'john doe',
            email: 'john@itemis.com',
            password: '123313Al;XXX',
        })

        const retrievedUser = await getUserByEmail(user.email)

        expect(retrievedUser).toStrictEqual(user)
    })

    it('gets multiple users by role', async () => {
        const userOne = await createUser({
            name: 'john doe',
            email: 'john@itemis.com',
            password: '123313Al;XXX',
            role: 'TECHNICAL_LEAD',
        })

        const userTwo = await createUser({
            name: 'jane doe',
            email: 'jane@itemis.com',
            password: 'dhadu9.!@!@FFF',
            role: 'TECHNICAL_LEAD',
        })

        const retrievedUsers = await getUsersByRole('TECHNICAL_LEAD')

        expect(retrievedUsers).toStrictEqual([userOne, userTwo])
    })
})
