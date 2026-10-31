import { paintingList } from "./data/paintings";
import "./App.css";
import PaintingCard from "./components/PaintingCard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getFill } from "./data/paintings";


function App() {
const sortedList=[...paintingList].sort((a,b)=> getFill(b)-getFill(a))
  return (
    <>
      <Header />
      <main className="gallery">
        {sortedList.map((item) => (
          <PaintingCard key={item.id} art={item} />
        ))}
      </main>
      <Footer/>
    </>
  )
}
export default App;
