import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import CarCard from '../components/CarCard';

const CarListingPage = () => {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [filters, setFilters] = useState({ type: '', minPrice: '', maxPrice: '' });

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const queryParams = {};
            if (filters.type) queryParams.type = filters.type;
            if (filters.minPrice) queryParams.minPrice = filters.minPrice;
            if (filters.maxPrice) queryParams.maxPrice = filters.maxPrice;

            const { data } = await api.get('/cars', { params: queryParams });
            setCars(data);
        } catch (error) {
            console.error('Error fetching cars', error);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mx-auto px-4 mt-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-primary mb-4 transition duration-300 font-medium"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back
            </button>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Fleet</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center border border-gray-100">
                <input name="type" placeholder="Type (e.g. SUV)" onChange={handleFilterChange} className="w-full md:flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary" />
                <input name="minPrice" placeholder="Min Price" type="number" onChange={handleFilterChange} className="w-full md:w-32 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary" />
                <input name="maxPrice" placeholder="Max Price" type="number" onChange={handleFilterChange} className="w-full md:w-32 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary" />
                <button onClick={fetchCars} className="w-full md:w-auto bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-300">Filter</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {cars.map(car => <CarCard key={car._id} car={car} />)}
            </div>
            {cars.length === 0 && <p className="text-center text-gray-500 mt-8 text-lg">No cars found matching criteria.</p>}
        </div>
    );
};

export default CarListingPage;
