import React, { useState } from "react";
import Styles from "./_hotel.module.css";
import { toast } from "react-toastify";
import { storage } from "../../apis/firebase";
import { db } from "../../apis/firebase";
import { addDoc, collection } from "@firebase/firestore";
import {
  getDownloadURL,
  ref as photoRef,
  uploadBytesResumable,
} from "@firebase/storage";
const AddHotel = () => {
  let [state, setState] = useState({
    hotel_name: "",
    city: "",
    price: "",
    address: "",
    rating: "",
    type: "",
    availableType: "",
  });
  let [hotelImg, setHotelImg] = useState("");
  let [amenities, setAmenities] = useState([]);
  //uploading hotel Image
  let [photoView, setPhotoView] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  let [progressBar, setProgressBar] = useState(0);
  let [statusBar, setStatusBar] = useState(false);
  let { hotel_name, city, price, address, rating, availableType, type } = state;

  let handleTextInputChange = e => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  let handleFileChange = e => {
    let files = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onloadend = function (e) {
      setPhotoView(e.target.result);
    };
    setHotelImg(files);
  };

  let handleCheckboxHandle = e => {
    let { value } = e.target;
    setAmenities(oldCheckValues => {
      return [...oldCheckValues, value];
    });
  };

  let handleSubmit = e => {
    e.preventDefault();
    //upload photo
    try {
      //set storage location in firebase
      let storageLocation = photoRef(storage, "hotels-photo/" + hotelImg.name);
      let uploadImageTask = uploadBytesResumable(storageLocation, hotelImg);
      // firebase events
      uploadImageTask.on(
        "state_changed",
        snapShot => {
          let ProgressBarData = Math.round(
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100
          );
          // progressbar
          setProgressBar(ProgressBarData);
          setStatusBar(true);
          setIsLoading(true);
          setPhotoView(null);
        },
        err => {
          // error handling
          toast.error(err.code);
        },
        async () => {
          //task completion
          let DownloadUrl = await getDownloadURL(storageLocation);
          let payload = { ...state, DownloadUrl, amenities };
          let collectionRef = collection(db, "hotels");
          await addDoc(collectionRef, payload);
          setIsLoading(false);
          setStatusBar(false);
          toast.success("successfully hotel added...");
          window.location.assign("/admin");
        }
      );
    } catch (error) {
      toast.error(error.code);
    }
  };

  let ProgressUI = () => {
    return (
      <div className={Styles.progress}>
        <p className="bar" style={{ width: `${progressBar} %` }}>
          <span>{progressBar} %</span>
        </p>
      </div>
    );
  };

  return (
    <section id={Styles.hotelBlock}>
      <aside className={Styles.progressBar}>
        {statusBar === true ? <ProgressUI /> : ""}
      </aside>

      <article>
        <h2>Add Hotel</h2>

        <form onSubmit={handleSubmit}>
          <figure>
            {photoView === null ? "" : <img src={photoView} alt="photoView" />}
          </figure>
          <div className="form-group">
            <label htmlFor="hotel_name">Hotel name</label>
            <input
              type="text"
              name="hotel_name"
              id="hotel_name"
              value={hotel_name}
              onChange={handleTextInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">city</label>
            <input
              type="text"
              name="city"
              id="city"
              value={city}
              required
              onChange={handleTextInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              id="price"
              value={price}
              required
              onChange={handleTextInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <input
              type="text"
              name="rating"
              id="rating"
              value={rating}
              required
              onChange={handleTextInputChange}
            />
          </div>
          <div className={Styles.checkboxContainer}>
            <label htmlFor="Amenities">Amenities</label>
            <aside
              className={Styles.checkBoxBlock}
              onChange={handleCheckboxHandle}
              value={amenities}
            >
              <span>
                <input
                  type="checkbox"
                  value="Air conditioning"
                  name="Air conditioning"
                />
                Air conditioning
              </span>
              <span>
                <input type="checkbox" value="Room service" />
                Room service
              </span>
              <span>
                <input type="checkbox" value="Family rooms" />
                Family rooms
              </span>
              <span>
                <input type="checkbox" value="Free breakfast" />
                Free breakfast
              </span>
              <span>
                <input type="checkbox" value="Wifi" />
                Wifi
              </span>
              <span>
                <input type="checkbox" value="Restaurant" />
                Restaurant
              </span>
              <span>
                <input type="checkbox" value="Restaurant" />
                Free parking
              </span>
              <span>
                <input type="checkbox" value="tv" />
                tv
              </span>
            </aside>
          </div>
          <div
            className={Styles.availableType}
            name="availableType"
            value={availableType}
            onChange={handleTextInputChange}
          >
            <label htmlFor="available">availability</label>
            <aside>
              <span>
                <input
                  type="radio"
                  id="available"
                  value="available"
                  required
                  name="availableType"
                />
                available
              </span>
              <span>
                <input
                  type="radio"
                  id="unavailable"
                  value="unavailable"
                  required
                  name="availableType"
                />
                unavailable
              </span>
            </aside>
          </div>

          <div className={Styles.type}>
            <label htmlFor="type">Select type of hotel</label>
            <select
              name="type"
              id="type"
              value={type}
              onChange={handleTextInputChange}
            >
              <option value="Deluxe_Double_Twin_Room">
                Deluxe Double or Twin Room
              </option>
              <option value="King_Room_with_Balcony">
                King Room with Balcony
              </option>
              <option value="Superior_King_Room">Superior King Room</option>
              <option value="Family_rooms">Family rooms</option>
            </select>
          </div>
          <div className={Styles.fileType}>
            <label htmlFor="hotelImg">upload Image</label>
            <input
              type="file"
              name="hotelImg"
              id="hotelImg"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className={Styles.addressBlock}>
            <label htmlFor="address">Address</label>
            <textarea
              name="address"
              id="address"
              cols="30"
              rows="10"
              value={address}
              onChange={handleTextInputChange}
            ></textarea>
          </div>
          <div className="form-group">
            <button>{isLoading ? "loading ..." : "add Hotel"}</button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default AddHotel;
