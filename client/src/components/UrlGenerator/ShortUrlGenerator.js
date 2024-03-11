import React, { useState, useCallback, useRef } from "react";
import ShortenedUrl from "./ShortenedUrl";

const urlRegex =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

function ShortUrlGenerator() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [generatedShortUrl, setGeneratedShortUrl] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);


  const handleInputChange = useCallback(
    (event) => {
      const inputValue = event.target.value;
      setOriginalUrl(inputValue);
      setIsUrlValid(urlRegex.test(inputValue));
    },
    [setOriginalUrl, setIsUrlValid]
  );

  const handleGenerateShortUrl = useCallback(
    async (event) => {
      event.preventDefault();
      inputRef.current.value = "";
      setOriginalUrl("");
      try {
        const Server = "http://localhost:5050";
        const Endpoint = "/shortenUrl";
        const Query = "?url=";
        const FetchUrl = `${Server}${Endpoint}${Query}`;
        const response = await fetch(`${FetchUrl}${originalUrl}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setGeneratedShortUrl(data["Short-Url"]);
      } catch (error) {
        setError(error);
      }
    },
    [originalUrl]
  );

  return (
    <>
      <form className="row g-2 my-5" onSubmit={handleGenerateShortUrl}>
        <div className="input-group">
          <div className="form-floating">
            <input
              type="text"
              className={`form-control outline-secondary shadow-sm ${
                originalUrl && !isUrlValid
                  ? "is-invalid"
                  : isUrlValid
                  ? "is-valid"
                  : ""
              }`}
              id="floatingInput"
              placeholder="Your URL"
              aria-label="Your URL"
              aria-describedby="short-button"
              value={originalUrl}
              onChange={handleInputChange}
              ref={inputRef}
            />
            <label htmlFor="floatingInput">Your URL</label>

            {isUrlValid && (
              <div className="valid-feedback position-absolute">
                Looks good!
              </div>
            )}
            {!isUrlValid && (
              <div className="invalid-feedback position-absolute">
                Please provide a valid URL starting with http(s)://
              </div>
            )}
          </div>

          <button
            className="btn btn-primary shadow-sm"
            type="submit"
            id="short-url-button"
            disabled={!isUrlValid}
          >
            Shorten URL
          </button>
        </div>
      </form>

      {generatedShortUrl && <ShortenedUrl shortenedUrl={generatedShortUrl} />}
    </>
  );
}

export default ShortUrlGenerator;
