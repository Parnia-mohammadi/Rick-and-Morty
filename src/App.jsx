import "./App.css";
import {allCharacters} from "../data/data"
import NavBar from "./components/NavBar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="main">
        <CharacterList characters={allCharacters}/>
        <CharacterDetail />
      </div>
    </div>
  );
}
export default App;
