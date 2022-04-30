import type { MutationResolvers, ResolverContext } from '#internal/types'
import { createContract, deleteContract, updateContract } from '../../prisma'
import { AuthenticationError } from 'apollo-server-express'
import { pubsub } from '#internal/services'

export const contractMutations: MutationResolvers<ResolverContext> = {
    createContract: async (_parent, { machineName, usageFee, oneTimeFee }, { userId }) => {
        if (!userId) throw new AuthenticationError('missing_token')

        const newContract = await createContract({
            machineName,
            usageFee,
            oneTimeFee,
            userId,
        })

        pubsub.publish('CREATION', newContract)

        return newContract
    },
    updateContract: async (_parent, { id, machineName, usageFee, oneTimeFee }, { userId }) => {
        if (!userId) throw new AuthenticationError('missing_token')

        const updatedContract = await updateContract({
            publicId: id,
            machineName,
            usageFee,
            oneTimeFee,
        })

        pubsub.publish('UPDATE', updatedContract)

        return updatedContract
    },
    deleteContract: async (_parent, { id }, { userId }) => {
        if (!userId) throw new AuthenticationError('missing_token')

        const deletedContract = await deleteContract(id)

        pubsub.publish('DELETE', deletedContract)

        return deletedContract
    },
}
