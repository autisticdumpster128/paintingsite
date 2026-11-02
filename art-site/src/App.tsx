import { paintingList , type PaintingType} from "./data/paintings";
import "./App.css";
import PaintingCard from "./components/PaintingCard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getFill } from "./data/paintings";
import { useState } from "react";
import PaintingModal from "./components/PaintingModal";


function App() {

const sortedList=[...paintingList].sort((a,b)=> getFill(b)-getFill(a))
const [selected, setSelected] = useState<PaintingType | null>(null);

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
      <Footer/>
    </>
  )
}
export default App;
