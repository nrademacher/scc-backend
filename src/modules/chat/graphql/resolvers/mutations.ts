import type { MutationResolvers, ResolverContext } from '#internal/types'
import { AuthenticationError } from 'apollo-server-express'
import { sendMessage } from '../../prisma'
import { pubsub } from '#internal/services'

export const chatMutations: MutationResolvers<ResolverContext> = {
    sendMessage: async (_parent, { recipientEmail, message, channel }, { userId }) => {
        if (!userId) throw new AuthenticationError('missing_token')

        const newMessage = await sendMessage({
            userId,
            recipientEmail,
            channel,
            message,
        })

        const { id, from, to, channel: pubChannel } = newMessage

        pubsub.publish(pubChannel, { message, id, from, to, channel })

        return newMessage
    },
}
