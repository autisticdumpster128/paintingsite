import { useEffect, useState } from "react";
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
  // Яка картина відкрита в попапі (
  const [selected, setSelected] = useState<PaintingType | null>(null);
  // Який текстовий попап відкритий: about / info / privacy
  const [page, setPage] = useState<PageKey | null>(null);
  // Чи відкрита форма контакту
  const [contactOpen, setContactOpen] = useState(false);
  // Про яку картину питають у формі 
  const [inquiry, setInquiry] = useState<PaintingType | null>(null);

  // Спершу ті, що продаються, потім — недоступні
  const sortedList = [...paintingList].sort((a, b) => Number(b.available) - Number(a.available));

  // Після того як сторінка завантажилась — тихо, у фоні, вантажимо всі великі фото.
  // Спершу головні фото кожної картини, потім додаткові (зблизька, інтер'єр...).
  useEffect(() => {
    const all = [
      ...paintingList.map((p) => p.images[0]),
      ...paintingList.flatMap((p) => p.images.slice(1)),
    ];
    let i = 0;
    let stopped = false;
    function loadNext() {
      if (stopped || i >= all.length) return;
      const img = new Image();
      img.onload = img.onerror = loadNext; // по одному, щоб не забивати інтернет
      img.src = all[i++];
    }
    function start() {
      loadNext();
      loadNext(); // два потоки паралельно
    }
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      stopped = true;
      window.removeEventListener("load", start);
    };
  }, []);

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
