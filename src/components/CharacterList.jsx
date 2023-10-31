import { EyeIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";
function CharacterList({ characters, isLoading,setSelectedId }) {
  // first way for using loading state
  // if (isLoading) return(
  //   <div className="characters-list"><Loader/></div>
  // )
  return (
    <div className="characters-list">
      {/* second way for using loading state */}
      {isLoading ? <Loader/> : (characters.map((item) => (
        <Character key={item.id} item={item} setSelectedId ={setSelectedId} />
      )))}
    </div>
  );
}

export default CharacterList;

function Character({ item, setSelectedId }) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <h3 className="name">
        {item.gender == "Male" ? (
          <span>&#128102;</span>
        ) : (
          <span>&#x1F469;</span>
        )}
        <span> {item.name}</span>
      </h3>
      <div className="list-item__info info">
        <span className={`status ${item.status == "Dead" ? "red" : ""}`}></span>
        <span> {item.status}</span>
        <span> - {item.species}</span>
      </div>
      <button className="icon red" onClick={() => setSelectedId(item.id)}>
        <EyeIcon />
      </button>
    </div>
  );
}
