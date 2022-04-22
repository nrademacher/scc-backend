import type { ChatChannels } from '@prisma/client'
import { prisma } from '#internal/services'

interface SendMessage {
    userId: string
    channel?: ChatChannels | null
    recipientEmail?: string | null
    message: string
}

export async function sendMessage({ userId, channel, recipientEmail, message }: SendMessage) {
    let recipientId

    if (channel === 'PRIVATE' && recipientEmail) {
        const recipient = await prisma.user.findUnique({
            where: { email: recipientEmail },
        })

        if (!recipient) throw new Error('user_not_found')

        const { id } = recipient

        recipientId = id
    }

    if (!channel) channel = 'ALL'

    const data = {
        message,
        fromId: userId,
        toId: recipientId,
        channel,
    }

    return await prisma.chat.create({
        data,
        include: {
            from: true,
            to: true,
        },
    })
}
