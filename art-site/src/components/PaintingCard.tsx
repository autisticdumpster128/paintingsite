import { type PaintingType, getRatio, thumbOf } from "../data/paintings";
import { useSettings } from "../Settings";

// Базова висота ряду задається в App.css змінною --row-height
// (на телефоні вона інша). Більше число = більші картини, менше в ряду.

function PaintingCard(props: { art: PaintingType; onClick: () => void }) {
  const { t } = useSettings();
  const ratio = getRatio(props.art);

  return (
    <article
      className="card"
      onClick={props.onClick}
      style={{ flexGrow: ratio, flexBasis: `calc(${ratio} * var(--row-height))` }}
    >
      <div className="card-frame">
        <img
          className="card-image"
          style={{ aspectRatio: ratio }}
          src={thumbOf(props.art.images[0])}
          alt={props.art.title}
          loading="lazy"
        />
      </div>
      <h2 className="card-title">{props.art.title}</h2>
      {!props.art.available && <p className="card-status">{t.unavailable}</p>}
    </article>
  );
}

export default PaintingCard;
