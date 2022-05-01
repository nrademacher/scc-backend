import type { Contract } from '@prisma/client'
import { prisma } from '#internal/services'

export async function getContractById(publicId: string): Promise<Contract | null> {
    return await prisma.contract.findUnique({
        where: {
            publicId,
        },
    })
}

export async function getAllContracts(): Promise<Contract[]> {
    return await prisma.contract.findMany()
}

export async function getContractsByMachine(machineName: string): Promise<Contract[]> {
    return await prisma.contract.findMany({
        where: {
            machineName,
        },
    })
}

export async function getContractsByUser(userId: string) {
    return await prisma.contract.findMany({
        where: {
            user: {
                id: userId,
            },
        },
    })
}
