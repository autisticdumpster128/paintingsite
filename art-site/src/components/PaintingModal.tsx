import { type PaintingType, getStatus, formatPrice, formatSize } from "../data/paintings";
import { PiX } from "react-icons/pi";

function PaintingModal(props: { painting: PaintingType; onClose: () => void }) {
  return (
    <div className="modal-backdrop" onClick={props.onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={props.onClose} aria-label="Close">
          <PiX />
        </button>

        <img
          className="modal-image"
          src={props.painting.image}
          alt={props.painting.title}
        />

        <div className="modal-info">
          <h2 className="modal-title">{props.painting.title}</h2>
          <p className="modal-price">{formatPrice(props.painting.price)}</p>
          <p className="modal-meta">
            {formatSize(props.painting)} · {getStatus(props.painting)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaintingModal;