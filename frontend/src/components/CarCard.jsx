import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100">
            <div className="overflow-hidden h-48">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{car.name}</h3>
                <p className="text-gray-500 text-sm mb-4 flex flex-wrap gap-2">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">{car.type}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">{car.transmission}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">{car.seats} Seats</span>
                </p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                    <p className="text-primary text-xl font-bold">${car.pricePerDay}<span className="text-sm text-gray-400 font-normal">/day</span></p>
                    <Link to={`/book/${car._id}`} className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-300 shadow-sm">
                        Book Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
