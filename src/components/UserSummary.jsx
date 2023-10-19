import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AvatarInitials from './AvatarInitials';

function UserSummary({ user }) {
    const [userSummary, setUserSummary] = useState([]);
    const [error, setError] = useState(null);
    const id = user;
    const [selectedUser, setSelectedUser] = useState(false);
    console.log(id);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://602e7c2c4410730017c50b9d.mockapi.io/users/${id}`);
                setUserSummary(response.data);
            } catch (err) {
                console.log(err);
                setError(err);
            }
        }
        fetchUser();
    }, [id])

    const handleUserClick = () => {
        setSelectedUser(!selectedUser);
    }
    return (
        <div>
            <div className='h-[60px] bg-red-200 text-4xl text-center p-2 rounded-lg mb-[7.5%]'>
                Users List
            </div>
            {userSummary ? (
                <div className='w-full flex flex-col justify-center items-center'>
                    <button className='bg-blue-200 p-2 rounded-lg' onClick={handleUserClick}>Display User</button>
                    <div className='mt-[7.5%] w-full'>
                        {selectedUser && (
                            <div className='flex flex-col justify-center items-center'>
                                <AvatarInitials className="" name={userSummary?.profile?.username} />
                                <h1 className='mt-[10%]'> @{userSummary?.profile?.username}</h1>
                                <p className=' bg-slate-200 p-2 w-full rounded-lg mt-[5%] text-center'>{userSummary.Bio}</p>
                            </div>
                        )}
                    </div>
                </div>

            ) : (
                <div>User not here</div>
            )}
        </div>
    )
}

export default UserSummary;
