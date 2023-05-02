import { getFeaturedEvents } from "@/helpers/api-util";
import EventList from "../components/events/event-list";
import { Event } from "@/types/Event";
import { GetStaticProps } from "next";

interface Props {
  events: Event[];
}

const HomePage = ({ events }: Props) => {
  return (
    <div>
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
