import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from '@mui/material'
import propTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider'

const TaskEdit = ({ id, open, handleClose }) => {
  const { user, axiosClient } = useStateContext()
  const [task, setTask] = useState({})
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadedId, setLoadedId] = useState(null)

  useEffect(() => {
    if (open && (!id || id !== loadedId)) {
      setLoading(true)

      // загружаем возможных подчиненных
      axiosClient.get('/users/subordinates').then(({ data }) => {
        setUsers(data)
      })

      // если определен id то загружаем, иначе создаём новую
      if (id) {
        axiosClient.get(`/tasks/${id}`).then(({ data }) => {
          setTask(data)
          setLoading(false)
        })
      } else {
        // не понимаю почему тупит
        setTimeout(() => {
          setTask({})
          setLoading(false)
        }, 100)
      }
      setLoadedId(id)
    }
  }, [id, open, loadedId])

  const handleSave = () => {
    if (task.id) {
      axiosClient
        .put('/tasks', task)
        .then(() => {
          handleClose()
        })
        .error((e) => {
          throw new Error(e)
        })
    } else {
      axiosClient
        .post('/tasks', task)
        .then(() => {
          handleClose()
        })
        .error((e) => {
          throw new Error(e)
        })
    }
  }

  const handleChange = (value) => {
    setTask((oldTask) => {
      return { ...oldTask, ...value }
    })
  }

  if (loading) {
    return null
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{id ? 'Редактирование' : 'Создание'} задачи</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Заголовок"
          fullWidth
          value={task.header}
          onChange={(e) => handleChange({ header: e.target.value })}
          disabled={task.creator != user.id}
        />
        <TextField
          margin="dense"
          label="Описание"
          fullWidth
          multiline
          rows={2}
          maxRows={4}
          value={task.description}
          onChange={(e) => handleChange({ description: e.target.value })}
          disabled={task.creator != user.id}
        />
        <TextField
          fullWidth
          select
          margin="dense"
          value={task.priority}
          label="Приоритет"
          onChange={(e) => handleChange({ priority: e.target.value })}
          disabled={task.creator != user.id}
        >
          <MenuItem value="1">Низкий</MenuItem>
          <MenuItem value="2">Средний</MenuItem>
          <MenuItem value="3">Высокий</MenuItem>
        </TextField>
        <TextField
          margin="dense"
          label="Дата окончания"
          type="date"
          fullWidth
          value={task.deadline}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => handleChange({ deadline: e.target.value })}
          disabled={task.creator != user.id}
        />
        <TextField
          label="Ответственный"
          select
          value={task?.responsible}
          fullWidth
          margin="dense"
          onChange={(e) => handleChange({ responsible: e.target.value })}
          disabled={task.creator != user.id}
        >
          {users.map((user) => {
            return (
              <MenuItem key={user.id} value={user.id}>
                {`${user.name} ${user.surname}`}
              </MenuItem>
            )
          })}
        </TextField>
        <TextField
          required
          label="Статус"
          select
          value={task?.status}
          fullWidth
          margin="dense"
          onChange={(e) => handleChange({ status: e.target.value })}
        >
          <MenuItem value="1">К выполнению</MenuItem>
          <MenuItem value="2">Выполняется</MenuItem>
          <MenuItem value="3">Выполнена</MenuItem>
          <MenuItem value="4">Отменена</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleSave} color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  )
}

TaskEdit.propTypes = {
  id: propTypes.number,
  open: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
}

export default TaskEdit
