import React, { useEffect, useState } from 'react';
import { getAllDeliveries, setDeliveryStatus } from './service';

const DeliveryList = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const data = await getAllDeliveries();
                setDeliveries(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDeliveries();
    }, []);

    const handleDeliveryArrival = async (deliveryId) => {
        try {
            await setDeliveryStatus(deliveryId, 'DELIVERED');
            setDeliveries((prevDeliveries) =>
                prevDeliveries.map((delivery) =>
                    delivery.id === deliveryId
                        ? { ...delivery, deliveryStatus: 'DELIVERED' }
                        : delivery
                )
            );
        } catch (error) {
            console.error('Error setting delivery status:', error);
            setError(error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Deliveries</h1>
            <ul>
                {deliveries.map((delivery) => (
                    <li key={delivery.id}>
                        <div>
                            <strong>Order ID:</strong> {delivery.orderId} <br />
                            <strong>Status:</strong> {delivery.deliveryStatus} <br />
                            <button
                                onClick={() => handleDeliveryArrival(delivery.id)}
                                disabled={delivery.deliveryStatus === 'DELIVERED'}
                            >
                                Mark as Delivered
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeliveryList;