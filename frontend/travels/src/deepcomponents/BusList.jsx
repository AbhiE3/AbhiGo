import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const BusList = ({ token }) => {
    const [buses, setBuses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOrigin, setFilterOrigin] = useState('');
    const [filterDestination, setFilterDestination] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/buses/");
                setBuses(response.data);
            } catch (error) {
                console.log('error in fetching buses', error);
                setError('Failed to load buses. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchBuses();
    }, []);

    const handleViewSeats = (id) => {
        navigate(`/bus/${id}`);
    };

    const filteredBuses = buses.filter(bus => {
        const matchesSearch = bus.bus_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              bus.number.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesOrigin = filterOrigin ? bus.origin.toLowerCase() === filterOrigin.toLowerCase() : true;
        const matchesDestination = filterDestination ? bus.destination.toLowerCase() === filterDestination.toLowerCase() : true;
        return matchesSearch && matchesOrigin && matchesDestination;
    });

    const uniqueOrigins = [...new Set(buses.map(bus => bus.origin))];
    const uniqueDestinations = [...new Set(buses.map(bus => bus.destination))];

    // Main component render
    return (
        <div className="bg-gray-50 min-h-screen">

            {/* Hero Section */}
            <div className="relative bg-cover bg-center h-[60vh]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop')" }}>
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">Ride Smarter</h1>
                    <h2 className="text-5xl md:text-7xl font-extrabold text-blue-300">Save Together.</h2>
                </div>
                {/* Filter Panel */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-4xl px-4">
                    <div className="bg-white p-6 rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div className="col-span-1">
                            <label className="block text-xs font-medium text-gray-500 mb-1">From</label>
                            <select
                                className="w-full p-3 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={filterOrigin}
                                onChange={(e) => setFilterOrigin(e.target.value)}
                            >
                                <option value="">City, airport or station</option>
                                {uniqueOrigins.map(origin => (
                                    <option key={origin} value={origin}>{origin}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
                            <select
                                className="w-full p-3 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={filterDestination}
                                onChange={(e) => setFilterDestination(e.target.value)}
                            >
                                <option value="">City, airport or station</option>
                                {uniqueDestinations.map(destination => (
                                    <option key={destination} value={destination}>{destination}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-1">
                             <label className="block text-xs font-medium text-gray-500 mb-1 invisible">Search</label>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bus List Section */}
            <div className="container mx-auto px-4 py-8 mt-24">
                {isLoading ? (
                     <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                    </div>
                ) : error ? (
                     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                        <strong className="font-bold">Error! </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                ) : filteredBuses.length === 0 ? (
                    <div className="text-center py-16">
                        <h3 className="text-2xl font-medium text-gray-700">No buses found</h3>
                        <p className="mt-2 text-md text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredBuses.map((bus) => (
                            <div key={bus.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row items-center">
                                <div className="p-6 flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-800">{bus.bus_name}</h2>
                                            <p className="text-gray-800 font-semibold">Bus No: {bus.number}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-blue-600">${bus.price || '999'}</p>
                                            <p className="text-sm text-gray-500">per seat</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-gray-600 space-x-6">
                                        <div>
                                            <p className="font-bold text-lg">{bus.start_time}</p>
                                            <p className="text-sm">{bus.origin}</p>
                                        </div>
                                        <div className="text-gray-400">→</div>
                                        <div>
                                            <p className="font-bold text-lg">{bus.reach_time}</p>
                                            <p className="text-sm">{bus.destination}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-gray-50 w-full md:w-auto">
                                    <button
                                        onClick={() => handleViewSeats(bus.id)}
                                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BusList;
