import "./Contacto.css";
import Wpp from "../../assets/img/logowpp.png"
import Ig from "../../assets/img/logoIg.png"

function Contacto() {
    return (
        <div class="cajaContenedoraContac">
        <div class="cajaSecundariaCont">
            <h1>Buscanos en:</h1>
            <div class="cajaLogosCont">
                <div>
                    <h3>WhatSapp</h3>
                    <a href="https://wa.me/1530288807">
                    <img src={Wpp} alt="" className="wppImgContacto"/>
                    </a>
                </div>
                <div>
                    <h3>Instagram</h3>
                    <a href="https://www.instagram.com/verynails.nailbar/?hl=es">
                    <img src={Ig} alt="" className="igImgContacto" />
                    </a>
                </div>
            </div>
        </div>






    </div>
            )
}

export default Contacto