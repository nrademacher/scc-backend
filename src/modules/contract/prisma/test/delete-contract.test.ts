import { prismaTestClient as prisma } from '#internal/services'
import { createUser } from '../../../user/prisma/lib/create-user'
import { createContract, deleteContract } from '../lib'

describe('contract deletion', () => {
    afterEach(async () => {
        await prisma.contract.deleteMany()
        await prisma.user.deleteMany()
    })

    it('deletes a given contract', async () => {
        const { id } = await createUser({
            name: 'john doe',
            email: 'john@doe.com',
            password: '123313Al;XXX',
        })

        const contractToDelete = await createContract({
            userId: id,
            machineName: 'Test Machine',
            oneTimeFee: 15,
            usageFee: 1.5,
        })

        const deletedContractResult = await deleteContract(contractToDelete.publicId)

        const deletedContractFindResult = await prisma.contract.findFirst({
            where: { publicId: contractToDelete.publicId },
        })

        expect(deletedContractResult).toStrictEqual(contractToDelete)
        // eslint-disable-next-line unicorn/no-null
        expect(deletedContractFindResult).toBe(null)
    })
})
