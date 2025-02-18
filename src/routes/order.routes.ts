import { Router } from 'express'
import orderController from '~/controller/order.controller'
import { updateOrderValidator } from '~/middlewares/order.middleware'
import { wrapAsync } from '~/utils/handler'

const orderRouter = Router()

/**
 * Description. Create a new order
 * Path: /orders
 * Method: POST
 * Body: { customer_id: string, order_items: Array<{ product_id: string, quantity: number }>, total_price: number }
 */
orderRouter.post('/', wrapAsync(orderController.createOrder))

/**
 * Description. Get order by ID
 * Path: /orders/:id
 * Method: GET
 * Params: { id: string }
 */
orderRouter.get('/:id', wrapAsync(orderController.getOrderById))

/**
 * Description. Get all orders (with pagination)
 * Path: /orders
 * Method: GET
 * Query: { page?: number, limit?: number }
 */
orderRouter.get('/', wrapAsync(orderController.getAllOrders))

/**
 * Description. Update order by ID
 * Path: /orders/:id
 * Method: PUT
 * Params: { id: string }
 * Body: { order_items?: Array<{ product_id: string, quantity: number }>, total_price?: number }
 */
orderRouter.put('/:id', updateOrderValidator, wrapAsync(orderController.updateOrder))

/**
 * Description. Delete order by ID
 * Path: /orders/:id
 * Method: DELETE
 * Params: { id: string }
 */
orderRouter.delete('/:id', wrapAsync(orderController.deleteOrder))

export default orderRouter
