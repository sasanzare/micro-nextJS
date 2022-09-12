import ExploreButton from "../../microcomponents/explore-button";
import AddressIcon from "../../microcomponents/icons/address-icon";
import ArrowRightIcon from "../../microcomponents/icons/arrow-right-icon";
import DateIcon from "../../microcomponents/icons/date-icon";

export default function EventItem(props){

    const {title, image, date, location, id} = props;

    return (
         <div className="shadow mt-4 rounded media">
            <div className="d-flex">
               
                <img className="col-5 p-0" src={'/' + image} alt={title} />
              
                
                <div className="col-7 p-2 d-flex flex-column justify-content-between h-180">
                    <div>
                        <h5>{title}</h5>
                        <time className="small">
                            <DateIcon  width={21} /> {new Date(date).toLocaleDateString('en-US',{day: 'numeric',month: "long",year: 'numeric'})}</time>
                        <address className="small pt-1 font-italic">
                            <AddressIcon  width={21}  /> {location.replace(", ", "\n")}</address>
                    </div>
                    <div className="text-right">
                        <ExploreButton link={`/events/${id}`}><small>Explore Event</small> 
                            <ArrowRightIcon width={18} />
                        </ExploreButton>
                    </div>
                </div>
                
            </div>
            
         </div>
    );
}