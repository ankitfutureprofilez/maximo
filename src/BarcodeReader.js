import React, { useEffect, useRef, useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';

const BarcodeScanner = () => {
  const [data, setData] = useState('No result');
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();

    const startScanner = async () => {
      try {
        // Request access to the user's back camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { exact: "environment" } } 
        });

        videoRef.current.srcObject = stream;
        videoRef.current.play();

        const result = await codeReader.decodeFromVideoDevice(
          undefined, 
          videoRef.current,
          (result, error) => {
            if (result) {
              setData(result.text);
              console.log('Scanned Barcode/QR Code Data:', result.text);
            } else if (error) { 
              console.error('Barcode/QR Code scanning error:', error);
              // Optional: Handle errors, e.g., display an error message to the user
              // setData('Error scanning barcode.'); 
            }
          }
        );

        streamRef.current = result;
      } catch (err) {
        console.error('Error starting barcode scanner:', err);
        // Optional: Handle camera access errors, e.g., display a permission request message
      }
    };

    startScanner();

    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getVideoTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <video 
        ref={videoRef} 
        style={{ width: '500px' }} 
        autoPlay 
        playsInline 
      />
      <p>Scanned Data: {data}</p>
    </div>
  );
};

export default BarcodeScanner;