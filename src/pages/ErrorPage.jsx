import { CornerDownLeft } from 'lucide';
import React from 'react';
import { useNavigate } from 'react-router';
import useTitle from '../hooks/useTitle';

const ErrorPage = () => {
    useTitle('Error 404')
    const navigate = useNavigate()
    const handleBack = () => {
        navigate(-1)
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-none">
        <div className="text-base-content text-center">
         
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