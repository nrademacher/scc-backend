import { prisma } from '#internal/services'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { config } from '#internal/lib'
import isEmail from 'validator/lib/isEmail'

export async function loginUser(userNameOrEmail: string, password: string) {
    const user = isEmail(userNameOrEmail)
        ? await prisma.user.findUnique({
              where: { email: userNameOrEmail },
          })
        : await prisma.user.findUnique({
              where: { name: userNameOrEmail },
          })
    if (!user) throw new Error('invalid_credentials')

    const match = await compare(password, user.passwordHash)
    if (!match) throw new Error('invalid_credentials')

    return sign({ userId: user.id }, config.TOKEN_SECRET)
}
