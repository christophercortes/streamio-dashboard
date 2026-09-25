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
        <main>
            <Search searchUser={ searchUser} setSearchUser={setSearchUser} />
            <h1>{ }</h1>
            <table>
                <thead>
                    <tr>
                        <th>Full Name:</th>
                        <th>Phone Number:</th>
                        <th>Email:</th>
                        <th>Address:</th>
                        <th>Last Login:</th>
                        <th>Created:</th>
                        <th>Updated:</th>

                    </tr>
                </thead>
                <tbody>
                    {filterUser.map((user) => (
                        <tr key={user.id}>
                            <td>{user.fullName}</td>
                            <td>{user.userPhone}</td>
                            <td>{user.userEmail}</td>
                            <td>{user.userAddress}</td>
                            <td>{formatDate(user.lastLogin)}</td>
                            <td>{formatDate(user.createdDate)}</td>
                            <td>{formatDate(user.updatedDate)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}