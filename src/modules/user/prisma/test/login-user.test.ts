import { prismaTestClient as prisma } from '#internal/services'
import { createUser, loginUser } from '../lib'
import isJWT from 'validator/lib/isJWT'

describe('user login', () => {
    afterEach(async () => {
        await prisma.user.deleteMany()
    })

    it('logs in a user providing valid email and password', async () => {
        await createUser({
            name: 'john doe',
            email: 'john@doe.com',
            password: '123313Al;XXX',
        })

        const loginToken = await loginUser('john@doe.com', '123313Al;XXX')

        expect(isJWT(loginToken)).toBe(true)
    })

    it('logs in a user providing valid email and user name', async () => {
        await createUser({
            name: 'john doe',
            email: 'john@doe.com',
            password: '123313Al;XXX',
        })

        const loginToken = await loginUser('john doe', '123313Al;XXX')

        expect(isJWT(loginToken)).toBe(true)
    })

    it('rejects logging in a user providing credentials not matching any user', async () => {
        await expect(async () => await loginUser('john@doe.com', '123313Al;XXX')).rejects.toThrowError(
            'invalid_credentials'
        )
    })

    it('rejects logging in a user providing an existing email with a wrong password', async () => {
        await createUser({
            name: 'john doe',
            email: 'john@doe.com',
            password: '123313Al;XXX',
        })

        await expect(async () => await loginUser('john@doe.com', '383d18e')).rejects.toThrowError('invalid_credentials')
    })
})
