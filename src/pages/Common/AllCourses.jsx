import React, { useState, useMemo } from "react";
import useAxios from "../../hooks/UseAxios";
import CourseCard from "../../components/Cards/CourseCard";
import useTitle from "../../hooks/useTitle";
import { useQuery } from "@tanstack/react-query";
import CourseGridSkeleton from "../../components/Loading Skeletons/CourseGridSkeleton";

const AllCourses = () => {
  useTitle("All Course");
  const AxiosInstance = useAxios();
  const [category, setCategory] = useState(""); // selected category
  const [searchTerm, setSearchTerm] = useState(""); // search term
  const [sortPrice, setSortPrice] = useState(""); // sort by price
  const [currentPage, setCurrentPage] = useState(1); // current page
  const ITEMS_PER_PAGE = 8;

  const { data = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const result = await AxiosInstance.get("/course");
      return result.data;
    },
  });

  // Derive unique categories from course data
  const categories =
    data && data.length > 0 ? [...new Set(data.map((c) => c.category))] : [];

  // Apply filters, search, and sorting
  const filteredAndSortedCourses = useMemo(() => {
    let result = [...data];

    // Filter by category
    if (category) {
      result = result.filter((c) => c.category === category);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(term) ||
          c.description.toLowerCase().includes(term) ||
          (c.instructor && c.instructor.toLowerCase().includes(term))
      );
    }

    // Sort by price
    if (sortPrice === "low-to-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortPrice === "high-to-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [data, category, searchTerm, sortPrice]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCourses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCourses = filteredAndSortedCourses.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="heading text-center mb-8">All Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Category filter - Sidebar */}
        <aside className="md:col-span-1">
          <div className="sticky top-20 bg-base-100 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Filter by Category</h3>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered w-full bg-base-100 text-base-content font-semibold"
            >
              <option value="">All Categories</option>
              {isLoading ? (
                <option disabled>Loading categories...</option>
              ) : (
                categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))
              )}
            </select>

            {/* Active filter badge */}
            {category && (
              <div className="mt-4 p-3 bg-indigo-100 rounded-lg">
                <p className="text-sm text-base-content">
                  <strong>Active Filter:</strong> {category}
                </p>
                <button
                  onClick={() => setCategory("")}
                  className="text-xs text-indigo-600 hover:text-indigo-800 mt-2 underline"
                >
                  Clear filter
                </button>
              </div>
            )}

            {/* Search and Sort Controls */}
            <div className="mb-6 space-y-4">
              {/* Search Input */}
              <div className="py-5">
                <p className="block text-sm font-semibold mb-2">Search</p>
                <input
                  type="text"
                  placeholder="Search by title, description, or instructor..."
                  value={searchTerm}
                  onChange={(e) =>
                    handleFilterChange(setSearchTerm, e.target.value)
                  }
                  className="input input-bordered w-full bg-base-100 text-base-content"
                />
              </div>

              {/* Sort Dropdown */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Sort by Price
                </label>
                <select
                  value={sortPrice}
                  onChange={(e) =>
                    handleFilterChange(setSortPrice, e.target.value)
                  }
                  className="select select-bordered w-full bg-base-100 text-base-content"
                >
                  <option value="">No Sort</option>
                  <option value="low-to-high">Low to High</option>
                  <option value="high-to-low">High to Low</option>
                </select>
              </div>

              {/* Results count */}
              <div className="text-sm text-gray-600">
                Showing {paginatedCourses.length > 0 ? startIndex + 1 : 0} -{" "}
                {Math.min(
                  startIndex + ITEMS_PER_PAGE,
                  filteredAndSortedCourses.length
                )}{" "}
                of {filteredAndSortedCourses.length} courses
              </div>
            </div>
          </div>
        </aside>

        {/* Courses grid */}
        <div className="md:col-span-3">
          {/* Courses Grid */}
          {isLoading ? (
            <CourseGridSkeleton count={8} />
          ) : paginatedCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">
                No courses found matching your filters.
              </p>
              <button
                onClick={() => {
                  setCategory("");
                  setSearchTerm("");
                  setSortPrice("");
                  setCurrentPage(1);
                }}
                className="btn btn-sm btn-indigo mt-4"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedCourses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="btn btn-sm btn-outline"
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`btn btn-sm ${
                          currentPage === page
                            ? "btn-active btn-indigo"
                            : "btn-outline"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="btn btn-sm btn-outline"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
