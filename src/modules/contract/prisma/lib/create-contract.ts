import type { Contract } from '@prisma/client'
import { prisma } from '#internal/services'
import { nanoid } from 'nanoid'

type CreateContract = Pick<Contract, 'machineName' | 'oneTimeFee' | 'usageFee' | 'userId'>

export async function createContract({ machineName, oneTimeFee, usageFee, userId }: CreateContract): Promise<Contract> {
    return await prisma.contract.create({
        data: {
            publicId: nanoid(),
            machineName,
            oneTimeFee,
            usageFee,
            userId,
        },
    })
}
