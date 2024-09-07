import prismaClient from '../prisma'

interface UpdateCustomerProps {
  id: string,
  name: string,
  email: string
}

class UpdateCustomerService {
  async execute({ id, name, email }: UpdateCustomerProps) {
    if (!id || !name || !email) {
      throw new Error("Faltou preencher os campos")
    }

    const findCustomer = await prismaClient.customer.findFirst({
      where: {
        id: id
      }
    })

    if (!findCustomer) {
      throw new Error("Cliente nao existe")
    }

    const updatedCustomer = await prismaClient.customer.update({
      where: {
        id: findCustomer.id
      },
      data: {
        name,
        email
      }
    })

    return updatedCustomer
  }
}

export { UpdateCustomerService }
