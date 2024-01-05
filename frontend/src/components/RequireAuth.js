import { useEffect } from "react"
// import { useAuth } from "./auth"
import { Navigate } from "react-router-dom"

export const RequireAuth = ({ children }) => {
              useEffect(() => {
                            const data = window.localStorage.getItem('firstname');
                            if (data == null) {
                                          return <Navigate to='/' />
                            }
              }, [])
              // const auth = useAuth()
              // const location = useLocation()
              // if (!auth.username && !auth.password) {
              //               // console.log('pathname', location.pathname);
              //               // state={{ path: location.pathname }} 
              //               return <Navigate to='/' />
              // }
              return children
}
