import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AvatarInitials from './AvatarInitials';

function UserList({ papa }) {
    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    const [visibleUsers, setVisibleUsers] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(4);
    const [inputUsername, setInputUsername] = useState('');
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

    useEffect(() => {
        let isfetch = true;

        const fetchData = async () => {
            try {
                setIsFetching(true);
                const response = await axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users');
                setVisibleUsers([]); // Clear the previous data
                setVisibleUsers(response.data.slice(startIndex, endIndex));
                if (isfetch) {
                    setData(response.data);
                    setError(null);
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
                if (isfetch) {
                    setError(error.message);
                }
            } finally {
                if (isfetch) {
                    setIsFetching(false);
                }
            }
        };

        if (isFetching) {
            fetchData();
        }

        return () => {
            isfetch = false; // Clean up to prevent state updates on unmounted component
        };
    }, [isFetching, startIndex, endIndex]);

    const handlenewuser = () => {
        const newStartIndex = endIndex + 1;
        const newEndIndex = newStartIndex + 4;
        if (newEndIndex < data.length) {
            setStartIndex(newStartIndex);
            console.log(startIndex);
            setEndIndex(newEndIndex);
            setVisibleUsers(data.slice(newStartIndex, newEndIndex));
        }
    };

    const handleprevoius = () => {
        const newStartIndex = startIndex - 5;
        const newEndIndex = endIndex - 5;
        if (newStartIndex >= 0) {
            setStartIndex(newStartIndex);
            console.log(startIndex);
            setEndIndex(newEndIndex);
            setVisibleUsers(data.slice(newStartIndex, newEndIndex));
        }
    }

    const checkUsernameAvailability = () => {
        const keyword = inputUsername.trim().toLowerCase();
        const filteredUsers = data.filter(user => user.profile.username.toLowerCase().includes(keyword));
        const remainingUsers = data.filter(user => !user.profile.username.toLowerCase().includes(keyword));
        const sortedUsers = [...filteredUsers, ...remainingUsers];

        setIsUsernameAvailable(keyword === '' || filteredUsers.length > 0);
        // console.log(sortedUsers);
        if (filteredUsers.length > 0) {
            setVisibleUsers(sortedUsers.slice(startIndex, endIndex));
        } else {
            setVisibleUsers(data.slice(startIndex, endIndex));
        }
    };

    const handleFetchData = (e) => {
        e.preventDefault();
        setIsFetching(true); // Trigger the fetching process
    };

    const sendtopapa = (id) => {
        papa(id);
    }

    return (
        <div>
            {error ? (
                <div className="text-5xl">
                    <h1>{error}</h1>
                </div>
            ) : (
                <>
                    <button className="fixed top-12 right-[45%] bg-green-200 p-7 px-9 rounded-lg mx-auto block" onClick={handleFetchData}>
                        {isFetching ? 'Fetching...' : 'Fetch Data'}
                    </button>
                    <div className='h-[60px] bg-red-200 text-4xl text-center p-2 rounded-lg mb-[5%]'>
                        Users List
                    </div>
                    <div className='flex flex-row justify-between'>
                        {data.length > endIndex + 1 && (
                            <button
                                className="bg-blue-200 p-2 rounded-lg"
                                onClick={handlenewuser}

                            >
                                Show Next 5 Users
                            </button>
                        )}
                        {startIndex > 1 && (
                            <button
                                className="bg-blue-200 p-2 rounded-lg"
                                onClick={handleprevoius}

                            >
                                Show Prev 5 Users
                            </button>
                        )}
                    </div>
                    <div className='flex flex-row justify-between mt-[2.5%]'>
                        <input
                            className='border-2 p-2 rounded-lg w-[50%]'
                            type="text"
                            value={inputUsername}
                            onChange={(e) => setInputUsername(e.target.value)}
                            placeholder="Enter username"
                        />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg" onClick={checkUsernameAvailability}>Check Availability</button>
                    </div>
                    {isUsernameAvailable ? (
                        <p className='bg-green-200 w-fit p-1 rounded-lg mt-[2%]'>Similar Username is available!</p>
                    ) : (
                        <p className='bg-red-200 w-fit p-1 rounded-lg mt-[2%]'>Username is not available.</p>
                    )}
                    {visibleUsers.map((user, index) => (
                        <div className="border-2 p-4 mt-[5%]" key={index}>
                            <button className='w-full' onClick={() => sendtopapa(user.id)}>
                                <div className="flex flex-row justify-between text-3xl mx-auto">
                                    <AvatarInitials className="" name={user.profile.username} />
                                    <div className="">{user.profile.username}</div>
                                </div>
                            </button>
                        </div>
                    ))}
                </>
            )
            }
        </div >
    );
}

export default UserList;
