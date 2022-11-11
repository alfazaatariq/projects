import React from "react";
import { CgSmileSad } from "react-icons/cg";

const NotFoundPage = () => {
  return (
    <div className="notfound">
      <CgSmileSad size={150} />
      <h1>404</h1>
      <h3>PAGE NOT FOUND</h3>
      <h4>
        The Page you are looking for doesn't exist or another error occured.
      </h4>
    </div>
  );
};

export default NotFoundPage;
