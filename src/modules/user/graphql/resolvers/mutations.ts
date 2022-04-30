import type { MutationResolvers, ResolverContext } from '#internal/types'
import { createUser } from '../../prisma'
import { AuthenticationError } from 'apollo-server-express'
import { pubsub } from '#internal/services'

export const userMutations: MutationResolvers<ResolverContext> = {
    signUpUser: async (_parent, arguments_) => {
        const { email, password, name } = arguments_

        if (!email || !password) {
            throw new AuthenticationError('missing_credentials')
        }

        const newUser = await createUser({
            email,
            password,
            name,
        })

        pubsub.publish('SIGN_UP', newUser)

        return newUser
    },
}
