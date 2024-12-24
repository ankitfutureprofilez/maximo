import React, { useEffect, useRef, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";

const CustomBarcodeScanner = () => {
  const [data, setData] = useState("No result");
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();

    // Start the scanner
    const startScanner = async () => {
      try {
        const result = await codeReader.decodeFromVideoDevice(
          null, // Use the default camera
          videoRef.current,
          (result, error) => {
            if (result) {
              setData(result.text);
              console.log("Scanned Barcode/QR Code Data:", result.text);
            }
            if (error) {
              console.error("Barcode/QR Code scanning error:", error);
            }
          }
        );

        // Save the video stream so we can stop it later
        streamRef.current = result;
      } catch (err) {
        console.error("Error starting barcode scanner:", err);
      }
    };

    startScanner();

    // Clean up the scanner on unmount
    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getVideoTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <h1>Custom Barcode/QR Code Scanner</h1>
      <video ref={videoRef} style={{ width: "500px" }} />
      <p>Scanned Data: {data}</p>
    </div>
  );
};

export default CustomBarcodeScanner;