import { Card, CardContent, Typography } from '@mui/material'
import propTypes from 'prop-types'

const TaskCard = ({
  handleClick,
  title,
  priority,
  dueDate,
  assignee,
  status,
}) => {
  return (
    <div onClick={handleClick}>
      <Card sx={{ maxWidth: 275, margin: 2 }}>
        <CardContent>
          <Typography gutterBottom sx={{ fontSize: 20, fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography>Приоритет {priority}</Typography>
          <Typography>Дата окончания: {dueDate}</Typography>
          <Typography>Назначена: {assignee}</Typography>
          <Typography>Статус: {status}</Typography>
        </CardContent>
      </Card>
    </div>
  )
}

TaskCard.propTypes = {
  handleClick: propTypes.func.isRequired,
  title: propTypes.string.isRequired,
  priority: propTypes.string.isRequired,
  dueDate: propTypes.string.isRequired,
  assignee: propTypes.string.isRequired,
  status: propTypes.string.isRequired,
}

export default TaskCard
