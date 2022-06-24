import { Navigate } from 'react-router-dom'

import { IUser } from '../features/auth/authSlice'

interface Props {
  isUserFound: IUser | null
  children: JSX.Element
}

const Protected = ({isUserFound, children}: Props) => {
  if(!isUserFound) {
    return <Navigate to="/register" replace />
  }
  return children
}

export default Protected