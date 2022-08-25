const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

const utilisateurs = require('./routes/utilisateurs')
const produits = require('./routes/produits')
app.use(express.json())


app.get('/', (req,res)=> {
    res.send('Welcome to the app marketSearch')
})

app.use('/api/utilisateurs',utilisateurs)
app.use('/api/produits',produits)

mongoose.connect('mongodb+srv://Arfaoui_Chayma:adminadmin@cluster0.b38myqm.mongodb.net/MarketSearch?retryWrites=true&w=majority')
    .then(result => {
        app.listen(port,() => console.log(`Server is running on port ${port}`))
    })
    .catch(err => console.log('err'))

const port = process.env.PORT || 3000

