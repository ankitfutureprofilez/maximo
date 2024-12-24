import React, { useState, useRef, useEffect } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

function BarcodeScanner() {
  const [scanResult, setScanResult] = useState('');
  const [videoDevice, setVideoDevice] = useState(null);
  const videoRef = useRef(null); 

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();

    async function init() {
      try {
        const videoDevices = await reader.listVideoInputDevices();
        if (videoDevices.length > 0) {
          setVideoDevice(videoDevices[0]); 
        } else {
          console.error("No video devices found.");
        }
      } catch (error) {
        console.error("Error listing video devices:", error);
      }
    }

    init();

    return () => {
      // Cleanup: Stop the video stream if the component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (videoDevice) {
      const reader = new BrowserMultiFormatReader();

      const constraints = {
        video: { deviceId: { exact: videoDevice.deviceId } },
      };

      navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
          videoRef.current.srcObject = stream;
          reader.decodeFromInputVideoDevice(videoRef.current, 'video', (result) => { 
            if (result) {
              setScanResult(result.text);
            }
          });
        })
        .catch(error => console.error("Error accessing camera:", error));
    }
  }, [videoDevice]);

  return (
    <>
      <div>
        {scanResult ? (
          <p>Scanned Barcode: {scanResult}</p>
        ) : (
          <p>Scanning...</p>
        )}
        <video id="video" width="400" height="600" ref={videoRef} autoPlay playsInline /> 
      </div>
    </>
  );
}

export default BarcodeScanner;