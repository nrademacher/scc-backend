import type { SubscriptionResolvers, User } from '#internal/types'
import { pubsub } from '#internal/services'

export const userSubscriptions: SubscriptionResolvers = {
    subscribeToUserEvent: {
        subscribe: (_parent, { event }) => {
            const userEventIterator = pubsub.asyncIterator([event])
            return {
                [Symbol.asyncIterator]() {
                    return userEventIterator
                },
            }
        },
        resolve: async (payload: User) => payload,
    },
}
