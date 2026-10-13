import { paintings, getStatus } from "./data/paintings";
function App(){
  const first=paintings[0]
  return(
    <main>
      <h1>{first.title}</h1>
      <p>{first.price}</p>
      <p>{getStatus(first)}</p>
    </main>
  );
}
export default App;
