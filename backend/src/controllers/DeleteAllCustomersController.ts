import { FastifyRequest, FastifyReply } from 'fastify'
import { DeleteAllCustomersService } from '../services/DeleteAllCustomersService'

class DeleteAllCustomersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const deleteAllCustomersService = new DeleteAllCustomersService()
    const message = await deleteAllCustomersService.execute()

    reply.send(message)
  }
}

export { DeleteAllCustomersController }
