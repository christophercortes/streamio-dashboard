'use client';

import { useRouter } from 'next/navigation';

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
            <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center gap-3">
                <span className="">
                    <input value={searchUser} onChange={ handleSearch} placeholder="Search user" className='w-full' />
                </span>

                <button
                    onClick={() => router.push('')}
                    className="bg-amber-300"
                >
                    Add user
                </button>
            </div>
        </main>
    );
}