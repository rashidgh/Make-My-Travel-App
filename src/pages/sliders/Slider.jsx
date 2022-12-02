import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Slider1 from './slaide1.1';
import Slider2 from './slider2.jpg';
import Slider3 from './slider3.jpg';
import Slider4 from './slider4.jpg'
const Slider = () => {
  return (
    <Carousel autoPlay={true} showArrows={false} infiniteLoop={true} showIndicators={false} showThumbs={false}>
      <div>
        <img src={Slider1} alt="slider1" />
        <aside className="legend">
          <h1>Goa</h1>
          <p className="legend1">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam
            mollitia commodi doloribus explicabo quos dolorem illo? Sapiente
            minima voluptas sunt rem incidunt explicabo possimus quam.
          </p>
          <button>view more</button>
        </aside>
      </div>
      <div>
        <img src={Slider2} alt="slider2" />
        <aside className="legend">
          <h1>Digha</h1>
          <p className="legend2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque
            numquam placeat nulla reiciendis corrupti illum aut nesciunt quia
            modi fugit autem aliquid, suscipit molestiae officia facere labore
            iste?
          </p>
          <button>view more</button>
        </aside>
      </div>
      <div>
        <img src={Slider3} alt="slider3" />
        <aside className="legend">
          <h1>Banglore</h1>
          <p className="legend3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
            fugiat voluptatum beatae, nemo error dignissimos vel temporibus
            inventore eum quo veniam.
          </p>
          <button>view more</button>
        </aside>
      </div>
      <div>
        <img src={Slider4} alt="slider3" />
        <aside className="legend">
          <h1>Mandya</h1>
          <p className="legend4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos
            veritatis pariatur harum blanditiis tempore consequuntur delectus,
            velit quasi voluptatem odio?
          </p>
        </aside>
      </div>
    </Carousel>
  );
}

export default Slider;