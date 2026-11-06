import { paintingList, type PaintingType } from "./data/paintings";
import "./App.css";
import PaintingCard from "./components/PaintingCard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getFill } from "./data/paintings";
import { useState } from "react";
import PaintingModal from "./components/PaintingModal";
import Modal from "./components/Modal";
import { type PageKey, pages } from "./data/pages";
import CartModal from "./components/CartModal";


function App() {

  const sortedList = [...paintingList].sort((a, b) => getFill(b) - getFill(a))
  const [selected, setSelected] = useState<PaintingType | null>(null);
  const [page, setPage] = useState<PageKey | null>(null);
  const [cart, setCart] = useState<PaintingType[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  function addToCart(painting: PaintingType) {
    if (painting.sold) {
      return;
    }
    if (cart.some((item) => item.id === painting.id)) {
      return;
    }

    setCart([...cart, painting]);
  }

  function removeFromCart(painting:PaintingType){
    setCart(cart.filter((item)=> item.id!== painting.id))
  }

  return (
    <>
      <Header
        cartCount={cart.length}
        onCartClick={()=>{setCartOpen(true)}} />

      {cartOpen && (
        <CartModal
          items={cart}
          onClose={ ()=> setCartOpen(false)}
          onRemove={removeFromCart}
          onOrdered={() => setCart([])}
        />
      )}

      {selected && (
        <PaintingModal
          painting={selected}
          onClose={() => setSelected(null)}
          onAdd={addToCart}
          inCart={cart.some((item) => item.id === selected.id)} />
      )}
      <main className="gallery">
        {sortedList.map((item) => (
          <PaintingCard key={item.id} art={item} onClick={() => setSelected(item)} />
        ))}
      </main>
      <Footer onOpen={setPage} />


      {page && (
        <Modal onClose={() => setPage(null)}>
          <div className="modal-info">
            <h2 className="modal-title">{pages[page].title}</h2>
            <p>{pages[page].text}</p>
          </div>
        </Modal>
      )}
    </>

  )
}
export default App;
