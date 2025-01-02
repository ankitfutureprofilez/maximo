import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import axios from 'axios';

const mapStyles = {
    height: "100vh",
    width: "100%"
};

const LocationTracker = () => {
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [destination] = useState({ lat: 28.7041, lng: 77.1025 }); // Fixed location coordinates
    const [response, setResponse] = useState(null);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const result = await axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBoHSgIrrdijx_5Nex1rFX4g-B4HJSLdDw', {
                    considerIp: true
                });
                const { lat, lng } = result.data.location;
                setLocation({ lat, lng });
            } catch (error) {
                console.error('Error fetching geolocation', error);
            }
        };

        const interval = setInterval(fetchLocation, 5000); // Update location every 5 seconds

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, []);

    const directionsCallback = (result, status) => {
        if (status === 'OK' && result) {
            setResponse(result);
        } else {
            console.error(`Error fetching directions ${result}`);
        }
    };

    return (
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={15}
                center={location}
            >
                <Marker position={location} />
                <Marker position={destination} />
                <DirectionsService
                    options={{ 
                        destination: destination,
                        origin: location,
                        travelMode: 'DRIVING' 
                    }}
                    callback={directionsCallback}
                />
                {response && (
                    <DirectionsRenderer
                        options={{ 
                            directions: response 
                        }}
                    />
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default LocationTracker;
