import { useState } from "react";
import "./App.css";
import { paintingList, type PaintingType } from "./data/paintings";
import { type PageKey } from "./data/texts";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PaintingCard from "./components/PaintingCard";
import PaintingModal from "./components/PaintingModal";
import ContactModal from "./components/ContactModal";
import PageModal from "./components/PageModal";

function App() {
  // Яка картина відкрита в попапі (null = жодна)
  const [selected, setSelected] = useState<PaintingType | null>(null);
  // Який текстовий попап відкритий: about / info / privacy
  const [page, setPage] = useState<PageKey | null>(null);
  // Чи відкрита форма контакту
  const [contactOpen, setContactOpen] = useState(false);
  // Про яку картину питають у формі (null = просто «зв'язатися»)
  const [inquiry, setInquiry] = useState<PaintingType | null>(null);

  // Спершу ті, що продаються, потім — недоступні
  const sortedList = [...paintingList].sort((a, b) => Number(b.available) - Number(a.available));

  function openContact(painting: PaintingType | null) {
    setSelected(null); // закриваємо попап картини, щоб не було два один на одному
    setInquiry(painting);
    setContactOpen(true);
  }

  return (
    <>
      <Header onContactClick={() => openContact(null)} />

      <main className="panel">
        <div className="gallery">
          {sortedList.map((item) => (
            <PaintingCard key={item.id} art={item} onClick={() => setSelected(item)} />
          ))}
        </div>
      </main>

      <Footer onOpen={setPage} onContact={() => openContact(null)} />

      {selected && (
        <PaintingModal painting={selected} onClose={() => setSelected(null)} onInquire={openContact} />
      )}

      {contactOpen && <ContactModal painting={inquiry} onClose={() => setContactOpen(false)} />}

      {page && <PageModal page={page} onClose={() => setPage(null)} />}
    </>
  );
}

export default App;
