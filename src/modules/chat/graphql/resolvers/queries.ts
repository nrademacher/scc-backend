import type { QueryResolvers, ResolverContext } from '#internal/types'
import { getMessage, getAllChats, getUserChats } from '../../prisma'
import { AuthenticationError } from 'apollo-server-express'

export const chatQueries: QueryResolvers<ResolverContext> = {
    message: async (_parent, { id }, { userId }) => {
        if (!userId) throw new AuthenticationError('missing_token')

        return await getMessage(id)
    },
    allChats: async (_parent, _arguments, { userId }) => {
        if (!userId) throw new AuthenticationError('missing_token')

        return await getAllChats()
    },
    ownChats: async (_parent, _arguments, { userId }) => {
        if (!userId) throw new AuthenticationError('missing_token')

        return await getUserChats(userId)
    },
    chatsFromUser: async (_parent, { id }, { userId }) => {
        if (!userId) throw new AuthenticationError('missing_token')

        return await getUserChats(id)
    },
}
