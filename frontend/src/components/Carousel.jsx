import React from "react";
import data from "../data.json"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/carousel.css";
import { Autoplay, Navigation, Grid, Pagination } from "swiper";

export default function Carousel() {

  return (
    <div className="container_carousel">
      <div className="carousel_title">
        <h2>Popular MyTineraries</h2>
      </div>
      <Swiper
        slidesPerGroup={2}
        slidesPerView={2}
        grid={{
          rows: 2
        }}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 6500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation, Grid, Pagination]}

      >
        {/* Mapeo el data.json, le doy un parametro con una funcion flecha que me va a retornar un array de las imagenes de las cities. */}
        {data.map(cities => {
          return (

            // Las KEYS ayudan a indentificar que items han cambiado, son agregados o eliminados. Deben ser daas a los elementos dentro del array para darle a los elementos una identidad estable.
            <SwiperSlide className="mySwiper" key={cities.id} style={{ backgroundImage: `url("${cities.image}")`, backgroundSize: "cover" }}>
              <div className="city_name">
                <p>{cities.city}</p>
                <p>{cities.country}</p>
              </div>
            </SwiperSlide>
          )
        })
        }
      </Swiper>
    </div>
  );
}

