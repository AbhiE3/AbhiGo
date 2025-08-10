import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// In your actual project, ensure this component is rendered within a <BrowserRouter>
// to allow the following hooks to work correctly.
import { useParams, useNavigate } from 'react-router-dom';


// --- Helper Components ---

const Seat = ({ seat, onSelect, isSelected }) => {
    const getSeatClass = () => {
        if (seat.is_booked) {
            return 'bg-gray-300 text-gray-500 cursor-not-allowed';
        }
        if (isSelected) {
            return 'bg-yellow-400 text-white border-yellow-500 shadow-lg scale-110';
        }
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200 hover:border-blue-400';
    };

    return (
        <div
            onClick={() => !seat.is_booked && onSelect(seat)}
            className={`w-12 h-12 flex items-center justify-center rounded-md border-2 border-transparent font-semibold transition-all duration-300 ease-in-out cursor-pointer ${getSeatClass()}`}
        >
            {seat.seat_number}
        </div>
    );
};

const BusLayout = ({ seats, onSelect, selectedSeats }) => {
    const leftSideSeats = seats.filter((seat, index) => index % 4 < 2);
    const rightSideSeats = seats.filter((seat, index) => index % 4 >= 2);

    const renderSeatColumn = (seatColumn) => {
        return seatColumn.map(seat => (
            <Seat
                key={seat.id}
                seat={seat}
                onSelect={onSelect}
                isSelected={selectedSeats.some(s => s.id === seat.id)}
            />
        ));
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm mx-auto">
            <div className="flex justify-between items-center mb-6">
                 <div className="w-16 h-16 text-xs text-gray-400 flex items-center justify-center">Entry
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 9a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm1 4a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" /></svg> */}
                 </div>
                <div className="w-16 h-16  flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 9a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm1 4a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" /></svg>
                </div>
            </div>
            <div className="flex justify-between gap-x-8">
                <div className="grid grid-cols-2 gap-3">{renderSeatColumn(leftSideSeats)}</div>
                <div className="grid grid-cols-2 gap-3">{renderSeatColumn(rightSideSeats)}</div>
            </div>
        </div>
    );
};

