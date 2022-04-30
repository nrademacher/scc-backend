import type { User } from '@prisma/client'
import { validateUserSignup } from '../utils'
import { prisma } from '#internal/services'
import { hashSync } from 'bcrypt'
import { nanoid } from 'nanoid'

type CreateUser = {
    name: string
    email: string
    password: string
}

export async function createUser({ email, password, name }: CreateUser): Promise<User> {
    validateUserSignup({ email, password, name })

    const exisitingUser = await prisma.user.findUnique({ where: { email } })
    if (exisitingUser) throw new Error('user_already_exists')

    const passwordHash = hashSync(password || '', 10)

    return await prisma.user.create({
        data: {
            publicId: nanoid(),
            email,
            name,
            passwordHash,
        },
    })
}
