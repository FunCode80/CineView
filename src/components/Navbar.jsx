import { NavLink } from 'react-router-dom';

function Navbar({ favCount }) {
  return (
    <nav className="navbar">
      <NavLink to="/" className="logo"><h1>CineView</h1></NavLink>
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/popular">Populair</NavLink>
        <NavLink to="/favorites">Favorieten ({favCount})</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
