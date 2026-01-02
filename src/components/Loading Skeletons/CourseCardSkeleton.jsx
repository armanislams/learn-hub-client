const CourseCardSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <div className="skeleton h-40 w-full"></div>
      </figure>

      <div className="card-body space-y-3">
        <div className="skeleton h-5 w-3/4"></div>
        <div className="skeleton h-4 w-1/2"></div>

        <div className="flex gap-2">
          <div className="skeleton h-4 w-16"></div>
          <div className="skeleton h-4 w-12"></div>
        </div>

        <div className="skeleton h-10 w-full rounded-lg"></div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
