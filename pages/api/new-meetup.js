// /api/new-meetup
import { MongoClient } from 'mongodb'
async function handler(req, res) {
    if(req.method === 'POST') {
        const data = req.body
        console.log(data)

        const client = await MongoClient.connect('mongodb+srv://ajayts2697:zTxBpXwuBhSSpAOI@cluster0.jdv34vv.mongodb.net')
        
        const db = client.db("meetups");

        const meetupCollection = db.collection('meetups')
        const result = await meetupCollection.insertOne(data)

        console.log(result);
        client.close()

        res.status(201).json({message: 'Meetup created'})
    }
}


export default handler