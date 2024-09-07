import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify"
import { CreateCustomerController } from "./controllers/CreateCustomerController"
import { ListCustomersController } from './controllers/ListCustomersController'
import { DeleteCustomerController } from './controllers/DeleteCustomerController'
import { UpdateCustomerController } from './controllers/UpdateCustomerController'
import { DeleteAllCustomersController } from './controllers/DeleteAllCustomersController'

export async function routes(fastify: FastifyInstance, option: FastifyPluginOptions) {
  fastify.get("/teste", async (request: FastifyRequest, reply: FastifyReply) => {
    return { ok: true }
  })

  fastify.post("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateCustomerController().handle(request, reply)
  })

  fastify.get("/customers", async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListCustomersController().handle(request, reply)
  })

  fastify.delete("/deleteCustomer", async (request: FastifyRequest, reply: FastifyReply) => {
    return new DeleteCustomerController().handle(request, reply)
  })

  fastify.post("/updateCustomer", async (request: FastifyRequest, reply: FastifyReply) => {
    return new UpdateCustomerController().handle(request, reply)
  })

  fastify.delete("/deleteAll", async (request: FastifyRequest, reply: FastifyReply) => {
    return new DeleteAllCustomersController().handle(request, reply)
  })
}
