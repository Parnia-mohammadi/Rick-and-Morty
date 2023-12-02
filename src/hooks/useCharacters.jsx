import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export default function useCharacters(url, search ) {
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState([]);
  //first way for handling error in axios.then
  // useEffect(() => {
  //     setIsLoading(true);
  //     axios
  //       .get(`${url}=${search}`)
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
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      //first way for handling error with res.ok
      try {
        //adding loading state
        setIsLoading(true);
        const res = await fetch(`${url}=${search}`, { signal });

        if (!res.ok) throw new Error("sth is wrong!");

        const data = await res.json();
        setCharacters(data.results.slice(0, 5));
      } catch (err) {
        if (err.name != "AbortError") {
          setCharacters([]);
          toast.error(err.message);
        }
      } finally {
        setIsLoading(false);
      }
      //second way for handling error in axios for getting data from server
      // try {
      //   setIsLoading(true);
      //   if (search != "" && search.length >= 3) {
      //     const { data } = await axios.get(
      //       `${url}=${search}`,{signal}
      //     );
      //     // console.log(res.data.results);
      //     setCharacters(data.results);
      //   }
      //   if (search.length < 3) {
      //     const { data } = await axios.get(
      //       "https://rickandmortyapi.com/api/character",{signal}
      //     );
      //     // console.log(res.data.results);
      //     setCharacters(data.results.slice(0, 5));
      //   }
      // } catch (err) {
      //   // if(!axios.isCancel()){
      //   setCharacters([]);
      //   toast.error(err.response.data.error);
      // } finally {
      //   setIsLoading(false);
      // }
    }
    // if (search.length < 3) {
    //   setCharacters([]);
    //   return;
    // }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [search]);
  return { isLoading, characters };
}
