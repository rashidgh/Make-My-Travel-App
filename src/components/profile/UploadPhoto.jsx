// import React, { useState } from "react";
// import styles from "./_profile.module.css";
// import { toast } from "react-toastify";
// import { storage } from "../../apis/firebase";
// import { updateProfile } from "firebase/auth";
// import {
//   ref as photoRef,
//   getDownloadURL,
//   uploadBytesResumable,
// } from "@firebase/storage";
// import { async } from "@firebase/util";
// // import { getDownloadURL } from "@fire";
// import { AuthContext } from './../../apis/AuthContextApi';
// import { useContext } from "react";

// const UploadPhoto = () => {
//   let [photo, setPhoto] = useState("");
//   let [photoView, setPhotoView] = useState(null);
//   let [isLoading, setIsLoading] = useState(false);
//   let [statusBar, setStatusBar] = useState(false);
//   let [progressBar, setProgressBar] = useState(0);
//   // set storage location in firebase
    
//     let {authUser} =useContext(AuthContext)

//   let handleSubmit = e => {
//     e.preventDefault();
//     try {
//       let storageLocation = photoRef(storage, "profile-photo/" + photo.name);
//       let uploadImageTask = uploadBytesResumable(storageLocation, photo);
//       console.log(uploadImageTask);
//       uploadImageTask.on(
//         "state_changed",
//           (snapshot) => {
//               let progressBarData = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

//           // progressbar:

//           setProgressBar(progressBarData);
//           setStatusBar(true);
//           setIsLoading(true);
//           setPhotoView(null);
//         },
//         (err) => {
//           // error handling:
//           toast.error(err.code);
//         },

//         async () => {
//           let DownloadURL = await getDownloadURL(storageLocation);
//           updateProfile(authUser, {
//             photoURL: DownloadURL,
//           });
//             setIsLoading(false);
//             setStatusBar(false);
//             toast.success("successfully profile photo updated");
//             window.location.assign("/profile");
//         }
//       );
//     } catch (error) {
//       toast.error(error.code);
//     }
//   };
//   let handleChange = e => {
//     let files = e.target.files[0];
//     let reader = new FileReader();
//     reader.readAsDataURL(files);
//     reader.onloadend = function (e) {
//       setPhotoView(e.target.result);
//     };
//     setPhoto(files);
//   };
//     console.log(photoView);
    
//     let ProgressUI = () => {
//         return (
//             <div className={styles.progress}>
//                 <p className="bar" style={{ width: `${progressBar} %` }}>
//                     {progressBar}%
//                 </p>
//             </div>
//         )
//     }
//   return (
//     <section className={styles.profilePhotoBlock}>
//       <h1>Upload profile photo</h1>
//           <article>
//               {statusBar === true ? <ProgressUI />:""}
//         <figure>
//           {photoView === null ? "" : <img src={photoView} alt="photoview" />}
//         </figure>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="">uplaod Photo</label>
//             <input
//               type="file"
//               name="uplaod Photo"
//               id="uplaod Photo"
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <button>upload</button>
//           </div>
//         </form>
//       </article>
//     </section>
//   );
// };

// export default UploadPhoto;


import React, { useState, useContext } from "react";
import Styles from "./_profile.module.css";
import { toast } from "react-toastify";
import { storage } from "../../apis/firebase";
import { updateProfile } from "firebase/auth";
import {
  ref as photoRef,
  getDownloadURL,
  uploadBytesResumable,
} from "@firebase/storage";

import { AuthContext } from "./../../apis/AuthContextApi";

const UploadPhoto = () => {
  let { authUser } = useContext(AuthContext);
  let [photo, setPhoto] = useState("");
  let [photoView, setPhotoView] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  let [progressBar, setProgressBar] = useState(0);
  let [statusBar, setStatusBar] = useState(false);

  let handleChange = e => {
    let files = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onloadend = function (e) {
      setPhotoView(e.target.result);
    };
    setPhoto(files);
  };

  let handleSubmit = async e => {
    e.preventDefault();
    try {
      //set storage location in firebase
      let storageLocation = photoRef(storage, "profile-photo/" + photo.name);
      let uploadImageTask = uploadBytesResumable(storageLocation, photo);
      // firebase events
      uploadImageTask.on(
        "state_changed",
        snapShot => {
          let ProgressBarData =
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
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
          updateProfile(authUser, {
            photoURL: DownloadUrl,
          });
          setIsLoading(false);
          setStatusBar(false);
          toast.success("successfully profile photo updated");
          window.location.assign("/profile");
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
          {progressBar} %
        </p>
      </div>
    );
  };

  return (
    <section className={Styles.profilePhotoBlock}>
      <h1>Upload Profile photo</h1>
      <article>
        {statusBar === true ? <ProgressUI /> : ""}
        <figure>
          {photoView === null ? "" : <img src={photoView} alt="photoView" />}
        </figure>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="uploadphoto">upload photo</label>
            <input
              type="file"
              name="uploadphoto"
              id="uploadphoto"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <button>{isLoading ? "loading ..." : "upload"}</button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default UploadPhoto;