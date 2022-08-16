import 'bootstrap/dist/css/bootstrap.min.css'
import RequireAuth from './components/RequireAuth'
import { Routes, Route } from 'react-router-dom'

import AppLayout from './layouts/AppLayout'
import Login from './routes/login/Login'
import Signup from './routes/signup/Signup'
import Home from './routes/home/Home'
import NotFound from './routes/notFound/NotFound'

import Tasks from './routes/tasks/Tasks'
import Task from './routes/tasks/Task'
import AddTask from './routes/tasks/AddTask'
import Notes from './routes/notes/Notes'
import Note from './routes/notes/Note'
import AddNote from './routes/notes/AddNote'
import Workspaces from './routes/workspaces/Workspaces'
import Workspace from './routes/workspaces/Workspace'
import AddWorkspace from './routes/workspaces/AddWorkspace'

function App() {
  return (
    <Routes>
      <Route path="" element={<AppLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route element={<RequireAuth />}>
          <Route path="" element={<Home />} />
          <Route path="tasks" element={<RequireAuth />}>
            <Route index element={<Tasks />} />
            <Route path=":taskId" element={<Task />} />
            <Route path="addTask" element={<AddTask />} />
          </Route>
          <Route path="notes" element={<RequireAuth />}>
            <Route index element={<Notes />} />
            <Route path=":noteId" element={<Note />} />
            <Route path="addNote" element={<AddNote />} />
          </Route>
          <Route path="workspaces" element={<RequireAuth />}>
            <Route index element={<Workspaces />} />
            <Route path=":workspaceId" element={<Workspace />} />
            <Route path="addWorkspace" element={<AddWorkspace />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
