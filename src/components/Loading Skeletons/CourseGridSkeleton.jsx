import React from 'react';
import CourseCardSkeleton from './CourseCardSkeleton';


const CourseGridSkeleton = ({ count = [] }) => {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <CourseCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default CourseGridSkeleton;
