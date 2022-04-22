import { prisma } from '#internal/services'
import type { UserRoles } from '@prisma/client'

export async function getUserById(userId: string) {
    return await prisma.user.findUnique({ where: { id: userId } })
}

export async function getUserByEmail(userEmail: string) {
    return await prisma.user.findUnique({ where: { email: userEmail } })
}

export async function getUsersByRole(userRole: UserRoles) {
    return await prisma.user.findMany({ where: { role: userRole } })
}
