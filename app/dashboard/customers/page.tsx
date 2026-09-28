'use client';

import { User } from '@/app/lib/definitions';
import { useEffect, useState } from 'react';
import Search from '@/app/ui/Search-bar';

export default function Customers() {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchUser, setSearchUser] = useState('');

    //Get users from the backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
                    credentials: 'include',
                });
                const json = await res.json();
                console.log('Backend response:', json);

                if (json.ok && Array.isArray(json.data)) {
                    setUsers(json.data);
                }

            } catch (error) {
                console.error('Error loading users', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    //Filter users
    const filterUser = users.filter((user) =>
        user.fullName.toLowerCase().includes(searchUser.toLowerCase())
    );

    //Format date to day-month-year
    const formatDate = (date?: string | null) => (date ? new Date(date).toDateString() : '-');

    return (
        <main className='min-h-screen bg-gray-50 p-6'>
            <div className='mx-auto max-w-7xl'>
                <div className='mb-6'>
                    <h1 className='text-2xl font-bold text-gray-900'>
                        Customers
                    </h1>
                    <p className='mt-1 text-sm text-gray-500'>
                        Manage and view customer information
                    </p>
                </div>
                <div className='mb-4'>
                    <Search
                        searchUser={searchUser}
                        setSearchUser={setSearchUser}
                    />
                </div>
                <div className='overflow-x-auto'>
                    <table className='w-full text-left text-sm'>
                        <thead className='border-b border-gray-200 bg-gray-50'>
                            <tr>
                                <th className='px-6 py-4 font-semibold text-gray-700'>Full Name</th>
                                <th className='px-6 py-4 font-semibold text-gray-700'>Phone Number</th>
                                <th className='px-6 py-4 font-semibold text-gray-700'>Email</th>
                                <th className='px-6 py-4 font-semibold text-gray-700'>Address</th>
                                <th className='px-6 py-4 font-semibold text-gray-700'>Last Login</th>
                                <th className='px-6 py-4 font-semibold text-gray-700'>Created</th>
                                <th className='px-6 py-4 font-semibold text-gray-700'>Updated</th>

                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-100'>
                            {filterUser.map((user) => (
                                <tr key={user.id}
                                className='transition-colors hover:bg-gray-50'>
                                    <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-900'>{user.fullName}</td>
                                    <td className='whitespace-nowrap px-6 py-4 text-gray-600'>{user.userPhone}</td>
                                    <td className='px-6 py-4 text-gray-600'>{user.userEmail}</td>
                                    <td className='px-6 py-4 text-gray-600'>{user.userAddress}</td>
                                    <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-600'>{formatDate(user.lastLogin)}</td>
                                    <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-600'>{formatDate(user.createdDate)}</td>
                                    <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-600'>{formatDate(user.updatedDate)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}