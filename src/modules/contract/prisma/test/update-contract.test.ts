import { prismaTestClient as prisma } from '#internal/services'
import { createUser } from '../../../user/prisma/lib/create-user'
import { createContract, updateContract } from '../lib'

describe('contract updating', () => {
    afterEach(async () => {
        await prisma.contract.deleteMany()
        await prisma.user.deleteMany()
    })

    it('correctly updates a single contract property', async () => {
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

        const updateContractResult = await updateContract({
            publicId: contract.publicId,
            machineName: 'Other Test Machine',
        })

        expect(updateContractResult).toHaveProperty('machineName', 'Other Test Machine')
        expect(updateContractResult).toHaveProperty('oneTimeFee', 15)
        expect(updateContractResult).toHaveProperty('usageFee', 1.5)
    })

    it('correctly updates multiple contract properties', async () => {
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

        const updateContractResult = await updateContract({
            publicId: contract.publicId,
            machineName: 'Other Test Machine',
            oneTimeFee: 42,
            usageFee: 3.6,
        })

        expect(updateContractResult).toHaveProperty('machineName', 'Other Test Machine')
        expect(updateContractResult).toHaveProperty('oneTimeFee', 42)
        expect(updateContractResult).toHaveProperty('usageFee', 3.6)
    })
})
