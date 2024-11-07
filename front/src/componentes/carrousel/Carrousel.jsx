
import Carousel from 'react-bootstrap/Carousel';
import "./Carrousel.css"


function Carrousel() {
  const placeholderUrl1 = 'https://placehold.co/500x90?text=Imagen+de+Peluquería';
  const placeholderUrl2 = 'https://placehold.co/500x90?text=Imagen+de+Manicuría';
  const placeholderUrl3 = 'https://placehold.co/500x90?text=Imagen+de+Esculpidas';
  return (
    <div className="mb-5 ContenedorCarrousel">
      <Carousel slide={false}>

          <Carousel.Item>
        <div className='cajaimagen'>
            <img src={placeholderUrl1} alt="Placeholder" className='fotoCarousel' />

        </div>
          </Carousel.Item>

        <Carousel.Item>
          <img src={placeholderUrl2} alt="Placeholder" className='fotoCarousel' />

        </Carousel.Item>
        <Carousel.Item>
          <img src={placeholderUrl3} alt="Placeholder" className='fotoCarousel' />

        </Carousel.Item>
      </Carousel>
    </div>

  );
}

export default Carrousel;