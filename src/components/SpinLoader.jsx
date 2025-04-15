import React from "react";

const SpinLoader = ({ classes }) => {
  return (
    <div className={`flex justify-center items-center ${classes}`}>
      <div className="w-12 h-12 relative">
        <svg className="w-full h-full animate-spin" viewBox="0 0 50 50">
          <circle
            className="stroke-current"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="4"
            strokeDasharray="1, 150"
            strokeDashoffset="0"
            strokeLinecap="round"
            style={{
              animation:
                "dash 1.5s ease-in-out infinite, colors 6s ease-in-out infinite",
            }}
          />
        </svg>
      </div>

      <style jsx="true">{`
        @keyframes dash {
          0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
          }
          100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
          }
        }

        @keyframes colors {
          0% {
            stroke: #4285f4;
          }
          25% {
            stroke: #ea4335;
          }
          50% {
            stroke: #fbbc05;
          }
          75% {
            stroke: #34a853;
          }
          100% {
            stroke: #4285f4;
          }
        }
      `}</style>
    </div>
  );
};

export default SpinLoader;
