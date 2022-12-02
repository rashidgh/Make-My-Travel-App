import React from 'react'
import SearchHotel from '../components/hotelsandCity/SerachHotel';
import Slider from './sliders/Slider';
import Styles from './_pages.module.css';
const Home = () => {
  return (
    <section id={Styles.pagesBlock}>
      <Slider />
      <SearchHotel />
    </section>
  )
}
export default Home;
