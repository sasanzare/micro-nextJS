import EventItem from "../../components/events/event-item";

export default function EventList(props){
    const {items} = props;

    return(
        <div className="col-lg-4 col-md-5 col-sm-8 col-12 mx-auto">
            {items.map(event => (
            <EventItem 
                key={event.id}
                id={event.id}
                title={event.title}
                location={event.location}
                date={event.date}
                image={event.image}
            />))}
        </div>
    );
}