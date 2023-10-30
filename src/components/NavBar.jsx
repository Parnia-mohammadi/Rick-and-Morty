import { HeartIcon , SparklesIcon } from "@heroicons/react/24/outline";
function NavBar({children}) {
  return (
    <nav className="navbar">
      <NavbarLogo/>
      {children}
      <Faivorites/>
    </nav>
  );
}

export default NavBar;

function NavbarLogo(){
  return(
    <div className="navbar__logo"><span>Logo </span>
    <SparklesIcon style={{width: "1.5rem" ,height: "1.5rem", color:"yellow"
    }}/>
  </div>
  );
}

function Faivorites(){
  return(
    <button className="heart">
      <HeartIcon className="icon"/>
      <span className="badge">4</span>
    </button>
  );
}

export function Search({search, setSearch}){
  return(
  <input value={search} type="text" placeholder="search ..." 
  className="text-field" onChange={(e) => setSearch(e.target.value)} />);
}
export function SearchResult({searchResult}){
  return(
    <div className="navbar__result">Found {searchResult} character</div>
  );
}