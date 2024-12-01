import "./Footer.css"
import Wpp from "../../assets/img/logowpp.png"
import { Link } from 'react-router-dom';

function Footer(){
    return(  
        <footer className="footer">
        <div >
            <a className="nav-link mt-4"><Link to="/Nosotros">Nosotros</Link></a>
            <a className="nav-link mt-3"><Link to="/Contacto">Contacto</Link></a>
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