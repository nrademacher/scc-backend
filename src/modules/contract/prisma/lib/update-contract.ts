import type { Contract } from '@prisma/client'
import { prisma } from '#internal/services'

type UpdateContract = {
    publicId: string
    machineName?: string | null
    oneTimeFee?: number | null
    usageFee?: number | null
}

export async function updateContract({
    publicId,
    machineName,
    oneTimeFee,
    usageFee,
}: UpdateContract): Promise<Contract> {
    const contractToBeUpdated = await prisma.contract.findFirst({ where: { publicId } })

    if (!contractToBeUpdated) throw new Error('contract_does_not_exist')

    const updatedContract = await prisma.contract.update({
        where: {
            publicId,
        },
        data: {
            machineName: machineName ?? contractToBeUpdated.machineName,
            oneTimeFee: oneTimeFee ?? contractToBeUpdated.oneTimeFee,
            usageFee: usageFee ?? contractToBeUpdated.usageFee,
        },
    })

    return updatedContract
}
