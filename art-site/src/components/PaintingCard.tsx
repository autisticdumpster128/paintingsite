import { getStatus, type PaintingType, formatPrice } from "../data/paintings";

function PaintingCard(props: { art: PaintingType }) {
    return (
        <article className="card">
            <img className="card-image" src={props.art.image} alt={props.art.title} />
            <h2 className="card-title">{props.art.title}</h2>
            <p className="card-text">{getStatus(props.art)}</p>
            <p className="card-text">{formatPrice(props.art.price)}</p>
        </article>
    );
}
export default PaintingCard