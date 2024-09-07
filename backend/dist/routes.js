"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = routes;
const CreateCustomerController_1 = require("./controllers/CreateCustomerController");
const ListCustomersController_1 = require("./controllers/ListCustomersController");
const DeleteCustomerController_1 = require("./controllers/DeleteCustomerController");
const UpdateCustomerController_1 = require("./controllers/UpdateCustomerController");
const DeleteAllCustomersController_1 = require("./controllers/DeleteAllCustomersController");
function routes(fastify, option) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get("/teste", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return { ok: true };
        }));
        fastify.post("/customer", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new CreateCustomerController_1.CreateCustomerController().handle(request, reply);
        }));
        fastify.get("/customers", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            console.log('--------------------------1');
            return new ListCustomersController_1.ListCustomersController().handle(request, reply);
        }));
        fastify.delete("/deleteCustomer", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new DeleteCustomerController_1.DeleteCustomerController().handle(request, reply);
        }));
        fastify.post("/updateCustomer", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new UpdateCustomerController_1.UpdateCustomerController().handle(request, reply);
        }));
        fastify.delete("/deleteAll", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new DeleteAllCustomersController_1.DeleteAllCustomersController().handle(request, reply);
        }));
    });
}
