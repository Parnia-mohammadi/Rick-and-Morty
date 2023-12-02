import "./App.css";
import NavBar, { Search, SearchResult, Faivorites } from "./components/NavBar";
import CharacterList, { Character } from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
// import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Modal from "./components/Modal";
import { TrashIcon } from "@heroicons/react/24/outline";
import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [search, setSearch] = useState("");
  const { isLoading, characters } = useCharacters("https://rickandmortyapi.com/api/character?name",
    search
  );
  const [favourite, setFavourite] = useLocalStorage("FAVORITES",[]);
  const [selectedId, setSelectedId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  //delete favorite episodes
  const handleDelete = (id) => {
    setFavourite((prevFavourites) =>
      prevFavourites.filter((prevFavourite) => id != prevFavourite.id)
    );
  };
  const handleSelectedCharacter = (id) => {
    setSelectedId((prevId) => (prevId == id ? null : id));
    // setSelectedId(id);
  };
  //first way for handle favourite
  // const handleFavourite =(ch)=>{
  //   setFavourite((prevFavourite)=>{
  //     const uniqFavourites =prevFavourite.map((e)=>e.id== ch.id);
  //     // console.log(uniqFavourites);
  //     return(
  //     (uniqFavourites.includes(true))?([...prevFavourite]):([...prevFavourite, ch])
  //     )
  //   });
  // }
  //second way for handle favourite
  const handleFavourite = (char) => {
    setFavourite((prevFav) => [...prevFav, char]);
  };
  const isAddedToFavourite = favourite
    .map((Fav) => Fav.id)
    .includes(selectedId);
  //first way for fetch data and adding loading state
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => res.json())
  //     .then((data) => {setCharacters(data.results.slice(0, 5));
  //     setIsLoading(false);
  //     });
  // }, []);
  // console.log(favourite);

  return (
    <div className="App">
      <Toaster />
      <NavBar>
        <Search search={search} setSearch={setSearch} />
        <SearchResult searchResult={characters.length} />
        <Faivorites favourite={favourite} setIsOpen={setIsOpen} />
      </NavBar>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {favourite.map((item) => (
          <Character item={item} key={item.id}>
            <TrashIcon
              className="icon red"
              onClick={() => handleDelete(item.id)}
            />
          </Character>
        ))}
      </Modal>
      <Main>
        {/* first way for using loading state */}
        <CharacterList
          characters={characters}
          isLoading={isLoading}
          handleSelectedCharacter={handleSelectedCharacter}
          selectedId={selectedId}
        />
        {/* second way for using loading state */}
        {/* {isLoading ? <Loader/>:<CharacterList characters={characters}/>} */}
        <CharacterDetail
          selectedId={selectedId}
          handleFavourite={handleFavourite}
          isAddedToFavourite={isAddedToFavourite}
        />
      </Main>
    </div>
  );
}
export default App;

export function Main({ children }) {
  return <div className="main">{children}</div>;
}
