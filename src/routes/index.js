// Error
const ErrorResponse = require('../utils/ErrorResponse')
    //Main route
const authRoute = require('./authRoute')
const productRoute = require('./productRoute')
const userRoute = require('./userRoute')
const orderRoute = require('./orderRoute')
const commentRoute = require('./commentRoute')
const cartRoute = require('./cartRoute')
const voucherRoute = require('./voucherRoute')
const eventRoute = require('./eventRoute')
const dashBoard = require('./dashBoardRoute')
const oauth2Route = require('./oauth2Route')
    // const swaggerUI = require('swagger-ui-express')
    // const swaggerJsDoc = require('swagger-jsdoc')
    //
function route(app) {
    //Comment
    app.use('/api/comments', commentRoute)
        //Oder
    app.use('/api/orders', orderRoute)
        //PAYPAL_CLIENT_ID
    app.get('/api/config/paypal', (req, res) => {
        res.send(process.env.PAYPAL_CLIENT_ID)
    })
    app.use('/api/users', userRoute)
        // Auth
        // Auth - email
    app.use('/api/auth', authRoute)
        // Auth - oauth2
    app.use('/api/oauth2', oauth2Route)


    //product
    app.use('/api/products', productRoute)
        //cart
    app.use('/api/carts', cartRoute)
        //voucher
    app.use('/api/vouchers', voucherRoute)
        //event
    app.use('/api/events', eventRoute)
        //dashBoard
    app.use('/api/dashBoard', dashBoard)
        // main
    app.use('/', (req, res, next) => {
        next(new ErrorResponse(`Page not found`, 404, null, 'Not found'))
    })
}

module.exports = route