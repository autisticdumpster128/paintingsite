import { getStatus, type PaintingType} from "../data/paintings";

function PaintingCard(props:{art: PaintingType}){
    return(
        <article>
            <h2>{props.art.title}</h2>
            <p>{props.art.price}</p>
            <p>{getStatus(props.art)}</p>
        </article>
    );
}
export default PaintingCard