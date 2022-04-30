import type { Contract } from '@prisma/client'
import { prisma } from '#internal/services'

export async function deleteContract(publicId: string): Promise<Contract> {
    return await prisma.contract.delete({
        where: {
            publicId,
        },
    })
}
