import { paintings, getStatus } from "./data/paintings";
import "./App.css";
function App() {
  return (
    <main>

      {paintings.map((painting) => (

        <article key={painting.id}>
          <h2>{painting.title}</h2>
          <p>{painting.price}</p>
          <p>{getStatus(painting)}</p>
        </article>))}
    </main>
  );
}
export default App;
