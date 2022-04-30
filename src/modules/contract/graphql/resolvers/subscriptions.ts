import type { Contract, SubscriptionResolvers } from '#internal/types'
import { pubsub } from '#internal/services'

export const contractSubscriptions: SubscriptionResolvers = {
    subscribeToContracts: {
        subscribe: (_parent, { event }) => {
            const contractEventIterator = pubsub.asyncIterator([event])
            return {
                [Symbol.asyncIterator]() {
                    return contractEventIterator
                },
            }
        },
        resolve: async (payload: Contract) => payload,
    },
}
