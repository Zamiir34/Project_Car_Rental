import { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const AdminCarManagement = () => {
    const [cars, setCars] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '', type: '', pricePerDay: '', image: '', description: '', transmission: 'Automatic', seats: 4
    });

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const { data } = await api.get('/cars');
            setCars(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch cars');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            try {
                await api.delete(`/cars/${id}`);
                setCars(cars.filter(car => car._id !== id));
                toast.success('Car deleted');
            } catch (error) {
                console.error(error);
                toast.error('Failed to delete car');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/cars', formData);
            setCars([...cars, data]);
            setShowModal(false);
            setFormData({ name: '', type: '', pricePerDay: '', image: '', description: '', transmission: 'Automatic', seats: 4 });
            toast.success('Car added');
        } catch (error) {
            console.error(error);
            toast.error('Failed to add car');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-12">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-800">Manage Cars</h3>
                <button onClick={() => setShowModal(true)} className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition duration-300 shadow-sm">+ Add Car</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Image</th>
                            <th className="p-4 font-semibold text-gray-600">Name</th>
                            <th className="p-4 font-semibold text-gray-600">Type</th>
                            <th className="p-4 font-semibold text-gray-600">Price</th>
                            <th className="p-4 font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map(car => (
                            <tr key={car._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                <td className="p-4">
                                    <img src={car.image} alt={car.name} className="w-16 h-10 object-cover rounded-md" />
                                </td>
                                <td className="p-4 font-medium">{car.name}</td>
                                <td className="p-4">{car.type}</td>
                                <td className="p-4">${car.pricePerDay}</td>
                                <td className="p-4">
                                    <button
                                        onClick={() => handleDelete(car._id)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto animate-fade-in-up">
                        <h3 className="text-2xl font-bold mb-6">Add New Car</h3>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input
                                placeholder="Name"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    placeholder="Type (e.g. SUV)"
                                    value={formData.type}
                                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                                />
                                <input
                                    placeholder="Price per Day"
                                    type="number"
                                    value={formData.pricePerDay}
                                    onChange={e => setFormData({ ...formData, pricePerDay: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                                />
                            </div>
                            <input
                                placeholder="Image URL"
                                value={formData.image}
                                onChange={e => setFormData({ ...formData, image: e.target.value })}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                            />
                            <textarea
                                placeholder="Description"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                                rows="3"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <select
                                    value={formData.transmission}
                                    onChange={e => setFormData({ ...formData, transmission: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                                >
                                    <option value="Automatic">Automatic</option>
                                    <option value="Manual">Manual</option>
                                </select>
                                <input
                                    placeholder="Seats"
                                    type="number"
                                    value={formData.seats}
                                    onChange={e => setFormData({ ...formData, seats: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                                />
                            </div>

                            <div className="flex gap-4 mt-4">
                                <button type="submit" className="flex-1 bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300">Save Car</button>
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-gray-300 text-gray-600 hover:bg-gray-50 font-bold py-3 rounded-lg transition duration-300">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCarManagement;
