'use client';

import { useRouter } from 'next/navigation';
import 'primeicons/primeicons.css';

type SearchProps = {
    searchUser: string;
    setSearchUser: (value: string) => void;
};

// Search bar to find users
export default function Search({ searchUser, setSearchUser }: SearchProps) {
    const router = useRouter();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchUser(e.target.value);
    };

    return (
        <main>
            <div className="flex flex-col gap-3 md:flex-row md:align-items-center md:justify-between">
                <div className='relative w-full md:w-1/2'>
                    <div className='flex items-center rounded-lg border border-gray-300 bg-white shadow-sm transition focus-within:border-yellow-500 focus-within:ring-2 focus-within:ring-yellow-400'>
                        <i className="pi pi-search ml-4 text-gray-400" />
                        <input
                            type='text'
                            value={searchUser}
                            onChange={handleSearch}
                            placeholder="Search user"
                            className='w-full border-none bg-transparent px-3 py-3 text-gray-900 outline-none'
                        />
                    </div>
                </div>

                <button
                    onClick={() => router.push('')}
                    className="flex items-center justify-center gap-2 rounded-lg bg-yellow-400 px-4 py-3 font-semibold text-black transition hover:bg-yellow-500"
                >
                    <i className='pi pi-plus'/>
                    <span>Add user</span>
                </button>
            </div>
        </main>
    );
}