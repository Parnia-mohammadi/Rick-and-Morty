import "./App.css";
import NavBar from "./components/NavBar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="main">
        <CharacterList />
        <CharacterDetail />
      </div>
    </div>
  );
}
export default App;
