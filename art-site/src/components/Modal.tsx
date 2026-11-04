import type { ReactNode } from "react";
import { PiX } from "react-icons/pi";

function Modal(props: {onClose: ()=> void; children: ReactNode}){
return(
 
 <div className="modal-backdrop" onClick={props.onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={props.onClose} aria-label="Close">
          <PiX />
        </button>

        {props.children}
      </div>
    </div>
);
}

export default Modal;