import Link from "next/link";

export default function ExploreButton(props){
    return(
        <Link href={props.link}>
            <a className="btn btn-info">{props.children}</a>
        </Link>
    );
}