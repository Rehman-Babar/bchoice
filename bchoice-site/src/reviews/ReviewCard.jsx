import React from "react";

const ReviewCard = ({ review }) => {
  const { name, date, rating, comment, reply } = review;

  return (
    <div className="border rounded-lg p-2 md:p-4">
      <div className="flex items-start space-x-4">
        <div className="bg-gray-200 rounded-full h-10 w-10"></div>
        <div>
          <h5 className="text-sm font-medium">{name}</h5>
          <p className="text-xs text-gray-500">{date}</p>
          <div className="flex items-center space-x-1 mt-1">
            {[...Array(rating)].map((_, i) => (
              <span key={i} className="text-blue-500 text-lg">
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 text-gray-600">{comment}</p>
      <div className="border-l-2 border-gray-300 pl-4 mt-2">
        <h6 className="text-sm font-semibold">Bservices Reply</h6>
        <p className="text-sm text-gray-600">{reply}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
