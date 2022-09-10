import Link from "next/link";
export default function EventItem(props){

    const {title, image, date, location, id} = props;

    const humanReadableDate = new Date(date).toLocaleDateString('en-US',{
        day: 'numeric',
        month: "long",
        year: 'numeric'
    });

    // const formattedAddress = location.replace(", ", "\n");


    return (
         <li className="row">
            <img src={'/' + image} alt={title} />
            <div>
                <h2>{title}</h2>
                <time>{humanReadableDate}</time>
                <address>{location.replace(", ", "\n")}</address>
            </div>
            <div>
                <Link href={`/events/${id}`}>Explore Event</Link>
            </div>
         </li>
    );
}