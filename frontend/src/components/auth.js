import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null)
export const AuthProvider = ({ children }) => {
              const [username, setUsername] = useState(null)
              const [password, setPassword] = useState(null)

              const login = (username, password) => {
                            setUsername(username)
                            setPassword(password)
              }

              const logout = () => {
                            setUsername(null)
                            setPassword(null)
              }

              return (
                            <AuthContext.Provider value={{ username, password, login, logout }}>{children}</AuthContext.Provider>
              )
}
export const useAuth = () => {
              return useContext(AuthContext)
}