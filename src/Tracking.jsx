import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const mapStyles = {
    height: "500px",
    width: "400px"
};

const truckIcon = 'https://img.icons8.com/emoji/48/000000/delivery-truck.png';

const LocationTracker = () => {
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [destination] = useState({ lat: 26.9187, lng: 75.8441 }); // Factory location coordinates
    const [response, setResponse] = useState(null);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const result = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBoHSgIrrdijx_5Nex1rFX4g-B4HJSLdDw`, {
                    considerIp: true
                });
                const { lat, lng } = result.data.location;
                setLocation({ lat, lng });

                // Check if the current location matches the destination
                if (lat === destination.lat && lng === destination.lng) {
                    toast.success("You have reached your destination!");
                }
            } catch (error) {
                console.error('Error fetching geolocation', error);
            }
        };

        const interval = setInterval(fetchLocation, 5000); // Update location every 5 seconds

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [destination]);

    const directionsCallback = (result, status) => {
        if (status === 'OK' && result) {
            setResponse(result);
        } else {
            console.error(`Error fetching directions ${result}`);
        }
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyBoHSgIrrdijx_5Nex1rFX4g-B4HJSLdDw">
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={15}
                center={location}
            >
                <Marker position={location} icon={truckIcon} />
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
            <Toaster />
        </LoadScript>
    );
};

export default LocationTracker;
