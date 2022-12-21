import React from "react";
import LoaderSVG from "./loaderPKM.svg";
import "./Loader.css";
import { useSelector } from "react-redux";

export default function Loader() {
  // toggle du loader avec redux
  const { toggleLoader } = useSelector((state) => ({
    ...state.toggle,
  }));

  return (
    <>
      {toggleLoader && (
        <div className="loader-container fade">
          <img
            className="img-loader fade"
            src={LoaderSVG}
            style={{ width: "120px", height: "120px" }}
            alt="loader-togepi"
          />
        </div>
      )}
    </>
  );
}
