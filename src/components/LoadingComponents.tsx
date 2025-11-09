import React from "react";

const LoadingComponents: React.FC = () => (
    <div className="col-span-2 flex items-center justify-center py-20">
        <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-accent border-t-transparent absolute top-0 left-0" style={{ animationDuration: '0.8s' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-primary-600 rounded-full animate-pulse"></div>
            </div>
        </div>
    </div>
);

export default LoadingComponents;