

export default function AlertConfirmation({ onCloseModal, content, confirmDelete }) {
  function handleDelete() {
    const fd = {
      delete: true,
      id: content.id,
      cover_image: content.cover_image
    }
    confirmDelete(fd)
  }
  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"> </div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600" >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Delete</h3>
                <button onClick={() => { onCloseModal() }} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"><svg
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
                </svg></button>
              </div>
              <div className="p-4 md:p-5 space-y-4 overflow-y-auto max-h-96">
                You are about to delete <span className="font-bold">{content.book_name}</span>. Do you want to proceed?
              </div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600" >

                <button onClick={handleDelete} className="bg-red-500 text-white hover:bg-sidebarGreen focus:ring-2 focus:outline-none focus:ring-sidebarGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}
