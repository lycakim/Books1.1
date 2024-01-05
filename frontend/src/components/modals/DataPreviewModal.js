import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
export const DataPreviewModal = ({ onCloseModal, content, likesCount, userNow }) => {
  const handleLike = () => {
    var fd = { userID: userNow, bookID: content.id };
    try {
      axios.post("http://localhost:3001/likes/addLike", fd, {})
        .then((response) => {
          if (response.data.status === 201) {
            toast.warn(response.data.msg, {
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
          else if (response.data.status === 400) {
            toast.warn(response.data.msg, {
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
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div
      className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" ></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-2 md:p-5 border-b rounded-t dark:border-gray-600" >
                <h3 className="text-xl ml-2 font-semibold text-gray-900 dark:text-white" > Preview </h3>
                <button onClick={onCloseModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-6 overflow-y-auto text-justify">
                <div className="p-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {content.book_name}
                  </h3>
                  {content.book_desc}
                </div>
              </div>
              <div className="flex items-center justify-between p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600" >
                <div className="ml-2">
                  <a href="#!" className="font-semibold">{likesCount}</a> Likes
                </div>
                <div>
                  <button onClick={handleLike} className="text-white bg-blue-700 hover:bg-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-700 font-medium rounded-lg text-sm px-6 py-2.5 text-center">
                    Like
                  </button>
                  <button onClick={onCloseModal} className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                    Close
                  </button>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
