import "./GoogleMaps.css";

function GoogleMaps() {
    const GoogleMaps = "<iframe src=https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3289.798779399407!2d-58.52463262337909!3d-34.457255449779446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcafd86c10fd91%3A0xfdf5b2c1f3de27ca!2sVery%20nails!5e0!3m2!1ses!2sar!4v1722033360243!5m2!1ses!2sar width=320 height=350 style=border:0; allowfullscreen='' loading=lazy referrerpolicy=no-referrer-when-downgrade></iframe>"
    return (

        <section className="cajaPadreMaps">
            
                <div className="contenedorSection">
                    <div className="mapaGoogleIndex" dangerouslySetInnerHTML={{ __html: GoogleMaps }} />
                    <p>Av. del Libertador 17610, Beccar</p>
                </div>
            
        </section>
    )
}

export default GoogleMaps;