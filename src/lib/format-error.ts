import { GraphQLError } from 'graphql'

export function formatError(error: GraphQLError): Error | GraphQLError {
    if (error.message.startsWith('Database Error: ')) {
        return new Error('Internal server error')
    }

    return error
}
