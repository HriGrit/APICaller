import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AvatarInitials from './AvatarInitials';
import "./UserSummary.css";

function UserSummary({ user }) {
    const [userSummary, setUserSummary] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const id = user;
    const [selectedUser, setSelectedUser] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://602e7c2c4410730017c50b9d.mockapi.io/users/${id}`);
                setUserSummary(response.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setError(err);
                setLoading(false);
            }
        }
        fetchUser();
    }, [id]);

    const handleUserClick = () => {
        setSelectedUser(!selectedUser);
    }

    return (
        <div>
            <div className='h-[60px] bg-red-200 text-4xl text-center p-2 rounded-lg mb-[7.5%] mr-8'>
                Users List
            </div>
            <div className='w-full flex flex-col justify-center items-center'>
                <button className='bg-blue-200 p-2 rounded-lg' onClick={handleUserClick}>Display User</button>
                <div className='mt-[7.5%] w-full'>
                    {loading ? (
                        <div>Loading...</div>
                    ) : selectedUser ? (
                        <>
                            <div className='flex flex-col justify-center items-center'>
                                <div className='avatar rounded-3xl'>
                                    <AvatarInitials name={userSummary?.profile?.username} />
                                </div>
                                <h1 className='mt-5'> @{userSummary?.profile?.username}</h1>
                            </div>
                            <div className='mt-[5%] mr-8'>
                                <p className='bg-slate-200 p-2 w-full rounded-lg text-left mb-[10%] pp'>{userSummary.Bio}</p>
                                <p className='text-left'>Full Name</p>
                                <p className='bg-slate-200 p-2 w-full rounded-lg text-left mb-[5%] p'>{userSummary.profile.username}</p>
                                <p>Job Title</p>
                                <p className='bg-slate-200 p-2 w-full rounded-lg text-left mb-[5%] p'>{userSummary.jobTitle}</p>
                                <p>Email</p>
                                <p className='bg-slate-200 p-2 w-full rounded-lg text-left p'>{userSummary.profile.email}</p>
                            </div>
                        </>
                    ) : (
                        <div>User not found</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserSummary;
