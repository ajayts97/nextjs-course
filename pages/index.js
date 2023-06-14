import { Fragment } from "react";
import Head from 'next/head'
import MeetupList from "../components/meetups/MeetupList";
import {MongoClient} from 'mongodb'
// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'A first meetup',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//         address: 'Some address 5, 12345 Some City',
//         description: 'This is a first meetup'
//     },
//     {
//         id: 'm2',
//         title: 'A second meetup',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//         address: 'Some address 5, 12345 Some City',
//         description: 'This is a second meetup'
//     }
// ]

function HomePage(props) {
    // const [loadedMeetups, setLoadedMeetups] = useState([]);

    // useEffect(() => {
    //     setLoadedMeetups(DUMMY_MEETUPS);
    // }, [])

    return (
        <Fragment>
        <MeetupList meetups={props.meetups} />
        </Fragment>
    )
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
   const client = await MongoClient.connect('mongodb+srv://ajayts2697:zTxBpXwuBhSSpAOI@cluster0.jdv34vv.mongodb.net')
        
    const db = client.db("meetups");

    const meetupCollection = db.collection('meetups')

    const meetups =await meetupCollection.find().toArray()

    client.close()

    return {
        props: {
            meetups: meetups.map(meetup => ({
                id: meetup._id.toString(),
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                description: meetup.description
            }))
        },
        revalidate: 10
    }
}

export default HomePage;