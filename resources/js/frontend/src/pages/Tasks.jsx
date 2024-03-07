import { Button, Container } from '@mui/material'
import { useEffect, useState } from 'react'
import TaskEdit from '../shared/TaskEdit'
import { useStateContext } from '../contexts/ContextProvider'
import TaskGroup from '../shared/TaskGroup'

export default function Tasks() {
  const { axiosClient } = useStateContext()
  const [open, setOpen] = useState(false)
  const [id, setId] = useState(null)
  const [tasks, setTasks] = useState([])
  const [group, setGroup] = useState('none')

  useEffect(() => {
    if (open === false) {
      let url = '/tasks'
      if (group !== 'none') {
        url += `/group/${group}`
      }
      axiosClient.get(url).then(({ data }) => {
        setTasks(data)
      })
    }
  }, [open, group])

  const handleOpen = (id) => {
    setOpen(true)
    setId(id)
  }

  const handleClose = () => {
    setOpen(false)
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
          onClick={() => setGroup('deadline')}
        >
          По дате завершения
        </Button>
        <Button
          variant={group === 'responsible' ? 'contained' : 'outlined'}
          onClick={() => setGroup('responsible')}
        >
          По ответственным
        </Button>
        <Button
          variant={group === 'none' ? 'contained' : 'outlined'}
          onClick={() => setGroup('none')}
        >
          Без группировок
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          maxWidth: '1280px',
          flexWrap: 'wrap',
        }}
      >
        <TaskGroup tasks={tasks} handleOpen={handleOpen} />
      </div>
      <TaskEdit id={id} open={open} handleClose={handleClose} />
    </Container>
  )
}
