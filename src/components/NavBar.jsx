import { HeartIcon , SparklesIcon } from "@heroicons/react/24/outline";
function NavBar({characters}) {
  return (
    <nav className="navbar">
      <div className="navbar__logo"><span>Logo </span>
        <SparklesIcon style={{width: "1.5rem" ,height: "1.5rem", color:"yellow"
        }}/>
      </div>
      <input type="text" placeholder="search ..." className="text-field" />
      <div className="navbar__result">Found {characters.length} character</div>
      <button className="heart">
        <HeartIcon className="icon"/>
        <span className="badge">4</span>
      </button>
    </nav>
  );
}

export default NavBar;
