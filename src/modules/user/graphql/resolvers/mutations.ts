import type { MutationResolvers, ResolverContext } from '#internal/types'
import { changeUserBio, changeUserDisplayName, changeUserRole, createUser, verifyUser } from '../../prisma'
import { AuthenticationError } from 'apollo-server-express'
import { pubsub } from '#internal/services'

export const userMutations: MutationResolvers<ResolverContext> = {
    signUpUser: async (_parent, arguments_) => {
        const { email, password, name, displayName, bio, role } = arguments_

        if (!email || !password) {
            throw new AuthenticationError('missing_credentials')
        }

        const newUser = await createUser({
            email,
            password,
            role,
            name,
            displayName,
            bio,
        })

        pubsub.publish('SIGN_UP', newUser)

        return newUser
    },
    verifyUser: async (_parent, { userEmail }, { userId, userRole }) => {
        if (!userId) throw new AuthenticationError('no_auth_token')

        if (userRole !== 'ADMIN') throw new AuthenticationError('no_permission')

        return await verifyUser(userEmail)
    },
    changeUserRole: async (_parent, { userEmail, newRole }, { userId, userRole }) => {
        if (!userId) throw new AuthenticationError('no_auth_token')

        if (userRole !== 'ADMIN') throw new AuthenticationError('no_permission')

        return await changeUserRole(userEmail, newRole)
    },
    changeUserBio: async (_parent, { newBio }, { userId }) => {
        if (!userId) throw new AuthenticationError('no_auth_token')

        return await changeUserBio(userId, newBio)
    },
    changeUserDisplayName: async (_parent, { newDisplayName }, { userId }) => {
        if (!userId) throw new AuthenticationError('no_auth_token')

        return await changeUserDisplayName(userId, newDisplayName)
    },
}
