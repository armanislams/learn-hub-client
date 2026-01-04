import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Loader from '../../components/Common/Loader';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: users = [], isLoading, error } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    // const roleMutation = useMutation({
    //     mutationFn: async ({ email, role }) => {
    //         return axiosSecure.patch(`/users/${email}/${role}`,role);
    //     },
    //     onSuccess: () => {
    //         toast.success('Role updated');
    //         queryClient.invalidateQueries(['allUsers']);
    //     },
    //     onError: () => toast.error('Failed to update role'),
    // });

    const deleteMutation = useMutation({
        mutationFn: async (email) => axiosSecure.delete(`/users/${email}`),
        onSuccess: () => {
            toast.success('User deleted');
            queryClient.invalidateQueries(['allUsers']);
        },
        onError: () => toast.error('Failed to delete user'),
    });

    // const handleRoleChange = (email, newRole) => {
    //     roleMutation.mutate({ email, role: newRole });
    // };

    const handleDelete = async (email) => {
        const result = await Swal.fire({
            title: 'Delete user? ',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete',
        });

        if (result.isConfirmed) {
            deleteMutation.mutate(email);
        }
    };

    if (isLoading) return <Loader />;
    if (error) return <div className="container mx-auto py-10">Failed to load users.</div>;

    return (
        <div className="container mx-auto py-8">
            <h2 className="heading mb-6">All Users</h2>

            <div className="overflow-x-auto bg-base-100 p-4 rounded-lg shadow">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            {/* <th>Role</th> */}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u, idx) => (
                            <tr key={u.email || u._id}>
                                <th>{idx + 1}</th>
                                <td>{u.name || u.displayName || '—'}</td>
                                <td>{u.email}</td>
                                {/* <td>
                                    <select
                                        value={u.role || 'student'}
                                        onChange={(e) => handleRoleChange(u.email, e.target.value)}
                                        className="select select-sm"
                                        disabled={roleMutation.isLoading}
                                    >
                                        <option value="student">Student</option>
                                        <option value="instructor">Instructor</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td> */}
                                <td>
                                    <button
                                        onClick={() => handleDelete(u.email)}
                                        className="text-red-600 hover:text-red-800"
                                        disabled={deleteMutation.isLoading}
                                        aria-label={`Delete ${u.email}`}
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

export default AllUsers;