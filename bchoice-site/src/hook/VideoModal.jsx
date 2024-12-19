import React, { useState } from 'react';

const VideoModal = ({ isVidoeModalOpen, videoUrl, closeVidoeModal }) => {
  const [isLoading, setIsLoading] = useState(true); // State to show "Loading..." initially

  if (!isVidoeModalOpen) return null;
  
  const handleIframeLoad = () => {
    setIsLoading(false); // Hide "Loading..." once the iframe is fully loaded
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 overflow-auto flex items-center justify-center z-50"
      onClick={closeVidoeModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-lg shadow-lg max-w-3xl w-full mx-4"
      >
        {/* Header with Title and Close Button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <h2 className="text-xl font-bold text-center flex-1">Custom Gifts</h2>
          <button
            onClick={closeVidoeModal}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            &times;
          </button>
        </div>

        {/* Loading Message */}


        {/* Video Scrollable Container */}
        <div className="p-4 max-h-[500px] overflow-y-scroll">
          {videoUrl?.map((url, index) => (
            <div key={index} className="relative w-full pt-[56.25%] mb-4"> {/* 16:9 Aspect Ratio */}
              <iframe
                src={url} // Use embed URL
                title={`Product Video ${index + 1}`} // Dynamic title
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope;"
                allowFullScreen
                className="absolute inset-0 w-full h-full "
                onLoad={handleIframeLoad} // Hide loading message when iframe loads
              ></iframe>
            </div>
          ))}
        </div>

        {/* Footer with Close Button */}
        <div className="p-4 text-right">
          <button
            onClick={closeVidoeModal}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
