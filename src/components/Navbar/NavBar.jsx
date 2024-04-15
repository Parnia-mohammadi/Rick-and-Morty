import { HeartIcon, SparklesIcon } from "@heroicons/react/24/outline";
import style from "./Navbar.module.css";

function NavBar({ children }) {
  return (
    <nav className={style.navbar}>
      <NavbarLogo />
      {children}
    </nav>
  );
}

export default NavBar;

function NavbarLogo() {
  return (
    <div className={style.navbar__logo}>
      <span>Logo </span>
      <SparklesIcon
        style={{ width: "1.5rem", height: "1.5rem", color: "yellow" }}
      />
    </div>
  );
}

export function Faivorites({ favourite, setIsOpen }) {
  return (
    <button
      className={style.heart}
      onClick={() => {
        setIsOpen(true);
      }}
    >
      <HeartIcon className={style.icon} />
      <span className={style.badge}>{favourite.length}</span>
    </button>
  );
}

export function Search({ search, setSearch }) {
  return (
    <input
      value={search}
      type="text"
      placeholder="search ..."
      className="text-field"
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
export function SearchResult({ searchResult }) {
  return (
    <div className={style.navbar__result}>Found {searchResult} character</div>
  );
}
