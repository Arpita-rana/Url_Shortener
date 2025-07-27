import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [qrCodeImg, setQrCodeImg] = useState("");

  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/api/short", { originalUrl })
      .then((res) => {
        setShortUrl(res.data.shortUrl);
        setQrCodeImg(res.data.qrCodeImg);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="app-container">
      <div className="shortener-box">
        <h2 className="heading">URL Shortener</h2>
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter your long URL"
          className="input-field"
        />
        <button onClick={handleSubmit} className="submit-button">
          Shorten URL
        </button>

        {shortUrl && (
          <div className="short-url-display">
            <p>Shortened URL:</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
            {qrCodeImg && (
              <div style={{ marginTop: "10px" }}>
                <p>QR Code:</p>
                <img src={qrCodeImg} alt="QR Code" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
