import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const BarcodeReader = () => {
  const [data, setData] = useState("No result");
  const [name, setName] = useState("");

  const handleUpdate = (err, result) => {
    if (result) {
      setData(result.text);
      // Assuming the scanned data contains a JSON object with a 'name' field
      try {
        const parsedData = JSON.parse(result.text);
        if (parsedData.name) {
          setName(parsedData.name);
        } else {
          setName("Name not found in scanned data.");
        }
      } catch {
        setName("Invalid data format.");
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Barcode Reader</h1>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={handleUpdate}
      />
      <p>Scanned Data: {data}</p>
      <h3>Name: {name}</h3>
    </div>
  );
};

export default BarcodeReader;
