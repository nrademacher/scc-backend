import express from 'express'
import { createServer } from 'node:http'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'
import { ApolloServer } from 'apollo-server-express'
import { schema, config, formatError } from './lib'
import { moduleContexts } from './modules'
;(async () => {
    const app = express()

    const httpServer = createServer(app)

    const subscriptionServer = SubscriptionServer.create(
        { schema, execute, subscribe },
        { server: httpServer, path: '/graphql' }
    )

    const apolloServer = new ApolloServer({
        schema,
        context: moduleContexts,
        formatError,
        plugins: [
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            subscriptionServer.close()
                        },
                    }
                },
            },
        ],
    })

    await apolloServer.start()

    apolloServer.applyMiddleware({ app })

    httpServer.listen(config.PORT, () => {
        console.log(`Express running on port ${config.PORT}`)
        console.log(`GraphQl server at http://localhost:${config.PORT}${apolloServer.graphqlPath}`)
    })
})()
