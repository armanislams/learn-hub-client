import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Loader from '../../components/Common/Loader';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const AllCourse = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: courses = [], isLoading, error } = useQuery({
        queryKey: ['admin:courses'],
        queryFn: async () => {
            const res = await axiosSecure.get('/course');
            return res.data;
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => axiosSecure.delete(`/course/${id}`),
        onSuccess: () => {
            toast.success('Course deleted');
            queryClient.invalidateQueries(['admin:courses']);
        },
        onError: () => toast.error('Failed to delete course'),
    });

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Delete course?',
            text: 'This will permanently delete the course.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it',
        });

        if (result.isConfirmed) {
            deleteMutation.mutate(id);
        }
    };

    const handleEdit = (id) => {
        navigate(`/update-course/${id}`);
    };

    if (isLoading) return <Loader />;
    if (error) return <div className="container mx-auto py-10">Failed to load courses.</div>;

    return (
      <div className="container mx-auto py-8">
        <h2 className="heading mb-6">All Courses ({courses.length})</h2>

        <div className="overflow-x-auto bg-base-100 p-4 rounded-lg shadow">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Instructor</th>
                <th>Category</th>
                <th>Price</th>
                <th>Students</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c, idx) => (
                <tr key={c._id || idx}>
                  <th>{idx + 1}</th>
                  <td className="max-w-xs truncate">{c.title}</td>
                  <td>{c.instructor || c.author || "—"}</td>
                  <td>{c.category || "—"}</td>
                  <td>${Number(c.price || 0).toFixed(2)}</td>
                  <td>{c.students ?? 0}</td>
                  <td className="flex gap-3 items-center">
                    <button
                      onClick={() => handleEdit(c._id)}
                      className="text-blue-600 hover:text-blue-800"
                      aria-label={`Edit ${c.title}`}
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(c._id)}
                      className="text-red-600 hover:text-red-800"
                      disabled={deleteMutation.isLoading}
                      aria-label={`Delete ${c.title}`}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default AllCourse;