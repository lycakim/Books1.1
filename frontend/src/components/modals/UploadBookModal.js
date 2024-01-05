import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
export default function UploadBookModal({ checkedU, onCloseModal, onUpload, onUpdate, onUpdateWithNewFile, content, action, userList, }) {
    const [bookName, setBookName] = useState('')
    const [bookDesc, setBookDesc] = useState('')
    const [imgUrls, setImgUrls] = useState([])
    const [fileData, setFileData] = useState([])
    const [showImg, setShowImg] = useState(false)
    const [userID, setUserID] = useState()
    const [prevImgUrls, setPrevImgUrls] = useState([])
    const [checkedUser, setCheckedUser] = useState([])
    // const [newUserList, setNewUserList] = useState([])
    const [bookID, setBookID] = useState([])

    useEffect(() => {

        const data = window.localStorage.getItem('userID');
        if (data !== null) {
            setUserID(parseInt(data));
        }

        if (action === 'update') {
            setBookName(content.book_name)
            setBookDesc(content.book_desc)
            setBookID(content.id)
            setShowImg(true)
            if (checkedU != null) {
                setCheckedUser(checkedU)
            }
        }
        else {
            setFileData([])
            setImgUrls([])
            setShowImg(false)
            setCheckedUser([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (userList !== null) {
            for (var i = 0; i < userList.length; i++) {
                Object.assign(userList[i], { isChecked: false });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (checkedU !== null) {
            for (var index = 0; index < checkedU.length; index++) {
                for (var x = 0; x < userList.length; x++) {
                    if (userList[x].id === checkedU[index]) {
                        userList[x].isChecked = true
                        break;
                    }
                }
            }
        }
        // setNewUserList(userList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    function handleCheckClick(e) {
        if (e.target.checked) {
            setCheckedUser([...checkedUser, e.target.value])
            for (var ii = 0; ii < userList.length; ii++) {
                if (userList[ii].id === e.target.value) {
                    userList[ii].isChecked = true
                }
            }
        }
        if (!e.target.checked) {
            checkedUser.forEach((data) => {
                if (data === e.target.value) {
                    // console.log('e:', e.target.value, 'c:', e.target.checked)
                    setCheckedUser(checkedUser.filter((dataa) => {
                        return dataa !== e.target.value
                    }))

                    for (var i = 0; i < userList.length; i++) {
                        if (userList[i].id === e.target.value) {
                            userList[i].isChecked = false
                        }
                    }
                }
            })
        }
    }

    useEffect(() => {
        try {
            if (content.cover_image) {
                axios.get("http://localhost:3001/books/stream-file/" + content.cover_image, { responseType: "blob", }).then((response) => {
                    const blob = new Blob([response.data], {
                        type: "jpg",
                    });
                    const objectURL = URL.createObjectURL(blob);
                    setImgUrls({ name: content.cover_image, url: objectURL });
                    setPrevImgUrls({ name: content.cover_image, url: objectURL })
                },)
            }

        }
        catch (err) {
            console.log(err)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function onDropt(ev) {
        ev.preventDefault()
        const dropfls = ev.dataTransfer.files;

        for (let i = 0; i < dropfls.length; i++) {
            var urls = URL.createObjectURL(dropfls[i]);
            var img = {
                url: urls,
                name: dropfls[i].name,
            };
            setImgUrls(img)
            setFileData(dropfls[i])
            setShowImg(true)
        }
    }

    function onFileChange(ev) {
        const ed = ev.target.files;
        for (let i = 0; i < ed.length; i++) {
            var urls = URL.createObjectURL(ed[i]);
            var img = {
                url: urls,
                name: ed[i].name,
            };
            setImgUrls(img);
            setFileData(ed[i])
            setShowImg(true)
        }
    }
    function onDragEnter(ev) {
        ev.preventDefault()
    }

    function onDragOver(ev) {
        ev.preventDefault()
    }
    function handleUpdate() {
        var err_bookName, err_bookDesc, err_bookImg;
        if (bookName === '') {
            err_bookName = true;
            toast.warn("Book Name is required", {
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
        else if (bookDesc === '') {
            err_bookDesc = true;
            toast.warn("Book Description is required", {
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
        else if (imgUrls.length <= 0) {
            err_bookImg = true;
            toast.warn("Book Cover is required", {
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

        if (!err_bookImg && !err_bookName && !err_bookDesc) {
            if (imgUrls.url === prevImgUrls.url) {
                const fd = {
                    book_name: bookName,
                    book_desc: bookDesc,
                    userID: userID,
                    allowed_users: checkedUser.length <= 0 ? null : JSON.stringify(checkedUser),
                    book_id: bookID
                }
                onUpdate(fd)
            }
            else {
                const fd = new FormData();
                fd.append("files", fileData)
                fd.append("book_name", bookName);
                fd.append("book_desc", bookDesc);
                fd.append("userID", userID);
                fd.append("book_id", bookID);
                fd.append("allowed_users", checkedUser.length <= 0 ? null : JSON.stringify(checkedUser))
                fd.append("itemToDeleteCoverName", prevImgUrls.name);
                fd.append("itemToDeleteCoverUrl", prevImgUrls.url);
                onUpdateWithNewFile(fd)
            }
        }


    }
    function handleSubmit() {
        var err_bookName, err_bookDesc;
        if (bookName === '') {
            err_bookName = true;
            toast.warn("Book Name is required", {
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
        else if (bookDesc === '') {
            err_bookDesc = true;
            toast.warn("Book Description is required", {
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
        const fd = new FormData();
        fd.append("files", fileData)
        fd.append("book_name", bookName);
        fd.append("book_desc", bookDesc);
        fd.append("userID", userID);
        if (!err_bookName && !err_bookDesc) {
            onUpload(fd)
        }
    }
    function imgToDelete() {
        setImgUrls([])
        setFileData([])
        setShowImg(false)
    }



    return (
        <div className="relative z-10">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"> </div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" >
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600" >
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{action === 'update' ? 'Update' : 'Upload'}</h3>
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
                                <form encType="multipart/form-data">

                                    <div className="grid text-left gap-2 mb-3">
                                        <label className="pl-2" >Book Name <span className="text-red-500">*</span></label>
                                        <input name="bookName" type="text" autoComplete="off" value={bookName} onChange={(e) => { setBookName(e.target.value) }} className="border p-2.5 border-gray-500 rounded-lg w-full" placeholder="Book Name" />
                                    </div>
                                    <div className="grid text-left gap-2 mb-3">
                                        <label className="pl-2" >Book Description <span className="text-red-500">*</span></label>
                                        <textarea rows="5" placeholder="Book Description" value={bookDesc} onChange={(e) => setBookDesc(e.target.value)} className="border p-2.5 border-gray-500 rounded-lg w-full"></textarea>
                                    </div>
                                    <div className="grid text-left gap-2 mb-3">
                                        <label className="pl-2" >Cover Image <span className="text-red-500">*</span></label >
                                        {!showImg && (
                                            <label onDrop={onDropt} onChange={onFileChange} onDragEnter={onDragEnter} onDragOver={onDragOver} className="flex flex-col justify-center items-center w-full h-40 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                                    <svg
                                                        aria-hidden="true"
                                                        className="mb-3 w-10 h-10 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                        ></path>
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span className="font-semibold">Click to upload</span> or
                                                        drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                                                    </p>
                                                </div>
                                                <input id="dropzone-file" type="file" className="hidden" />
                                            </label>
                                        )}
                                    </div>
                                    {showImg && (
                                        <div className="flex flex-wrap justify-center border border-gray-300 rounded-md w-full m-auto">
                                            <input type="button" value="" />
                                            <span className="inline-flex relative items-center p-3 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
                                                <img className="w-40 h-40 border" alt={imgUrls.name} src={imgUrls.url} />
                                                <div onClick={imgToDelete} className="cursor-pointer inline-flex absolute top-1 right-1 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </div>
                                            </span>

                                        </div>
                                    )}
                                    {action === 'update' && (
                                        <div className="grid text-left gap-2 my-2 mt-5">
                                            <label className="pl-2">Add Allowed Users</label>
                                            <div className="mx-2">
                                                <ul id="customScroll" className="checkbox-select__filters-wrapp" >
                                                    {userList.map((data, i) => (
                                                        <li key={i}>
                                                            <div className="checkbox-select__check-wrapp">
                                                                <input
                                                                    id={data.lastname + '_' + data.id}
                                                                    checked={data.isChecked}
                                                                    value={data.id}
                                                                    onChange={handleCheckClick}
                                                                    className="conditions-check"
                                                                    type="checkbox"
                                                                />
                                                                &nbsp;{data.isChecked}
                                                                <label htmlFor={data.lastname + '_' + data.id}>{data.firstname + ' ' + data.lastname}&nbsp;
                                                                    <span className="text-xs text-gray-400" >User </span>
                                                                </label>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </div>
                            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600" >
                                {action === 'update' && (
                                    <button onClick={handleUpdate} className="bg-green-500 text-white hover:bg-sidebarGreen focus:ring-2 focus:outline-none focus:ring-sidebarGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update</button>
                                )}
                                {action === 'add' && (
                                    <button onClick={handleSubmit} className="bg-green-500 text-white hover:bg-sidebarGreen focus:ring-2 focus:outline-none focus:ring-sidebarGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center">Upload</button>
                                )}
                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
