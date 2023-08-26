const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

// Importar rutas
const userRouter = require('./routes/Users')
const loginRouter = require('./routes/Login')
const countriesRouter = require('./routes/Countries')
const companyRouter = require('./routes/Companies')
const activityRouter = require('./routes/Activity')
const modelRouter = require('./routes/Models')
const setsRouter = require('./routes/Sets')
const orderRouter = require('./routes/Orders')
const fileRouter = require('./routes/Files')
const reportRouter = require('./routes/Reports')
const itemsRouter = require('./routes/Items')

// Rutas
app.use('/user', userRouter)
app.use('/login', loginRouter)
app.use('/countries', countriesRouter)
app.use('/company', companyRouter)
app.use('/activities', activityRouter)
app.use('/models', modelRouter)
app.use('/sets', setsRouter)
app.use('/orders', orderRouter)
app.use('/files', fileRouter)
app.use('/reports', reportRouter)
app.use('/items', itemsRouter)

app.listen(3000, () => {
    console.log('Corriendo en el puerto 3000: \x1b[32m%s\x1b[0m', 'online')
})

// mtto/companies/
// mtto/sets/
// mtto/models/
// mtto/users/
