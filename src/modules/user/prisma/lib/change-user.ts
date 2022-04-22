import { prisma } from '#internal/services'
import isLength from 'validator/lib/isLength'
import type { UserRoles } from '@prisma/client'

export async function changeUserBio(userId: string, newBio: string) {
    const exisitingUser = await prisma.user.findUnique({
        where: { id: userId },
    })

    if (!exisitingUser) throw new Error('user_does_not_exist')

    if (!isLength(newBio, { max: 256 })) {
        throw new Error('bio_too_long')
    }

    return await prisma.user.update({
        where: { id: userId },
        data: { bio: newBio },
    })
}

export async function changeUserDisplayName(userId: string, newDisplayName: string) {
    const exisitingUser = await prisma.user.findUnique({
        where: { id: userId },
    })

    if (!exisitingUser) throw new Error('user_does_not_exist')

    if (!isLength(newDisplayName, { min: 2 })) {
        throw new Error('name_too_short')
    }

    if (!isLength(newDisplayName, { max: 64 })) {
        throw new Error('name_too_long')
    }

    return await prisma.user.update({
        where: { id: userId },
        data: { displayName: newDisplayName },
    })
}

export async function changeUserRole(userEmail: string, newRole: UserRoles) {
    const exisitingUser = await prisma.user.findUnique({
        where: { email: userEmail },
    })

    if (!exisitingUser) throw new Error('user_does_not_exist')

    return await prisma.user.update({
        where: { email: userEmail },
        data: { role: newRole },
    })
}
