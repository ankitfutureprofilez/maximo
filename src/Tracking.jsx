import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const mapStyles = {
    height: "100vh",
    width: "100%",
};

const truckIcon = 'https://img.icons8.com/emoji/48/000000/delivery-truck.png';

const LocationTracker = () => {
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [destination] = useState({ lat: 26.9187, lng: 75.8441 }); // Factory location coordinates
    const [response, setResponse] = useState(null);
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');

    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    useEffect(() => {
        console.log("API Key Used:", apiKey);
        if (!apiKey) {
            console.error('Google Maps API Key is undefined. Check your environment variables.');
            return;
        }

        const fetchLocation = async () => {
            try {
                const result = await axios.post(
                    `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`,
                    { considerIp: true }
                );
                const { lat, lng } = result.data.location;
                setLocation({ lat, lng });

                // Notify user if they reached the destination
                if (Math.abs(lat - destination.lat) < 0.001 && Math.abs(lng - destination.lng) < 0.001) {
                    toast.success("You have reached your destination!");
                }
            } catch (error) {
                console.error('Error fetching geolocation', error);
            }
        };

        const interval = setInterval(fetchLocation, 1000); // Fetch location every 5 seconds

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [apiKey, destination]);

    const directionsCallback = (result, status) => {
        if (status === 'OK' && result) {
            setResponse(result);
            const route = result.routes[0].legs[0];
            setDistance(route.distance.text);
            setDuration(route.duration.text);
        } else {
            console.error('Error fetching directions:', status, result);
        }
    };

    return (
        <LoadScript googleMapsApiKey={apiKey}>
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
                        travelMode: 'DRIVING',
                    }}
                    callback={directionsCallback}
                />
                {response && (
                    <DirectionsRenderer
                        options={{
                            directions: response,
                        }}
                    />
                )}
            </GoogleMap>
            <div>
                <h4>Distance: {distance}</h4>
                <h4>Duration: {duration}</h4>
            </div>
            <Toaster />
        </LoadScript>
    );
};

export default LocationTracker;
