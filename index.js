const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const path = require('path')

require('dotenv').config();

const utilisateurs = require('./routes/utilisateurs')
const vendeurs = require('./routes/vendeurs')
const produits = require('./routes/produits')
const administrateurs = require('./routes/administrateurs')
const categories = require('./routes/categories')
const scategories = require('./routes/sous_categories')
const favoris = require('./routes/favoris')
const upload = require("./routes/images")

app.use(cors())
app.use(express.json())

app.use(express.static('uploads'));

app.get('/', (req, res) => {
    res.send('Welcome to the app marketSearch')
})

app.use('/api/utilisateurs', utilisateurs)
app.use('/api/produits', produits)
app.use('/api/admins', administrateurs)
app.use('/api/categories', categories)
app.use('/api/sous_categories', scategories)
app.use('/api/favoris', favoris)
app.use('/api/vendeurs', vendeurs)
app.use('/api', upload)

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.b38myqm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then(result => {
        app.listen(port, () => console.log(`Server is running on port ${port}`))
    })
    .catch(err => console.log('err'))

const port = process.env.PORT || 3000