import type { QueryResolvers, ResolverContext } from '#internal/types'
import { getAllContracts, getContractById, getContractsByMachine, getContractsByUser } from '../../prisma'
import { AuthenticationError } from 'apollo-server-express'

export const contractQueries: QueryResolvers<ResolverContext> = {
    contractById: async (_parent, { id }, { userId }) => {
        if (!userId) throw new AuthenticationError('missing_token')

        return await getContractById(id)
    },
    allContracts: async (_parent, _arguments, { userId }) => {
        if (!userId) throw new AuthenticationError('missing_token')

        return await getAllContracts()
    },
    contractsByMachine: async (_parent, { machineName }, { userId }) => {
        if (!userId) throw new AuthenticationError('missing_token')

        return await getContractsByMachine(machineName)
    },
    contractsByUser: async (_parent, _arguments, { userId }) => {
        if (!userId) throw new AuthenticationError('missing_token')

        return await getContractsByUser(userId)
    },
}
