import React, { useState } from 'react';

const StatusBar = ({ currentStatus }) => {
    // Array of status options
    const statuses = [
      "Viewed",
      "Authority Contacted ",
      "Work in Progress",
      "Resolved",
    ];
  
    return (
      <div className="flex flex-col items-center justify-center w-[100vh] p-4">
        {/* Status Bar */}
        <div className="relative w-full max-w-3xl h-6 bg-gray-200 rounded-full">
          {/* Green progress bar */}
          <div
            className="absolute top-0 left-0 h-6 bg-green-500 rounded-full"
            style={{
              width: `${(currentStatus / (statuses.length)) * 100}%`, // Calculate width based on currentStatus
            }}
          ></div>
        </div>
  
        {/* Dots and Status Labels */}
        <div className="flex justify-between w-full max-w-3xl mt-4">
          {statuses.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full text-center flex items-center justify-center font-bold ${
                  index+1 <= currentStatus ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
                }`}
              >
                {index + 1}
              </div>
              <p
                className={`mt-2 text-sm ${
                  index <= currentStatus ? "text-green-700" : "text-gray-700"
                }`}
              >
                { index+1 <= currentStatus ? item : ""}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default StatusBar;