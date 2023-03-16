//will not be included in client side bundle
//this feature is built-in to nextjs
import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg?20130611211153",
//     address: "Some Address",
//     description: "This is a meetup!",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg?20130611211153",
//     address: "Some Address",
//     description: "This is a meetup!",
//   },
//   {
//     id: "m3",
//     title: "A Third Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg?20130611211153",
//     address: "Some Address",
//     description: "This is a meetup!",
//   },
// ];

function HomePage(props) {
  return (
  <Fragment>
    <Head>
      <title>React Meetups</title>
      <meta
        name='descripton'
        content='Browse a huge list of highly active React meetups'
      />
    </Head>
    <MeetupList meetups={props.meetups} />
  </Fragment>
  );
}

// export async function getServerSideProps(context){

//   const req = context.req;
//   const res = context.res;
  
//   //   //fetch data from API, or database
  
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps(){
  //fetch data from API, or database

    const client = await MongoClient.connect(
      'mongodb+srv://tom:Bn6mK6cqq5z6dibj@cluster0.dfgdo.mongodb.net/meetups?retryWrites=true&w=majority'
    );

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();
    
    console.log(meetups);
    
    client.close();
  
    // res.status(201).json({ message: 'Meetup records retrieved!'});
  

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      })),
    },

    revalidate: 10

  };
}

export default HomePage;
