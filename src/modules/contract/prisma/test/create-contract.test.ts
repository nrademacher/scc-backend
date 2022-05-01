import { prismaTestClient as prisma } from '#internal/services'
import { createUser } from '../../../user/prisma/lib/create-user'
import { createContract } from '../lib'

describe('contract creation', () => {
    afterEach(async () => {
        await prisma.contract.deleteMany()
        await prisma.user.deleteMany()
    })

    it('creates a contract with all requisite properties', async () => {
        const { id } = await createUser({
            name: 'john doe',
            email: 'john@doe.com',
            password: '123313Al;XXX',
        })

        const contract = await createContract({
            userId: id,
            machineName: 'Test Machine',
            oneTimeFee: 15,
            usageFee: 1.5,
        })

        expect(contract).toHaveProperty('machineName', 'Test Machine')
        expect(contract).toHaveProperty('oneTimeFee', 15)
        expect(contract).toHaveProperty('usageFee', 1.5)
    })
})
