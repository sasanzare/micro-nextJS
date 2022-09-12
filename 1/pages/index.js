import { getFeaturedEvents } from "../dummy-data";
import EventList from "../blocks/events/event-list";
export default function HomePage() {

  const featuredEvents = getFeaturedEvents();
  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center ">
      <div className="row">
      <EventList items={featuredEvents} />
      </div>
    </div>
  )
}
