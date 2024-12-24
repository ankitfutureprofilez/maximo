import React, { useState, useRef, useEffect } from 'react';
import { BarcodeDetector } from '@zxing/library';

const BarcodeScanner = () => {
  const [result, setResult] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const startScanning = async () => {
      try {
        const barcodeDetector = new BarcodeDetector(); 
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;

        const handleVideoFrame = async () => {
          const canvas = document.createElement('canvas');
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          const context = canvas.getContext('2d');
          context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

          try {
            const codes = await barcodeDetector.detect(imageData);
            if (codes.length > 0) {
              setResult(codes[0].rawValue); 
            }
          } catch (error) {
            console.error('Error decoding barcode:', error);
          }

          requestAnimationFrame(handleVideoFrame); 
        };

        requestAnimationFrame(handleVideoFrame); 
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startScanning();

    return () => {
      // Stop the video stream if the component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
      {result && (
        <div>
          <h3>Scanned Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;