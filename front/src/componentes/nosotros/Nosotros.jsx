import "./Nosotros.css"


function Nosotros() {
    const placeholderUrl1 = 'https://placehold.co/500x90?text=Imagen+de+Peluquería';
    const placeholderUrl2 = 'https://placehold.co/500x90?text=Imagen+de+Manicuría';
    const placeholderUrl3 = 'https://placehold.co/500x90?text=Imagen+de+Esculpidas';
    return (

        <div className="cajaContenedoraNosotros">

            <div className="textoNosotros">
                <h2>Quienes somos?</h2>
                <p>Somos un local de estética con más de 10 años de experiancia en el rubro, dedicaco a dar lo mejor en cada
                    servicio para que cada clienta se sienta única en su estadía en nuestro local.</p>
                <p>contamos con garantías en todos nuestros servicios para tu tranquilidad. Contamos con productos de
                    primera calidad de elaboración propia.</p>
                <p>Cada una de nuestras profesionales esta capacitada en una especialización diferente.</p>
            </div>
        </div>
    )
}

export default Nosotros