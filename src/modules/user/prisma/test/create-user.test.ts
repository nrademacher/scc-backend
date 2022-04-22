import { prismaTestClient as prisma } from '#internal/services'
import { createUser } from '../lib'

describe('user creation', () => {
    afterEach(async () => {
        await prisma.user.deleteMany()
    })

    it('creates a new valid user in the database', async () => {
        await createUser({
            name: 'john doe',
            email: 'john@itemis.com',
            password: '123313Al;XXX',
        })

        const result = await prisma.user.findUnique({
            where: { email: 'john@itemis.com' },
        })

        expect(result).toHaveProperty('email', 'john@itemis.com')
        expect(result).toHaveProperty('role', 'SOFTWARE_DEVELOPER')
    })

    it('rejects creating the user if user with same email exists', async () => {
        await createUser({
            name: 'john doe',
            email: 'john@itemis.com',
            password: '123313Al;XXX',
        })

        await expect(
            async () =>
                await createUser({
                    email: 'john@itemis.com',
                    name: 'John',
                    password: '123313Al;XXX',
                })
        ).rejects.toThrowError('user_already_exists')
    })

    it('rejects a user providing a name that is too short', async () => {
        await expect(
            async () =>
                await createUser({
                    name: 'J',
                    email: 'john@itemis.com',
                    password: '123313Al;XXX',
                })
        ).rejects.toThrowError('username_too_short')
    })

    it('rejects a user providing a name that is too long', async () => {
        await expect(
            async () =>
                await createUser({
                    name: 'J'.repeat(65),
                    email: 'john@itemis.com',
                    password: '123313Al;XXX',
                })
        ).rejects.toThrowError('username_too_long')
    })

    it('rejects a user providing an invalid email address', async () => {
        await expect(
            async () =>
                await createUser({
                    name: 'john doe',
                    email: '@itemis.com',
                    password: '123313Al;XXX',
                })
        ).rejects.toThrowError('invalid_email_address')

        await expect(
            async () =>
                await createUser({
                    name: 'john doe',
                    email: 'john@itemis',
                    password: '123313Al;XXX',
                })
        ).rejects.toThrowError('invalid_email_address')
    })

    it('rejects a user providing a weak password', async () => {
        await expect(
            async () =>
                await createUser({
                    name: 'john doe',
                    email: 'john@itemis.com',
                    password: 'password',
                })
        ).rejects.toThrowError('insufficient_password_strength')

        await expect(
            async () =>
                await createUser({
                    name: 'john doe',
                    email: 'john@itemis.com',
                    password: '12345678',
                })
        ).rejects.toThrowError('insufficient_password_strength')
    })
})
