import React, { useState } from "react";
import Webcam from "react-webcam";
import { BrowserQRCodeReader } from "@zxing/library";

const CustomBarcodeScanner = () => {
  const [data, setData] = useState("No result");

  const handleScan = async () => {
    const webcam = document.querySelector("video");
    if (webcam) {
      const codeReader = new BrowserQRCodeReader();
      try {
        const result = await codeReader.decodeOnceFromVideoElement(webcam);
        setData(result.text);
      } catch (err) {
        console.error("Error reading barcode:", err);
      }
    }
  };

  return (
    <div>
      <h1>Custom Barcode Scanner</h1>
      <Webcam style={{ width: "500px" }} />
      <button onClick={handleScan}>Scan Barcode</button>
      <p>Scanned Data: {data}</p>
    </div>
  );
};

export default CustomBarcodeScanner;
