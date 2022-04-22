import { prisma } from '#internal/services'

export async function verifyUser(userEmail: string) {
    const exisitingUser = await prisma.user.findUnique({
        where: { email: userEmail },
    })

    if (!exisitingUser) throw new Error('user_does_not_exist')

    return prisma.user.update({
        where: { email: userEmail },
        data: { verified: true },
    })
}
