export const isBrowser = () => typeof window !== "undefined"
export const getUser = () => 
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}
  
const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))
export const handleLogin = ({ username, password }) => {
  if (username === `john` && password === `pass`)
}