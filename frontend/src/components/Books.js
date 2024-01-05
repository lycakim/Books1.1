import axios from "axios";
import BookList from "./BookList";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef, useState, useEffect } from "react";
import UploadBookModal from "./modals/UploadBookModal";

export default function Books() {
    let uid = useRef(0)
    const [showModal, setShowModal] = useState(false)
    const [updateData, setUpdateData] = useState(false)
    useEffect(() => {
        const data = window.localStorage.getItem('userID');
        if (data !== null) {
            uid.current = data;
        }
    }, [])

    function uploadDone() {
        setUpdateData(true)
        setTimeout(() => {
            setUpdateData(false)
        }, 1000)
        handleCloseModal()
    }

    function handleShowModal() {
        setShowModal(true)
    }

    function handleCloseModal() {
        setShowModal(false)
    }

    function handleBookUpload(data) {
        try {
            axios
                .post("http://localhost:3001/books/uploadBook", data)
                .then((response) => {
                    uploadDone()
                    if (response.data.status === 201) {
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
                    // setContents(response.data);
                });
        }
        catch (err) {
            console.log(err)
        }

    }

    // function handleUpdate(id) {
    //     setContents(contents.map(c => {
    //         if (c.id === id) {

    //         }
    //     }))
    // }
    return (
        <>
            <div className="w-full flex justify-end">
                <button onClick={handleShowModal} className="bg-green-500 p-2.5 rounded text-white">Add New</button>
                {showModal && (
                    <UploadBookModal onCloseModal={handleCloseModal} onUpload={handleBookUpload} action={'add'} userList={[]} checkedU={[]} content={[]} />
                )}
                <ToastContainer />
            </div>
            <div>
                <BookList updateData={updateData} />
            </div>

        </>
    )
}
