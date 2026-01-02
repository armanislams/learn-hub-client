const CategorySkeleton = () => (
  <div className="flex gap-3 mb-6">
    {Array.from({ length: 10 }).map((_, i) => (
      <div key={i} className="skeleton h-10 w-24 rounded-lg"></div>
    ))}
  </div>
);
 export default CategorySkeleton