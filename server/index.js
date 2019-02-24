const app = require('express')()
const MongoClient = require('mongodb').MongoClient

app.get('/', (req, res) => {
    MongoClient.connect('mongodb://mongo:27017', function (err, client) {
        if(err){
            res.send({error: 'Can not connect to mongo'})
            return
        }

        res.send({success: 'Connected to mongo....'})
        
})
})


app.listen(3000, () => {
    console.log('successfully started server.')
})
