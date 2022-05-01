import { prismaTestClient as prisma } from '#internal/services'
import { createUser, getUserByEmail, getUserById } from '../lib'

describe('user retrieval', () => {
    afterEach(async () => {
        await prisma.user.deleteMany()
    })

    it('gets a user by public id', async () => {
        const user = await createUser({
            name: 'john doe',
            email: 'john@doe.com',
            password: '123313Al;XXX',
        })

        const retrievedUser = await getUserById(user.publicId)

        expect(retrievedUser).toStrictEqual(user)
    })

    it('gets a user by email', async () => {
        const user = await createUser({
            name: 'john doe',
            email: 'john@doe.com',
            password: '123313Al;XXX',
        })

        const retrievedUser = await getUserByEmail(user.email)

        expect(retrievedUser).toStrictEqual(user)
    })
})
