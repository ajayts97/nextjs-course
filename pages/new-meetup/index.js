import { Fragment } from "react";
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";

function NewMeetupPage() {
    const router = useRouter();

    async function addMeetupHandler(meetupData) {
        const response = await fetch('http://localhost:3000/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(meetupData),
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        })

        const data = await response.json();
        console.log(data);
        router.push('/');
    } 
    return <Fragment>
            <Head>
                <title>Next Meetups</title>
                <meta name="description" content="Browse a huge list of highly active React meetups!"/>
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}  />
        </Fragment>
}

export default NewMeetupPage;