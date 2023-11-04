import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { episodes } from "../../data/data";
import { useEffect ,useState } from "react";
// import { character } from "../../data/data"
import Loader from "./Loader";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
function CharacterDetail({ selectedId }) {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchCharacter() {
      try {
        setIsLoading(true);
        const {data} = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        // console.log(data.episode);
        setSelectedCharacter(data);
        console.log(data.episode.slice(0,3));
        data.episode.slice(0,3).map((e)=>{
        const epis = axios.get(e);
        console.log(epis);
        });
      } catch (err) {
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    if(selectedId) fetchCharacter();
  }, [selectedId]);
  if (!selectedId || !selectedCharacter) {return(
    <div style={{flex:1}}>Please select a chararcter</div>
  );}
  if (isLoading) {
    return (
      <div style={{flex:1, color:"var(--slate-300)"}}>
        <Loader />
      </div>
    );
  }
  return (
    <div style={{ flex: 1 }}>
      <div className="character-detail">
        <img
          className="character-detail__img"
          src={selectedCharacter.image}
          alt={selectedCharacter.name}
        />
        <div className="character-detail__info">
          <h3 className="name">
            {selectedCharacter.gender == "Male" ? (
              <span>&#128102;</span>
            ) : (
              <span>&#x1F469;</span>
            )}
            <span> {selectedCharacter.name}</span>
          </h3>
          <div className="info">
            <span
              className={`status ${
                selectedCharacter.status == "Dead" ? "red" : ""
              }`}
            ></span>
            <span>&nbsp;{selectedCharacter.status}</span>
            <span>&nbsp;- {selectedCharacter.species}</span>
          </div>
          <div className="location">
            <p>Last known location</p>
            <p>{selectedCharacter.location.name}</p>
          </div>
          <div className="actions">
            <button className="btn btn--primary">Add to Favourite</button>
          </div>
        </div>
      </div>
      <div className="character-episodes">
        <div className="title">
          <h2 className="name">List of episodes:</h2>
          <ArrowUpCircleIcon className="icon" />
        </div>
        <ul>
          {/* first way using static data */}
          {episodes.map((item, index) => (
            <li key={item.id}>
              <div>
                {String(index + 1).padStart(2, "0")} - {item.episode} :
                <strong> {item.name}</strong>
              </div>
              <div className="badge badge--secondary">{item.air_date}</div>
            </li>
          ))}
          {/* second way using dynamic data */}
          {/* {console.log(selectedCharacter.episode)} */}
        </ul>
      </div>
    </div>
  );
}

export default CharacterDetail;
