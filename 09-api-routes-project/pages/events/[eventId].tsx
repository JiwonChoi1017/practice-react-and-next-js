import { GetStaticPaths, GetStaticProps } from "next";
import { getEventById, getFeaturedEvents } from "@/helpers/api-util";

import Comments from "@/components/input/comments";
import { Event } from "@/types/Event";
import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import Head from "next/head";

interface Props {
  selectedEvent: Event;
}

const EventDetailPage = (props: Props) => {
  const { selectedEvent } = props;

  if (!selectedEvent) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{selectedEvent.title}</title>
        <meta name="description" content={selectedEvent.description} />
      </Head>
      <EventSummary title={selectedEvent.title} />
      <EventLogistics
        date={selectedEvent.date}
        address={selectedEvent.location}
        image={selectedEvent.image}
        imageAlt={selectedEvent.title}
      />
      <EventContent>
        <p>{selectedEvent.description}</p>
      </EventContent>
      <Comments eventId={selectedEvent.id} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const eventId = context.params?.eventId;
  if (!eventId) {
    return {
      props: {
        selectedEvent: null,
      },
    };
  }

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default EventDetailPage;
