import { paintingList } from "./data/paintings";
import "./App.css";
import PaintingCard from "./components/PaintingCard";
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  return (
    <>
      <Header />
      <main className="gallery">
        {paintingList.map((item) => (
          <PaintingCard key={item.id} art={item} />
        ))}
      </main>
      <Footer/>
    </>
  )
}
export default App;
