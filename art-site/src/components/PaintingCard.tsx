import { type PaintingType, getRatio } from "../data/paintings";

const ROW_HEIGHT = 280;

function PaintingCard(props: { art: PaintingType }) {
  const ratio = getRatio(props.art);

  return (
    <article
      className="card"
      style={{ flexGrow: ratio, flexBasis: ratio * ROW_HEIGHT }}
    >
        <div className="card-frame">
      <img
        className="card-image"
        style={{ aspectRatio: ratio }}
        src={props.art.image}
        alt={props.art.title}
      />
      </div>
      <h2 className="card-title">{props.art.title}</h2>
    </article>
  );
}

export default PaintingCard;