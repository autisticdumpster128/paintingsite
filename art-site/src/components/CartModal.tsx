import Modal from "./Modal";
import { type PaintingType, formatPrice } from "../data/paintings";
import { useState } from "react";

const FORM_URL = "https://formspree.io/f/mdeejrya";

function CartModal(props: {
    items: PaintingType[];
    onClose: () => void;
    onRemove: (painting: PaintingType) => void;
    onOrdered: () => void;
}) {
    const total = props.items.reduce((sum, item) => sum + item.price, 0);

    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [comment, setComment] = useState("");
    const [contactMail, setcontactMail] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("sending");

        const response = await fetch(FORM_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
                name: name,
                contact: contact,
                email: contactMail,
                comment: comment,
                paintings: props.items.map((item) => item.title).join(", "),
                total: formatPrice(total),
            }),
        });

        if (response.ok) {
            setStatus("sent");
            props.onOrdered();
        } else {
            setStatus("error");
        }
    }


        return (
        <Modal onClose={props.onClose}>
            <div className="modal-info">
                <h2 className="modal-title">Cart</h2>

                {/* НОВЕ: повідомлення після відправки */}

                {status === "sent" && <p>Thank you! I will contact you soon.</p>}
                {status === "error" && <p>Something went wrong. Please try again.</p>}

                {/* НОВЕ: додано status !== "sent" && на початку */}

                {status !== "sent" && props.items.length === 0 && <p>Cart is empty</p>}

                {props.items.map((item) => (
                    <div className="cart-item" key={item.id}>
                        <p>{item.title}</p>
                        <p>{formatPrice(item.price)}</p>
                        <button onClick={() => props.onRemove(item)}>Remove</button>
                    </div>
                ))}

                {props.items.length > 0 && (
                    <p className="cart-total">Total: {formatPrice(total)}</p>
                )}

                {props.items.length > 0 && (
                    /* НОВЕ: onSubmit={handleSubmit} */
                    <form className="order-form" onSubmit={handleSubmit}>
                        <input
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            placeholder="Phone number or Tg"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="eMail"
                            value={contactMail}
                            onChange={(e) => setcontactMail(e.target.value)}
                        />
                        <textarea
                            placeholder="Comment (optional)"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />

                        {/* НОВЕ: кнопка неактивна і пише «Sending...» під час відправки */}
                        <button className="modal-add" type="submit" disabled={status === "sending"}>
                            {status === "sending" ? "Sending..." : "Send order"}
                        </button>
                    </form>
                )}
            </div>
        </Modal>
    );
}

export default CartModal;