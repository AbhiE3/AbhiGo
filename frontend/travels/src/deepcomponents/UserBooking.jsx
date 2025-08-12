import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserBookings = ({ token, userId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token || !userId) {
        setLoading(false);
        setError("User is not authenticated.");
        return;
    };

    fetch(`http://localhost:8000/api/user/${userId}/bookings/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch bookings');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Bookings Data:', data);
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [token, userId]);

  if (loading) {
    return (
        <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
        </div>
    );
  }
  
  if (error) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative max-w-2xl mx-auto" role="alert">
                <strong className="font-bold">Error! </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-25 bg-teal-900">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Your Bookings</h1>
      {bookings.length === 0 ? (
        <div className="text-center py-16 bg-white bg-opacity-90 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-medium text-gray-700">No bookings found.</h3>
            <p className="mt-2 text-md text-gray-500">It looks like you haven't booked any trips yet.</p>
        </div>
      ) : (
        <ul className="space-y-6 max-w-2xl mx-auto">
          {bookings.map((booking) => (
            <li key={booking.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {booking.bus ? `${booking.bus.bus_name}` : 'Bus Details Unavailable'}
                        </h2>
                        <p className="text-gray-500">
                            {booking.bus ? `Bus No: ${booking.bus.number}`: ''}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-teal-600">₹{booking.price || 'N/A'}</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mt-6 border-t pt-6">
                    <div>
                        <p className="text-sm text-gray-500">Route</p>
                        <p className="font-semibold text-gray-800">{booking.origin || 'N/A'} → {booking.destination || 'N/A'}</p>
                    </div>
                     <div>
                        <p className="text-sm text-gray-500">Seat Number</p>
                        <p className="font-semibold text-gray-800">{booking.seat ? booking.seat.seat_number : 'N/A'}</p>
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                        <p className="text-sm text-gray-500">Booking Time</p>
                        <p className="font-semibold text-gray-800">{new Date(booking.booking_time).toLocaleString()}</p>
                    </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserBookings;
