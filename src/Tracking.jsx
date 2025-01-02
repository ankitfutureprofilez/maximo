import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const mapStyles = {
    height: "100vh",
    width: "100%"
};

const LocationTracker = () => {
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [destination] = useState({ lat: 28.7041, lng: 77.1025 }); // Fixed location coordinates
    const [response, setResponse] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                position => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                error => console.log(error),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    const directionsCallback = (result, status) => {
        if (status === 'OK' && result) {
            setResponse(result);
        } else {
            console.error(`Error fetching directions ${result}`);
        }
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyDzPG91wtUKY3vd_iD3QWorkUCSdofTS58Y">
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
