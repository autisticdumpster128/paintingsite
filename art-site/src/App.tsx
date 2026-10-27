import { paintingList } from "./data/paintings";
import "./App.css";
import PaintingCard from "./components/PaintingCard";
function App() {
  return (
    <main className="gallery">
      {paintingList.map((item) => (
        <PaintingCard key={item.id} art={item} />
      ))}
    </main>
  )
}
export default App;
