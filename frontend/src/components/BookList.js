import { useRef, useState } from "react"
import UploadBookModal from "./modals/UploadBookModal"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react"
import axios from "axios"
import moment from "moment";
import AlertConfirmation from "./modals/AlertConfirmation";
export default function BookList({ updateData }) {
  const [dataToUpdate, setDataToUpdate] = useState([])
  const [contents, setContents] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [allUsers, setAllUsers] = useState([])
  const [newList, setNewList] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const uid = useRef(0)
  const momentt = moment;
  useEffect(() => {
    getBooks()
    getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    const data = window.localStorage.getItem('userID');
    if (data !== null) {
      uid.current = data;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  function getUsers() {
    var fd = {
      id: uid.current,
    };
    axios
      .post("http://localhost:3001/users/getAllUsers", fd)
      .then(
        (response) => {
          setAllUsers(response.data)
        },
        (error) => {
          console.log(error);
        }
      );
  }
  function getBooks() {
    try {
      const fd = { userID: uid.current };
      axios
        .post("http://localhost:3001/books/getMyBooks/", fd)
        .then((response) => {
          setContents(response.data);
        });
    }
    catch (err) {
      console.log(err)
    }
  }
  if (updateData === true) {
    getBooks()
  }

  function handleShowModal(data) {
    // console.log('DataToUpdate', JSON.parse(data.allowed_users))
    setNewList(JSON.parse(data.allowed_users))
    setDataToUpdate(data)
    setShowModal(true)
  }

  function handleCloseModal() {
    setShowModal(false)
  }

  function uploadDone() {
    handleCloseModal()
    getBooks()
  }

  function showAlertFunc(data) {
    console.log('DataToDelete', data)
    setDataToUpdate(data)
    setShowAlert(true)
  }

  function hideAlertFunc() {
    getBooks()
    setShowAlert(false)
  }

  function handleUpdate(data) {
    // console.log('update', data)
    try {
      axios.post("http://localhost:3001/books/updateMyBook", data, {})
        .then((res) => {
          if (res.data.status === 201) {
            getBooks()
            uploadDone()
            toast.success(res.data.msg, {
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
        })
    }
    catch (err) {
      console.log(err)
    }
  }
  function handleDelete(data) {
    try {
      var fd = { id: data.id, cover_image: data.cover_image };
      axios.post("http://localhost:3001/books/delete", fd, {})
        .then((response) => {
          if (response.data.status === 201) {
            setTimeout(() => {
              hideAlertFunc()
              getBooks()
            }, 1000)
            toast.success(response.data.msg, {
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
        })
    }
    catch (err) {
      console.log(err)
    }
  }
  function handleUpdate2(data) {
    try {
      axios.post("http://localhost:3001/books/updateBookWithCoverImg", data, {})
        .then((res) => {
          if (res.data.status === 201) {
            uploadDone()
            toast.success(res.data.msg, {
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
        })
    }
    catch (err) {

    }

  }
  return (
    <div className='border rounded-lg w-full my-3 flex flex-col gap-3'>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-10" >
        <thead className="text-xs text-gray-700 uppercase rouned-t-full bg-gray-100 dark:bg-gray-700 dark:text-gray-400" >
          <tr className="border border-gray-200">
            <th scope="col" className="px-6 py-3 w-1/6">Book Name</th>
            <th scope="col" className="px-6 py-3 w-2/4">Description</th>
            <th scope="col" className="px-6 py-3">Date Uploaded</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {contents.map((data, i) => (
            <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100" >
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                {data.book_name}
              </th>
              <td className="px-6 py-4">{data.book_desc}</td>
              <td className="px-6 py-4">
                {momentt(data.date_uploaded).fromNow()}
              </td>
              <td className="px-6 py-4">
                <button onClick={() => handleShowModal(data)} className="bg-green-500 p-2.5 mx-1 rounded text-white" > Update </button>
                <button onClick={() => showAlertFunc(data)} className="bg-red-500 p-2.5 rounded text-white" > Delete </button>
              </td>
            </tr>

          ))}
          {contents.length <= 0 && (
            <tr className="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700" >
              <td colSpan="4" className="px-6 py-4 italic text-xs text-gray-500 whitespace-nowrap dark:text-white" >
                No data available.
              </td>
            </tr>
          )}

        </tbody>
      </table>
      <ToastContainer />
      {showAlert && (
        <AlertConfirmation onCloseModal={hideAlertFunc} content={dataToUpdate} confirmDelete={handleDelete} />
      )}
      {showModal && (
        <UploadBookModal onCloseModal={handleCloseModal} action={'update'} onUpdate={handleUpdate} onUpdateWithNewFile={handleUpdate2} checkedU={newList} content={dataToUpdate} userList={allUsers} />
      )}
    </div >

  )
}
