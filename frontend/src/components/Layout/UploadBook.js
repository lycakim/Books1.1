// import { useState } from "react"
import Books from "../Books"
// import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from 'react'

const UploadBook = () => {
  // const [searchTxt, setSearchTxt] = useState()
  // const [searchParams, setSearchParams] = useSearchParams()
  // const getSearch = searchParams.get('filter') === 'all'
  const [userFname, setUserFname] = useState()
  useEffect(() => {
    const data = window.localStorage.getItem('firstname');
    if (data !== null) {
      setUserFname(data.toString());
    }
  }, [])
  return (
    <div className='text-left mt-10 w-full'>
      <div className="w-full">
        <div className='headerDiv w-full'>
          <h2 style={{ fontWeight: 'bold', marginBottom: '0' }}>Dashboard</h2>
          <div>Hello <span className="font-bold">{userFname}</span>! Welcome to EBook Web</div>
        </div>
      </div>
      <div className='w-full'>
        <Books />
      </div>


    </div>
  )
}

export default UploadBook
