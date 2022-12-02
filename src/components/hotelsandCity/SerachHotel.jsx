import React from "react";
import Styles from "./_hotel.module.css";
import { FaCalendar } from "react-icons/fa";
const SearchHotel = () => {
  return (
    <section id={Styles.searchHotel}>
      <article>
        <form>
          <div className="form-group">
            <input type="text" placeholder="Where are you going?" />
          </div>
          <div className="form-group">
            <aside className={Styles.dateSearch}>
              <input
                type="text"
                className="form-control"
                placeholder="check-in"
              />

              <input
                type="text"
                className="form-control"
                placeholder="check-out"
              />
            </aside>
          </div>
          <div className="form-group">
            <select>
              <option value="adults">Adults</option>
              <option value="children">Children</option>
              <option value="rooms">Rooms</option>
            </select>
          </div>
          <div className="form-group">
            <button>Search</button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default SearchHotel;
