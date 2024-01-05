import React from 'react'
import '../ComStyle.css'
import Dashboard from '../Dashboard'
import { useEffect, useState } from 'react'

const User = () => {
    const [userFname, setUserFname] = useState()
    useEffect(() => {
        const data = window.localStorage.getItem('firstname');
        if (data !== null) {
            setUserFname(data.toString());
        }
    }, [])
    return (
        <div className='text-left mt-10 mb-10 w-full'>
            <div className="w-full">
                <div className='headerDiv w-full'>
                    <h2 style={{ fontWeight: 'bold', marginBottom: '0' }}>Dashboard</h2>
                    <div>Hello {userFname}! Welcome to EBook Web</div>
                </div>
            </div>
            <div className='w-full'>
                <Dashboard />
            </div>


        </div>
    )
}

export default User