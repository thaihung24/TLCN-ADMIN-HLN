const express = require('express')
const router = express.Router()
const orderControllers = require('../controllers/orderController')
const { admin } = require('../middleware/authMiddleware')
const verifyToken = require('../middleware/auth')

router.route('/myorders').get(verifyToken, orderControllers.getMyOrders)
router.route('/:id/pay').put(verifyToken, orderControllers.updateOrderToPaid)
router
  .route('/confirm/:id')
  .put(verifyToken, admin, orderControllers.confirmOrder)
router
  .route('/:id')
  .get(verifyToken, orderControllers.getOrderById)
  .put(verifyToken, orderControllers.updateStatusOrder)
router
  .route('/')
  .post(verifyToken, orderControllers.addOrderItems)
  .get(verifyToken, admin, orderControllers.getAllOrders)

module.exports = router
