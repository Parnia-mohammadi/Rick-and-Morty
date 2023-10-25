import "./App.css";
import NavBar from "./components/NavBar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";

function App() {
  const [characters, setCharacters] = useState(allCharacters);
  const [isLoading, setIsLoading] = useState(false);
  //first way for fetch data and adding loading state
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => res.json())
  //     .then((data) => {setCharacters(data.results.slice(0, 5));
  //     setIsLoading(false);
  //     });
  // }, []);
  //second way for fetch data
  useEffect(()=>{
    async function fetchData(){
      //adding loading state
      setIsLoading(true);
      const res = await fetch("https://rickandmortyapi.com/api/character");
      const data = await res.json();
      setCharacters(data.results.slice(0,5));
      setIsLoading(false);
    }
    fetchData();
  },[])
  return (
    <div className="App">
      <NavBar />
      <div className="main">
        {/* first way for using loading state */}
        <CharacterList characters={characters} isLoading={isLoading} />
        {/* second way for using loading state */}
        {/* {isLoading ? <Loader/>:<CharacterList characters={characters}/>} */}
        <CharacterDetail />
      </div>
    </div>
  );
}
export default App;
