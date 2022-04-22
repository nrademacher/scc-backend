import type { Chat, SubscriptionResolvers } from '#internal/types'
import { pubsub } from '#internal/services'

export const chatSubscriptions: SubscriptionResolvers = {
    subscribeToChannel: {
        subscribe: (_parent, { channel }) => {
            if (!channel) channel = 'ALL'

            const channelIterator = pubsub.asyncIterator([channel])

            return {
                [Symbol.asyncIterator]() {
                    return channelIterator
                },
            }
        },
        resolve: (payload: Chat) => payload,
    },
}
