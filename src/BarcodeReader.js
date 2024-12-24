import React, { useState, useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import JsBarcode from 'jsbarcode'; // Import the barcode decoding library

const BarcodeReader = () => {
  const [scannedData, setScannedData] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Error state and message for handling potential issues
  const [error, setError] = useState(null);

  useEffect(() => {
    // Handle potential errors during camera access
    const handleError = (error) => {
      setError(`Error accessing camera: ${error.message}`);
      console.error('Error accessing camera:', error);
    };

    const handleSuccess = (stream) => {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play();
        requestAnimationFrame(detectBarcode);
      };
    };

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(handleSuccess)
      .catch(handleError);

    // Clean up resources when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []); // Run the effect only once on component mount

  const handleScan = async () => {
    try {
      // Request access to the user's camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;

      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play();
        requestAnimationFrame(detectBarcode);
      };
    } catch (error) {
      setError(`Error accessing camera: ${error.message}`);
      console.error('Error accessing camera:', error);
    }
  };

  const detectBarcode = async () => {
    if (!videoRef.current || !canvasRef.current) {
      return; // Handle potential missing references
    }

    const context = canvasRef.current.getContext('2d');
    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;

    canvasRef.current.width = width;
    canvasRef.current.height = height;

    context.drawImage(videoRef.current, 0, 0, width, height);

    const imageData = canvasRef.current.toDataURL('image/jpeg');

    try {
      const decodedData = await JsBarcode.decodeAsync(imageData);
      if (decodedData) {
        setScannedData(decodedData.text);
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    } catch (error) {
      setError(`Error decoding barcode: ${error.message}`);
      console.error('Error decoding barcode:', error);
    }

    requestAnimationFrame(detectBarcode);
  };

  const handleDownload = () => {
    if (!scannedData) {
      return; // Handle downloading without scanned data
    }

    const doc = new jsPDF();
    doc.text(`Scanned Barcode: ${scannedData}`, 10, 10);
    doc.save('barcode_scan.pdf');
  };

  return (
    <div>
      <h1>Barcode Reader</h1>
      <video ref={videoRef} width="640" height="480" autoPlay />
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <button onClick={handleScan}>Start Scan</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h3>Scanned Data:</h3>
        <p>{scannedData}</p>
      </div>
      {scannedData && <button onClick={handleDownload}>Download as PDF</button>}
    </div>
  );
};

export default BarcodeReader;