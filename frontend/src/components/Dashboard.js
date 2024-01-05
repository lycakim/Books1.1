
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './ComStyle.css'
import { useState, useRef } from 'react'
import { DataPreviewModal } from './modals/DataPreviewModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Dashboard = () => {
  let uid = useRef(0)
  const [data, setData] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [likesData, setLikesData] = useState([])
  const [content, setContent] = useState([])
  const [likesCount, setLikesCount] = useState(0)
  const [allowed, setAllowed] = useState([])
  const nvgt = useNavigate()
  const redirect = () => {
    nvgt('/user/upload-book')
  }
  useEffect(() => {
    getAllBooks()
    getLikes()
    getAllowedUsers()
  }, [])
  useEffect(() => {
    const data = window.localStorage.getItem('userID');
    if (data !== null) {
      uid.current = data;
    }
  }, [])

  const getAllBooks = () => {
    try {
      axios.get("http://localhost:3001/books/getAllBooks")
        .then((response) => {
          // console.log(response.data)
          setData(response.data);
        })
    } catch (error) {
      console.log(error)
    }
  }

  const getAllowedUsers = () => {
    try {
      axios.get("http://localhost:3001/books/getAllowedUsers")
        .then((response) => {
          // console.log(response.data)
          setAllowed(response.data);
        })
    } catch (error) {
      console.log(error)
    }
  }

  const getLikes = () => {
    try {
      axios.get("http://localhost:3001/likes/getLikesCount")
        .then((res) => {
          setLikesData(res.data)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const getImg = (filename) => {
    // console.log(filename)
    return "http://localhost:3001/books/stream-file/" + filename;
  }

  const showContent = (data) => {
    let par = data.allowed_users ? JSON.parse(data.allowed_users) : null;
    if (parseInt(uid.current) === data.userID) {
      setLikesCount(showLikes(data.id)[0] ? this.showLikes(data.id)[0] : 0)
      setShowModal(true)
      setContent(data)
    }
    else {
      if (data.allowed_users !== null) {
        if (par.length > 0) {
          for (var i = 0; i < par.length; i++) {
            if (uid.current === par[i]) {
              setShowModal(true)
              setContent(data)
              setLikesCount(showLikes(data.id)[0] ? this.showLikes(data.id)[0] : 0)
            }
          }
        }
        else {
          toast.warn("You are not yet allowed to view this book.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
        }
      }
      else {
        toast.warn("You are not yet allowed to view this book.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      }
    }
  }

  const showLikes = (bookID) => {
    return likesData.filter(function (data) {
      return data.bookID === bookID;
    })
      .map(function (obj) {
        return obj.cnt
      })
  }

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <div className='mb-10'>
      <div className='border rounded-lg w-full my-3 flex flex-col gap-3'>
        {data.length <= 0 && (
          <div className="border rounded-lg bg-white px-5 py-14 w-full flex justify-center" >
            <h1 className="text-lg text-gray-500">
              No recent book uploads. Click<span onClick={redirect} className="text-blue-600 cursor-pointer"> here </span> to upload your book.
            </h1>
          </div>
        )}
        {allowed.length <= 0 && (
          <div className="border rounded-lg bg-white px-5 py-14 w-full flex justify-center" >
            <h1 className="text-lg text-gray-500">
              No recent shared books.
            </h1>
          </div>
        )}
      </div >
      <div className='bg-white border rounded-lg'>
        <h1 className='font-bold text-2xl pt-5 ml-5'>Shared Books</h1>
        <div className='p-5 w-full grid grid-cols-2 gap-2'>
          {allowed.map((data, index) => (
            <div href="#!" key={data.book.b_id} className='flex flex-col my-2 w-full items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
              <img src={getImg(data.book.b_cover_image)} alt={data.book.b_cover_image} className="object-cover bg-center w-full rounded-t-lg h-full md:h-48 md:w-48 md:rounded-none md:rounded-s-lg" />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" >{data.book.b_book_name}</h5>
                {/* <p className="mb-3 font-normal desc text-gray-700 dark:text-gray-400 " id='desc'>{data.book.b_book_desc}</p> */}
                <div className="flex justify-between">
                  {/* <a onClick={() => showContent(data)} href="#!" className="inline-flex items-center px-3 py-2 w-32 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Read More <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a> */}
                  <div className="mb-3">
                    <span className="text-gray-500 text-xs">Shared to: </span>
                    <ul>
                      {data.userData.map((t) => (
                        <li key={t.firstname}>
                          {t.firstname + ' ' + t.lastname}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='bg-white border rounded-lg mt-5'>
        <h1 className='font-bold text-2xl pt-5 ml-5'>Uploaded Books</h1>
        <div className='p-5 w-full grid grid-cols-2 gap-2'>
          {data.map((data, i) => (
            <div href="#!" key={data.id} className='flex flex-col my-2 w-full items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
              <img src={getImg(data.cover_image)} alt={data.cover_image} className="object-cover bg-center w-full rounded-t-lg h-full md:h-48 md:w-48 md:rounded-none md:rounded-s-lg" />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" >{data.book_name}</h5>
                <p className="mb-3 font-normal desc text-gray-700 dark:text-gray-400 " id='desc'>{data.book_desc}</p>
                <div className="flex justify-between">
                  <a onClick={() => showContent(data)} href="#!" className="inline-flex items-center px-3 py-2 w-32 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read More <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}

          {showModal && (
            <DataPreviewModal userNow={uid.current} onCloseModal={handleClose} content={content} likesCount={likesCount} />
          )}
          <ToastContainer />
        </div>
      </div>
    </div>
  )
}

export default Dashboard