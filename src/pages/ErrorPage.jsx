import { CornerDownLeft } from 'lucide';
import React from 'react';
import { useNavigate } from 'react-router';

const ErrorPage = () => {
    const navigate = useNavigate()
    const handleBack = () => {
        navigate(-1)
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-none">
        <div className="text-center">
          {/* <h1 className="text-6xl font-bold">404</h1> */}
          {/* <p className="text-2xl mt-2 w-1/3 font-semibold mx-auto ">{code}</p> */}
          <div className="mockup-code w-full">
            <pre data-prefix=">" className="text-warning">
              <code>Look like you're lost</code>
            </pre>
            <pre data-prefix=">" className="text-warning">
              <code>the page you are looking for not available!</code>
            </pre>
            <pre data-prefix=">" className="text-warning">
              <code> Go back</code>
            </pre>
          </div>
          <button
            onClick={handleBack}
            className="btn btn-active btn-primary mt-3"
          >
            Go Back
          </button>
          
        </div>
      </div>
    );
};

export default ErrorPage;