// --- NEW: PaymentPage Component ---
const PaymentPage = ({ onPay, onCancel, bus, selectedSeats, isProcessing }) => {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const totalPrice = bus.price_per_seat * selectedSeats.length;

    return (
        <div className="container mx-auto px-4 py-8">
             <header className="mb-8">
                <button onClick={onCancel} className="text-blue-600 hover:text-blue-800 font-semibold flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Back to Seat Selection
                </button>
            </header>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-auto">
                <div className="p-8 border-b">
                    <h2 className="text-3xl font-bold text-gray-800">Complete Payment</h2>
                    <p className="text-gray-600 mt-2">Total amount to be paid: <span className="font-bold text-blue-600 text-xl">${totalPrice}</span></p>
                </div>
                <div className="p-8">
                    <div className="flex border border-gray-200 rounded-lg overflow-hidden mb-8">
                        <button onClick={() => setPaymentMethod('card')} className={`flex-1 p-4 font-semibold transition-colors text-lg ${paymentMethod === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                            Credit/Debit Card
                        </button>
                        <button onClick={() => setPaymentMethod('upi')} className={`flex-1 p-4 font-semibold transition-colors text-lg ${paymentMethod === 'upi' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                            UPI
                        </button>
                    </div>

                    {paymentMethod === 'card' && (
                        <div className="space-y-4">
                            <input type="text" placeholder="Card Number" className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg" />
                            <input type="text" placeholder="Cardholder Name" className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg" />
                            <div className="flex gap-4">
                                <input type="text" placeholder="MM/YY" className="w-1/2 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg" />
                                <input type="text" placeholder="CVV" className="w-1/2 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg" />
                            </div>
                        </div>
                    )}

                    {paymentMethod === 'upi' && (
                        <div>
                            <div className="flex justify-center gap-6 mb-6">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1200px-Google_Pay_Logo.svg.png" alt="Google Pay" className="h-12" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/1200px-PhonePe_Logo.svg.png" alt="PhonePe" className="h-12" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Paytm_logo.png/1200px-Paytm_logo.png" alt="Paytm" className="h-12" />
                            </div>
                            <input type="text" placeholder="Enter UPI ID" className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg" />
                        </div>
                    )}
                </div>
                <div className="p-8 bg-gray-50 rounded-b-2xl flex justify-end">
                    <button onClick={onPay} disabled={isProcessing} className="w-full md:w-auto px-12 py-4 text-xl rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center disabled:bg-blue-400">
                        {isProcessing ? <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div> : 'Pay Now'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- NEW: TicketConfirmationPage Component ---
const TicketConfirmationPage = ({ bookingDetails, onClose }) => {
    if (!bookingDetails) return null;
    const { bus, seats } = bookingDetails;

    return (
        <div className="min-h-screen bg-green-500 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center transform transition-all animate-fade-in-up">
                <div className="mx-auto bg-green-100 rounded-full h-24 w-24 flex items-center justify-center mb-6">
                    <svg className="h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
                <p className="text-gray-600 mb-6">Your ticket has been successfully booked.</p>

                <div className="text-left bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                    <h3 className="font-bold text-lg mb-2">{bus.bus_name} - {bus.number}</h3>
                    <p><strong>Route:</strong> {bus.origin} to {bus.destination}</p>
                    <p><strong>Date:</strong> {bus.travel_date}</p>
                    <p><strong>Seats:</strong> {seats.map(s => s.seat_number).join(', ')}</p>
                </div>

                <button onClick={onClose} className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    Done
                </button>
            </div>
        </div>
    );
};

// --- Main App Component (acts as a router) ---
function App({ token }) {
    const { busId } = useParams();
    const navigate = useNavigate();

    const [page, setPage] = useState('SELECTION'); // SELECTION, PAYMENT, CONFIRMATION
    const [bus, setBus] = useState(null);
    const [seats, setSeats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [isBooking, setIsBooking] = useState(false);
    const [bookingDetailsForTicket, setBookingDetailsForTicket] = useState(null);

    const fetchBusDetails = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:8000/api/buses/${busId}`);
            setBus(response.data);
            setSeats(response.data.seats || []);
        } catch (err) {
            console.error('Error in fetching details', err);
            setError('Failed to load bus details. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }, [busId]);

    useEffect(() => {
        if (busId) {
            fetchBusDetails();
        }
    }, [busId, fetchBusDetails]);

    const handleSelectSeat = (seat) => {
        setSelectedSeats(prevSelected => {
            const isAlreadySelected = prevSelected.some(s => s.id === seat.id);
            if (isAlreadySelected) {
                return prevSelected.filter(s => s.id !== seat.id);
            } else {
                if (prevSelected.length < 4) {
                    return [...prevSelected, seat];
                } else {
                    alert("You can select a maximum of 4 seats.");
                    return prevSelected;
                }
            }
        });
    };

    const handleProceedToPayment = () => {
        if (!token) {
            alert('Please login to book a seat.');
            navigate('/login');
            return;
        }
        if (selectedSeats.length > 0) {
            setPage('PAYMENT');
        }
    };

    const handleProcessPaymentAndBook = async () => {
        setIsBooking(true);
        const bookingPromises = selectedSeats.map(seat => {
            return axios.post('http://localhost:8000/api/booking/', { seat: seat.id }, { headers: { Authorization: `Token ${token}` } });
        });

        try {
            await Promise.all(bookingPromises);
            setBookingDetailsForTicket({ bus, seats: selectedSeats });
            setPage('CONFIRMATION');
            setSelectedSeats([]);
        } catch (err) {
            console.error('Booking failed:', err);
            alert(err.response?.data?.error || 'Booking failed. One or more seats may no longer be available. The list will be refreshed.');
            setPage('SELECTION');
            fetchBusDetails();
            setSelectedSeats([]);
        } finally {
            setIsBooking(false);
        }
    };

    const handleReturnToSelection = () => {
        setPage('SELECTION');
    };

    const handleCloseTicket = () => {
        // This will navigate the user to the home page route.
        // In a real app, this assumes you have a route setup for '/'.
        navigate('/');
    };

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen bg-blue-50"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div></div>;
    }

    if (error) {
        return <div className="flex justify-center items-center min-h-screen bg-blue-50 p-4"><div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-md" role="alert"><p className="font-bold">Error</p><p>{error}</p></div></div>;
    }

    // --- Page Router Logic ---
    if (page === 'PAYMENT') {
        return <PaymentPage 
                    onPay={handleProcessPaymentAndBook} 
                    onCancel={handleReturnToSelection} 
                    bus={bus} 
                    selectedSeats={selectedSeats} 
                    isProcessing={isBooking} 
                />
    }

    if (page === 'CONFIRMATION') {
        return <TicketConfirmationPage 
                    bookingDetails={bookingDetailsForTicket} 
                    onClose={handleCloseTicket} 
                />
    }

    // Default to 'SELECTION' page
    return (
        <div className="min-h-screen bg-blue-50 font-sans">
            <div className="container mx-auto px-4 py-8">
                {bus && (
                    <header className="mb-8">
                        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between">
                             <div>
                                <h1 className="text-3xl font-bold text-gray-800">{bus.bus_name}</h1>
                                <p className="text-gray-500">{bus.origin} → {bus.destination}</p>
                             </div>
                             <div className="text-right mt-4 md:mt-0">
                                <p className="text-lg font-semibold text-blue-600">{bus.travel_date}</p>
                                <p className="text-sm text-gray-500">Bus No: {bus.number}</p>
                             </div>
                        </div>
                    </header>
                )}

                <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                         <BusLayout
                            seats={seats}
                            onSelect={handleSelectSeat}
                            selectedSeats={selectedSeats}
                        />
                    </div>

                    <aside>
                        <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-8 flex flex-col h-[calc(100vh-4rem)]">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Selection</h2>
                            <div className="space-y-4 mb-6">
                                <div className="flex items-center"><div className="w-6 h-6 rounded-md bg-blue-100 mr-3"></div><span className="text-gray-600">Available</span></div>
                                <div className="flex items-center"><div className="w-6 h-6 rounded-md bg-yellow-400 mr-3"></div><span className="text-gray-600">Selected</span></div>
                                <div className="flex items-center"><div className="w-6 h-6 rounded-md bg-gray-300 mr-3"></div><span className="text-gray-600">Booked</span></div>
                            </div>

                            <div className="border-t pt-4 flex-grow">
                                {selectedSeats.length > 0 && bus ? (
                                    <div>
                                        <div className="mb-4">
                                            <h3 className="font-semibold text-gray-700">Selected Seats:</h3>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {selectedSeats.map(seat => (
                                                    <span key={seat.id} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">{seat.seat_number}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-gray-600">Total Price:</span>
                                            <span className="text-2xl font-bold text-blue-600">${bus.price_per_seat * selectedSeats.length}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-full"><p className="text-center text-gray-500">Please select a seat from the layout.</p></div>
                                )}
                            </div>
                             <button
                                onClick={handleProceedToPayment}
                                disabled={selectedSeats.length === 0 || isBooking}
                                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                Confirm and Pay
                            </button>
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
}

export default App;
