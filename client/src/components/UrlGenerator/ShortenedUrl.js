import React from "react";
import "bootstrap/dist/js/bootstrap.min.js";

function ShortenedUrl(props) {
  const { shortenedUrl } = props;

  return (
    <>
      <h3>Your Link:</h3>

      <a className="center" href={shortenedUrl}>
        {shortenedUrl}
      </a>
    </>
  );
}

export default ShortenedUrl;
