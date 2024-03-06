import { Container } from '@mui/material'
import TaskCard from '../shared/TaskCard'
import { useEffect, useState } from 'react'
import TaskEdit from '../shared/TaskEdit'
import { useStateContext } from '../contexts/ContextProvider'

export default function Tasks() {
  const { axiosClient } = useStateContext()
  const [open, setOpen] = useState(false)
  const [id, setId] = useState('')
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axiosClient.get('/tasks').then(({ data }) => {
      setTasks(data)
    })
  }, [])

  const handleOpen = (id) => {
    setOpen(true)
    setId(id)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSave = () => {
    
    handleClose()
  }

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      {tasks.map((task) => {
        return (
          <TaskCard
            key={task.id}
            handleClick={() => handleOpen(task.id)}
            title={task.title}
            priority={task.priority}
            dueDate={task.deadline}
            assignee={task.responsible.name}
            status={task.status}
          />
        )
      })}
      <TaskEdit
        id={id}
        open={open}
        handleClose={handleClose}
        handleSave={handleSave}
      />
    </Container>
  )
}
