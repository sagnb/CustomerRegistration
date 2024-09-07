import prismaClient from '../prisma'

class DeleteAllCustomersService {
  async execute() {
    await prismaClient.customer.deleteMany()

    return { message: 'Todos os clientes foram deletados' }
  }
}

export { DeleteAllCustomersService }
