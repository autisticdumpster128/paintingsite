import { type PaintingType, getStatus, formatPrice, formatSize } from "../data/paintings";
import Modal from "./Modal"


function PaintingModal(props: {
  painting: PaintingType;
  onClose: () => void
  onAdd: (painting: PaintingType) => void;
  inCart: boolean;
}) {


  return (

    <Modal onClose={props.onClose}>
      <img
        className={props.painting.sold ? "modal-image modal-image--sold" : "modal-image"}
        src={props.painting.image}
        alt={props.painting.title}
      />

      <div className="modal-info">
        <h2 className="modal-title">{props.painting.title}</h2>
        <p className="modal-price">{formatPrice(props.painting.price)}</p>
        <p className="modal-meta">
          {formatSize(props.painting)} · {getStatus(props.painting)}
        </p>
        <button
          className="modal-add"
          disabled={props.painting.sold || props.inCart}
          onClick={() => props.onAdd(props.painting)}
        >
          {props.painting.sold ? "Sold" : props.inCart ? "In cart" : "Add to cart"}
        </button>

      </div>

    </Modal>
  );
}

export default PaintingModal;