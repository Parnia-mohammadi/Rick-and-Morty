import { useEffect, useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from "./components/Navbar";
import Loader from "./components/Loader";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const res = await fetch("https://rickandmortyapi.com/api/characterss");
      const data = await res.json();
      setCharacters(data.results.slice(0, 5));
      setIsLoading(false);
    }
    fetchData();
  }, []);

  // useEffect(() => {
  // setIsLoading(true);
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => res.json())
  //     .then((data) => {
  //    setCharacters(data.results.slice(0, 5))
  //   setIsLoading(false)
  // });
  // }, []);

  // then catch => aync await. ???
  // async function test(){}
  // async ()=>{}

  return (
    <div className="app">
      <Navbar>
        <SearchResult numOfResult={characters.length} />
      </Navbar>
      <Main>
        <CharacterList characters={characters} isLoading={isLoading} />
        <CharacterDetail />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}

// props drilling : A, B,X C, D, E

// characters => App  => CahracterList
