import React from "react";

const InvestmentDetailsModal = ({ investment, onClose }) => {
    if (!investment) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-full max-w-lg p-6 rounded shadow-lg">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Investment Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 text-lg"
                    >
                        &times;
                    </button>
                </div>

                {/* Modal Content */}
                <div className="space-y-4">
                    <div>
                        <strong>User Name:</strong> {investment.userName}
                    </div>
                    <div>
                        <strong>Investment Amount:</strong> PKR {investment.investmentAmount}
                    </div>
                    <div>
                        <strong>CTR:</strong> {investment.investmentCtr}
                    </div>
                    <div>
                        <strong>Investment Date:</strong>{" "}
                        {new Date(investment.createdAt).toLocaleDateString()}
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="mt-6 text-right">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvestmentDetailsModal;
