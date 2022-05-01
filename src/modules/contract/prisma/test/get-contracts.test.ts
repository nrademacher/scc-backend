import { prismaTestClient as prisma } from '#internal/services'
import { createUser } from '../../../user/prisma/lib/create-user'
import { createContract, getAllContracts, getContractById, getContractsByMachine, getContractsByUser } from '../lib'

describe('contract retrieval', () => {
    afterEach(async () => {
        await prisma.contract.deleteMany()
        await prisma.user.deleteMany()
    })

    it('gets a contract by its public id', async () => {
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

        const retrievedContract = await getContractById(contract.publicId)

        expect(retrievedContract).toStrictEqual(contract)
    })

    it('gets all contracts', async () => {
        const { id } = await createUser({
            name: 'john doe',
            email: 'john@doe.com',
            password: '123313Al;XXX',
        })

        const contractOne = await createContract({
            userId: id,
            machineName: 'Test Machine',
            oneTimeFee: 15,
            usageFee: 1.5,
        })
        const contractTwo = await createContract({
            userId: id,
            machineName: 'Test Machine 2',
            oneTimeFee: 19,
            usageFee: 1.9,
        })

        const retrievedContracts = await getAllContracts()

        expect(retrievedContracts).toStrictEqual([contractOne, contractTwo])
    })

    it('gets contracts of a specific user', async () => {
        const { id: userOneId } = await createUser({
            name: 'john doe',
            email: 'john@doe.com',
            password: '123313Al;XXX',
        })

        const { id: userTwoId } = await createUser({
            name: 'jane doe',
            email: 'jane@doe.com',
            password: 'dhadu9.!@!@FFF',
        })

        const contractOne = await createContract({
            userId: userOneId,
            machineName: 'Test Machine',
            oneTimeFee: 15,
            usageFee: 1.5,
        })
        await createContract({
            userId: userTwoId,
            machineName: 'Test Machine 2',
            oneTimeFee: 19,
            usageFee: 1.9,
        })
        const contractThree = await createContract({
            userId: userOneId,
            machineName: 'Test Machine 3',
            oneTimeFee: 27.5,
            usageFee: 3.3,
        })

        const retrievedContracts = await getContractsByUser(userOneId)

        expect(retrievedContracts).toStrictEqual([contractOne, contractThree])
    })

    it('gets contracts for a specific machine', async () => {
        const { id } = await createUser({
            name: 'john doe',
            email: 'john@doe.com',
            password: '123313Al;XXX',
        })

        await createContract({
            userId: id,
            machineName: 'Test Machine',
            oneTimeFee: 15,
            usageFee: 1.5,
        })
        const contactTwo = await createContract({
            userId: id,
            machineName: 'Test Machine 2',
            oneTimeFee: 19,
            usageFee: 1.9,
        })
        const contractThree = await createContract({
            userId: id,
            machineName: 'Test Machine 2',
            oneTimeFee: 19,
            usageFee: 1.9,
        })

        const retrievedContracts = await getContractsByMachine('Test Machine 2')

        expect(retrievedContracts).toStrictEqual([contactTwo, contractThree])
    })
})
