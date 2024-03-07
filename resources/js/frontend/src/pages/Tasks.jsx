import { Button, Container } from '@mui/material'
import TaskCard from '../shared/TaskCard'
import { useEffect, useState } from 'react'
import TaskEdit from '../shared/TaskEdit'
import { useStateContext } from '../contexts/ContextProvider'

export default function Tasks() {
  const { axiosClient } = useStateContext()
  const [open, setOpen] = useState(false)
  const [id, setId] = useState(null)
  const [tasks, setTasks] = useState([])
  const [group, setGroup] = useState('none')

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

  const handleGroup = (group) => {
    setGroup(group)
  }

  return (
    <Container>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: 5,
          gap: 10,
        }}
      >
        <Button
          color="success"
          variant="contained"
          onClick={() => handleOpen(null)}
        >
          Новая задача
        </Button>
        <Button
          variant={group === 'deadline' ? 'contained' : 'outlined'}
          onClick={() => handleGroup('deadline')}
        >
          По дате завершения
        </Button>
        <Button
          variant={group === 'responsible' ? 'contained' : 'outlined'}
          onClick={() => handleGroup('responsible')}
        >
          По ответственным
        </Button>
        <Button
          variant={group === 'none' ? 'contained' : 'outlined'}
          onClick={() => handleGroup('none')}
        >
          Без группировок
        </Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {tasks.map((task) => {
          return (
            <TaskCard
              key={task.id}
              handleClick={() => handleOpen(task.id)}
              header={task.header}
              priority={task.priority}
              deadline={task.deadline}
              assignee={`${task.responsible.name} ${task.responsible.surname}`}
              status={task.status}
            />
          )
        })}
      </div>
      <TaskEdit id={id} open={open} handleClose={handleClose} />
    </Container>
  )
}
