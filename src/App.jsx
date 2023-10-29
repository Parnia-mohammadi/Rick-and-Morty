import "./App.css";
import NavBar from "./components/NavBar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);
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
  //first way for handling error in axios.then
  // useEffect(() => {
  //     setIsLoading(true);
  //     axios
  //       .get("https://rickandmortyapi.com/api/character")
  //       .then(({ data }) =>{
  //         setCharacters(data.results.slice(0, 5));}).catch((err)=>{
  //     setCharacters([]);
  //     toast.error(err.response.data.error);})
  //   .finally(()=>{
  //     setIsLoading(false);}
  //   )
  // }, []);
  //second way for fetch data
  useEffect(() => {
    async function fetchData() {
      //first way for handling error with res.ok
      // try{
      //   //adding loading state
      //   setIsLoading(true);
      //   const res = await fetch("https://rickandmortyapi.com/api/character");

      //   if (!res.ok) throw new Error("sth is wrong!");

      //   const data = await res.json();
      //   setCharacters(data.results.slice(0,5));
      // }catch(err){
      //   setCharacters([]);
      //   toast.error(err.message);
      // }
      //second way for handling error in axios for getting data from server
      try {
        const { data } = await axios.get(
          "https://rickandmortyapi.com/api/character"
        );
        // console.log(res.data.results);
        setCharacters(data.results.slice(0, 5));
      } catch (err) {
        setCharacters([]);
        // console.log(err);
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="App">
      <Toaster />
      <NavBar characters={characters} />
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
