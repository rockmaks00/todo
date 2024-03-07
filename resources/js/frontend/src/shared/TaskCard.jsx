import { Card, CardContent, Typography } from '@mui/material'
import propTypes from 'prop-types'

const TaskCard = ({
  handleClick,
  header,
  priority,
  deadline,
  assignee,
  status,
}) => {
  const getColor = (deadline, status) => {
    const currentDate = new Date()
    const taskDeadline = new Date(deadline)

    if (status.name === 'Выполнена') {
      return 'green'
    } else if (taskDeadline < currentDate) {
      return 'red'
    } else {
      return 'grey'
    }
  }

  return (
    <div onClick={handleClick}>
      <Card sx={{ maxWidth: 275, margin: 2 }}>
        <CardContent>
          <Typography
            gutterBottom
            sx={{ fontSize: 20, fontWeight: 'bold' }}
            color={getColor(deadline, status)}
          >
            {header}
          </Typography>
          <Typography>Приоритет {priority.name}</Typography>
          <Typography>Дата окончания: {deadline}</Typography>
          <Typography>Назначена: {assignee}</Typography>
          <Typography>Статус: {status.name}</Typography>
        </CardContent>
      </Card>
    </div>
  )
}

TaskCard.propTypes = {
  handleClick: propTypes.func.isRequired,
  header: propTypes.string.isRequired,
  priority: propTypes.string.isRequired,
  deadline: propTypes.string.isRequired,
  assignee: propTypes.string.isRequired,
  status: propTypes.string.isRequired,
}

export default TaskCard
