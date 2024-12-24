import React, { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import './App.css'; // Import the CSS file

const BarcodeScanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const startScanning = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }, // Use the back camera
        });

        videoRef.current.srcObject = stream;
        videoRef.current.play();

        codeReader.decodeFromVideoDevice(
          undefined,
          videoRef.current,
          (result, error) => {
            if (result) {
              setScannedData(result.text);
              console.log('Scanned Barcode Data:', result.text);
              // Optional: Stop scanning after a successful scan
              // codeReader.reset();
            } else if (error) {
              console.error('Barcode scanning error:', error);
              setScannedData('Error scanning barcode. Please try again.'); 
            }
          }
        );
      } catch (err) {
        console.error('Error accessing camera:', err);
        setCameraError('Error accessing camera. Please check permissions and try again.');
      }
    };

    startScanning();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="scanner-container">
      <h1>Barcode Scanner</h1>
      {cameraError && <p className="error-message">{cameraError}</p>}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
      />
      {scannedData && <p>Scanned Data: {scannedData}</p>}
    </div>
  );
};

export default BarcodeScanner;
