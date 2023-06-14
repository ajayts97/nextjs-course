import MeetupDetail from "../../components/meetups/MeetupDetail"
import { MongoClient, ObjectId } from "mongodb";

function  MeetupDetails(props) {

    return <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content="Browse a huge list of highly active React meetups!"/>
            </Head>
            <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
            />
        </Fragment>
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://ajayts2697:zTxBpXwuBhSSpAOI@cluster0.jdv34vv.mongodb.net')
        
    const db = client.db("meetups");

    const meetupCollection = db.collection('meetups')

    const meetups = await meetupCollection.find({}, { id: 1}).toArray()
    client.close()

    return {
        fallback: false,
        paths: meetups.map(meetup => ({
            params: {
                meetupId: meetup._id.toString()
            }
        }))
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://ajayts2697:zTxBpXwuBhSSpAOI@cluster0.jdv34vv.mongodb.net')
        
    const db = client.db("meetups");

    const meetupCollection = db.collection('meetups')

    // const meetups = await meetupCollection.find({}, { id: 1}).toArray()
    const selectedMeetup = await meetupCollection.findOne({_id: new ObjectId(meetupId)})
    client.close()

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                address: selectedMeetup.address,
                description: selectedMeetup.description
            }
        }
    }

}

export default MeetupDetails