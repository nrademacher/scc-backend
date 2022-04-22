import { prismaTestClient as prisma } from '#internal/services'
import { changeUserBio, changeUserDisplayName, changeUserRole, createUser } from '../lib'

describe('changing mutable user properties', () => {
    afterEach(async () => {
        await prisma.user.deleteMany()
    })

    it('changes a user bio', async () => {
        const user = await createUser({
            name: 'john doe',
            email: 'john@itemis.com',
            password: '123313Al;XXX',
            bio: '...',
        })

        const newBio = 'Hello, world!'

        const userWithNewBio = await changeUserBio(user.id, newBio)

        expect(userWithNewBio).toHaveProperty('bio', newBio)
    })

    it('rejects if user targeted by bio change does not exist', async () => {
        const falseId = String(Date.now())
        const newBio = 'Hello, world!'

        await expect(async () => await changeUserBio(falseId, newBio)).rejects.toThrowError('user_does_not_exist')
    })

    it('rejects if new bio exceeds maximum length', async () => {
        const user = await createUser({
            name: 'john doe',
            email: 'john@itemis.com',
            password: '123313Al;XXX',
            bio: '...',
        })

        const newBio = 'Hello, world!'.repeat(42)

        await expect(async () => await changeUserBio(user.id, newBio)).rejects.toThrowError('bio_too_long')
    })

    it('changes a user display name', async () => {
        const user = await createUser({
            name: 'john doe',
            email: 'john@itemis.com',
            password: '123313Al;XXX',
            displayName: 'Johnny',
        })

        const newDisplayName = 'Jonathan'

        const userWithNewDisplayName = await changeUserDisplayName(user.id, newDisplayName)

        expect(userWithNewDisplayName).toHaveProperty('displayName', newDisplayName)
    })

    it('rejects if user targeted by display name change does not exist', async () => {
        const falseId = String(Date.now())
        const newDisplayName = 'Johnny'

        await expect(async () => await changeUserDisplayName(falseId, newDisplayName)).rejects.toThrowError(
            'user_does_not_exist'
        )
    })

    it('rejects if new display name is too long', async () => {
        const user = await createUser({
            name: 'john doe',
            email: 'john@itemis.com',
            password: '123313Al;XXX',
            displayName: 'Johnny',
        })

        const newDisplayName = 'J'.repeat(70) + 'ohnny'

        await expect(async () => await changeUserDisplayName(user.id, newDisplayName)).rejects.toThrowError(
            'name_too_long'
        )
    })

    it('rejects if new display name is too short', async () => {
        const user = await createUser({
            name: 'john doe',
            email: 'john@itemis.com',
            password: '123313Al;XXX',
            displayName: 'Johnny',
        })

        const newDisplayName = 'J'

        await expect(async () => await changeUserDisplayName(user.id, newDisplayName)).rejects.toThrowError(
            'name_too_short'
        )
    })

    it('changes a user role', async () => {
        const user = await createUser({
            name: 'john doe',
            email: 'john@itemis.com',
            password: '123313Al;XXX',
            role: 'SOFTWARE_DEVELOPER',
        })

        const newRole = 'TECHNICAL_LEAD'

        const userWithNewRole = await changeUserRole(user.email, newRole)

        expect(userWithNewRole).toHaveProperty('role', newRole)
    })

    it('rejects if user targeted by role change does not exist', async () => {
        const falseEmail = 'test@test.com'
        const newRole = 'TECHNICAL_LEAD'

        await expect(async () => await changeUserRole(falseEmail, newRole)).rejects.toThrowError('user_does_not_exist')
    })
})
