import { paintingList , type PaintingType} from "./data/paintings";
import "./App.css";
import PaintingCard from "./components/PaintingCard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getFill } from "./data/paintings";
import { useState } from "react";
import PaintingModal from "./components/PaintingModal";
import Modal from "./components/Modal";
import { type PageKey, pages } from "./data/pages";


function App() {

const sortedList=[...paintingList].sort((a,b)=> getFill(b)-getFill(a))
const [selected, setSelected] = useState<PaintingType | null>(null);
const [page,setPage]=useState <PageKey | null>(null);

  return (
    <>
      <Header />
      {selected && (
        <PaintingModal painting={selected} onClose={()=> setSelected(null)}/>
      )}
      <main className="gallery">
        {sortedList.map((item) => (
          <PaintingCard key={item.id} art={item} onClick={()=>setSelected(item)} />
        ))}
      </main>
      <Footer onOpen={setPage}/>


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
