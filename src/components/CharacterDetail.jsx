import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
// import { episodes } from "../../data/data";
import { useEffect, useState } from "react";
// import { character } from "../../data/data"
import Loader from "./Loader";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
function CharacterDetail({ selectedId, handleFavourite, isAddedToFavourite }) {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  //loading episodes
  // const [episodes,setEpisodes] = useState(null);
  useEffect(() => {
    async function fetchCharacter() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setSelectedCharacter(data);
        //first way for getting dynamic episodes(my way:))
        // const epi = data.episode.map((e) => e.split("/").pop());
        //second way
        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        // (epi.length==1)?(setEpisodes(epis)):(setEpisodes(epis.slice(0,5)))
        //second way
        // console.log([episodeData].flat().slice(0,6));
        setEpisodes([episodeData].flat().slice(0, 6));
      } catch (err) {
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    if (selectedId) fetchCharacter();
  }, [selectedId]);
  if (!selectedId || !selectedCharacter) {
    return <div style={{ flex: 1 }}>Please select a chararcter</div>;
  }
  if (isLoading) {
    return (
      <div style={{ flex: 1, color: "var(--slate-300)" }}>
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
            {isAddedToFavourite ? (
              <p>Already adde to favourites.</p>
            ) : (
              <button
                className="btn btn--primary"
                onClick={() => handleFavourite(selectedCharacter)}
              >
                Add to Favourite
              </button>
            )}
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
          {/* {(Array.isArray(episodes))?(
          episodes.map((item, index) => (
              <li key={item.id}>
                <div>
                  {String(index + 1).padStart(2, "0")} - {item.episode} :
                  <strong> {item.name}</strong>
                </div>
                <div className="badge badge--secondary">{item.air_date}</div>
              </li>
            ))):
            (
              <li>
              <div>
                01 - {episodes.episode} :
                <strong> {episodes.name}</strong>
              </div>
              <div className="badge badge--secondary">{episodes.air_date}</div>
            </li>
            )
            } */}
          {/* second way */}
          {episodes.map((item, index) => (
            <li key={item.id}>
              <div>
                {String(index + 1).padStart(2, "0")} - {item.episode} :
                <strong> {item.name}</strong>
              </div>
              <div className="badge badge--secondary">{item.air_date}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CharacterDetail;
