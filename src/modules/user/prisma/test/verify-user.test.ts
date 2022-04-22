import { prismaTestClient as prisma } from '#internal/services'
import { createUser, verifyUser } from '../lib'

describe('user verification', () => {
    afterEach(async () => {
        await prisma.user.deleteMany()
    })

    it('verifies a previously unverified user', async () => {
        const unverifiedUser = await createUser({
            name: 'john doe',
            email: 'john@itemis.com',
            password: '123313Al;XXX',
        })

        expect(unverifiedUser).toHaveProperty('verified', false)

        const verifiedUser = await verifyUser('john@itemis.com')

        expect(verifiedUser).toHaveProperty('verified', true)
    })

    it('rejects verifying a non-existent user', async () => {
        await expect(async () => await verifyUser('john@itemis.com')).rejects.toThrowError('user_does_not_exist')
    })
})
