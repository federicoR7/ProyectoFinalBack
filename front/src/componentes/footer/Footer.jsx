import "./Footer.css"
import Wpp from "../../assets/img/logowpp.png"
import { Link } from 'react-router-dom';

function Footer(){
    return(
        
        <footer className="footer">
        <div className="mt-3">
            <a className="nav-link"><Link to="/Nosotros">Nosotros</Link></a>
            <a className="nav-link"><Link to="/Contacto">Contacto</Link></a>
        </div>
        <aside className="whatsapp">
            <a href="https://wa.me/1530288807">
            <img src={Wpp} alt="" className="wppImg"/>
                
            </a>
        </aside>
    </footer>

        
        
    )
}

export default Footer;