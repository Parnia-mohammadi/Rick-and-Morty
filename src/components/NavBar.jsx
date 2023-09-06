import { HeartIcon } from "@heroicons/react/24/outline";
function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">Logo</div>
      <input type="text" placeholder="search ..." className="text-field" />
      <div className="navbar__result">Found x character</div>
      <button className="heart">
        <HeartIcon className="icon"/>
        <span className="badge">4</span>
      </button>
    </nav>
  );
}

export default NavBar;
