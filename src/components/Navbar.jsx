import { NavLink } from 'react-router-dom';
import { Clapperboard } from 'lucide-react'; // Importeer een passend icoon

function Navbar({ favCount }) {
    
    return (
        <nav className="navbar">
        <NavLink to="/" className="logo">
            <Clapperboard size={28} color="#e50914" strokeWidth={2.5} />
            <span>CineView</span>
        </NavLink>
        <div className="nav-links">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/popular">Populair</NavLink>
            <NavLink to="/favorites">Favorieten ({favCount})</NavLink>
        </div>
        </nav>
    );
}

export default Navbar;
