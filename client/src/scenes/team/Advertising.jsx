import { useEffect, useState } from "react";
import AddNewTaskModal from "./AddNewModal";
import InvestmentDetailsModal from "./InvestmentDetailsModal.jsx";
import axios from "axios";
import { formatMemberSinceDate } from "utils/date";
import { FaEye } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import toast from "react-hot-toast";

const Advertising = () => {
    const [users, setUsers] = useState([]);
    const [invetments, setInvetments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInvestment, setSelectedInvestment] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/v2/auth/seller/buyer/admin/users/special"
            );
            setUsers(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message || "Something went wrong");
            setLoading(false);
        }
    };

    const fetchInvetments = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/v8/invest/get"
            );
            setInvetments(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message || "Something went wrong");
            setLoading(false);
        }
    };

    // Fetch users and investments from the API
    useEffect(() => {
        fetchUsers();
        fetchInvetments();
    }, []);

    const handleViewDetails = (investment) => {
        setSelectedInvestment(investment);
    };

    const handleDeleteInvestment = async (investmentId) => {
        try {
            await axios.delete(
                `http://localhost:8000/api/v8/invest/delete/investment/${investmentId}`
            );
            setInvetments(invetments.filter((invest) => invest._id!== investmentId));
            toast.success("Investment deleted successfully!");
        } catch (err) {
            console.error(err.message);
            toast.error("Failed to delete investment!");
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="lg:p-4 p-1">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <p className="font-semibold">Affiliate Investments ({invetments.length})</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-3 mb-2 lg:px-4 lg:py-2 px-2 py-1 bg-[#ff4560] text-white rounded"
                >
                    Add New
                </button>
            </div>

            {/* Responsive Table Container */}
            <div className="overflow-auto h-full">
                <table className="min-w-full border border-gray-200">
                    {/* Table Header */}
                    <thead>
                        <tr className="bg-[#FCF9FE] text-[8px] lg:text-[11px]">
                            <th className="lg:p-2 p-1 text-left border border-gray-300">Sr#</th>
                            <th className="lg:p-2 p-1 text-left border border-gray-300">UserName</th>
                            <th className="lg:p-2 p-1 text-left border border-gray-300">CTR</th>
                            <th className="lg:p-2 p-1 text-left border border-gray-300 hidden lg:table-cell">Amount</th>
                            <th className="lg:p-2 p-1 text-left border border-gray-300">Invest Date</th>
                            <th className="lg:p-2 p-1 text-left border border-gray-300">Action</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {invetments.map((invest, index) => (
                            <tr
                                key={invest._id}
                                className="text-[6px] lg:text-[11px] hover:bg-[#FCF9FE] hover:text-black"
                            >
                                <td className="lg:p-2 p-1 border border-gray-300">{index + 1}</td>
                                <td className="lg:p-2 p-1 border border-gray-300">{invest.userName}</td>
                                <td className="lg:p-2 p-1 border border-gray-300">{invest.investmentCtr}</td>
                                <td className="lg:p-2 p-1 border border-gray-300 hidden lg:table-cell">PKR {invest.investmentAmount}</td>
                                <td className="lg:p-2 p-1 border border-gray-300">{formatMemberSinceDate(invest.createdAt)}</td>
                                <td className="lg:p-2 p-1 border flex items-center text-base text-center justify-around border-gray-300">
                                    <button
                                        onClick={() => handleViewDetails(invest)}
                                        className="px-2 py-1 text-gray-800  rounded "
                                    >
                                        <FaEye/>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteInvestment(invest._id)} // Pass the ID correctly
                                        className="px-2 py-1 text-gray-800 rounded"
                                        >
                                        <MdDeleteSweep />
                                        </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add New Task Modal */}
            <AddNewTaskModal
                fetchInvetments={fetchInvetments}
                invetments={invetments}
                user={users}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            {/* Investment Details Modal */}
            {selectedInvestment && (
                <InvestmentDetailsModal
                    investment={selectedInvestment}
                    onClose={() => setSelectedInvestment(null)}
                />
            )}
        </div>
    );
};

export default Advertising;
