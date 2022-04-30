import type { User } from '@prisma/client'
import { prisma } from '#internal/services'

export async function getUserById(userId: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { publicId: userId } })
}

export async function getUserByEmail(userEmail: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email: userEmail } })
}
