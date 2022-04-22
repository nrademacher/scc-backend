import { prisma } from '#internal/services'

export async function getMessage(messageId: string) {
    return await prisma.chat.findUnique({
        where: {
            id: messageId,
        },
        include: {
            from: true,
            to: true,
        },
    })
}

export async function getAllChats() {
    return await prisma.chat.findMany({
        include: {
            from: true,
            to: true,
        },
    })
}

export async function getUserChats(userId: string) {
    return await prisma.chat.findMany({
        where: {
            from: {
                id: userId,
            },
        },
        include: {
            from: true,
            to: true,
        },
    })
}
