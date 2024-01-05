import { useState } from 'react'
import './ComStyle.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { useAuth } from './auth'
import axios from 'axios'
export const LoginForm = () => {
  const nvgt = useNavigate()
  // const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const auth = useAuth()
  // const redirectPath = location.state?.path || '/user/dashboard'
  // console.log(location.state?.path);
  const handleLogin = (e) => {
    e.preventDefault();
    const fd = { username, password }
    try {
      axios.post('http://localhost:3001/auth/login', fd)
        .then((res) => {
          // console.log(res.data.status);
          if (res.data.status === 400) {
            // alert(res.data.message);
            toast.warn(res.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            })
            return
          }
          else {
            localStorage.setItem('firstname', res.data.user.firstname);
            localStorage.setItem('userID', res.data.user.id);
            localStorage.setItem("token", res.data.token);
            auth.login(username, password);
            nvgt('/user/dashboard', { replace: true })
          }

        }

        )
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <form className='p-5 py-7 formStyle' onSubmit={handleLogin}>
        <div className='formFieldDiv'>
          <h3 className='font-bold text-2xl'>Books 1.1 | Login</h3>
          <div className='formGroupDiv'>
            <label className='label'>Username</label>
            <input type='text' autoComplete='off' name='username' className='text-black rounded-lg text-sm py-2 pl-3' placeholder='Enter username...' value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className='formGroupDiv'>
            <label className='label'>Password</label>
            <input type='password' autoComplete='off' name='password' className='text-black rounded-lg text-sm py-2 pl-3' placeholder='Enter password...' value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className='formGroupDiv'>
            <button type='submit' className='btnSubmit'>LOGIN</button>
          </div>
        </div>
        <ToastContainer />
      </form>
    </>
  )
}
