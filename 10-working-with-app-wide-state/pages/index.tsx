import { Event } from "@/types/Event";
import EventList from "../components/events/event-list";
import { GetStaticProps } from "next";
import Head from "next/head";
import NewsletterRegistration from "@/components/input/newsletter-registration";
import { getFeaturedEvents } from "@/helpers/api-util";

interface Props {
  events: Event[];
}

const HomePage = ({ events }: Props) => {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
};

export default HomePage;
