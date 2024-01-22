import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

function Home() {
    const [homeInfo, setHomeInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHomeInformation = async () => {
            try {
                const response = await axios.get('/api/user/home-information/');
                setHomeInfo(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchHomeInformation();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {homeInfo && (
                <div>
                    <h2>Planet Information</h2>
                    <p>Name: {homeInfo.playerData.planetName}</p>
                    <p>Coordinates: {homeInfo.playerData.planetCoordinates}</p>
                    <p>Orion Credits: {homeInfo.playerData.orionCredits}</p>

                    <h2>Stores</h2>
                    {homeInfo.stores.map((store, index) => (
                        <div key={index}>
                            <p>Type: {store.storeType}</p>
                            <p>Capacity: {store.capacity}</p>
                            <p>Storage: {store.storage}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
