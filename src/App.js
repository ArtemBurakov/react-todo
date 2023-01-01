import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'

import AppLayout from './components/AppLayout'
import Login from './features/user/Login'
import Signup from './features/user/Signup'
import Home from './components/Home/Home'
import NotFound from './components/NotFound/NotFound'
import RequireAuth from './components/RequireAuth'

import Tasks from './features/tasks/Tasks'
import Notes from './features/notes/Notes'
import Workspace from './features/workspaces/Workspace'
import Workspaces from './features/workspaces/Workspaces'
import Search from './features/search/Search'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route element={<RequireAuth />}>
          <Route path="tasks" element={<Tasks />} />
          <Route path="notes" element={<Notes />} />
          <Route path="workspaces">
            <Route index element={<Workspaces />} />
            <Route path=":workspaceId" element={<Workspace />} />
          </Route>
          <Route path="search" element={<Search />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
