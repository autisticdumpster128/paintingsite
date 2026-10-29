import { type PaintingType } from "../data/paintings";

function PaintingCard(props: { art: PaintingType }) {
    return (
        <article className="card">
            <img className="card-image" src={props.art.image} alt={props.art.title} />
            <h2 className="card-title">{props.art.title}</h2>
        </article>
    );
}
export default PaintingCard