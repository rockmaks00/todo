import TaskCard from './TaskCard'
import propTypes from 'prop-types'

const TaskGroup = ({ tasks, handleOpen }) => {
  if (!tasks) {
    return null
  }

  // для группированных
  if (!Array.isArray(tasks)) {
    return Object.keys(tasks).map((group) =>
      tasks[group].map((task) => (
        <TaskCard
          key={task.id}
          handleClick={() => handleOpen(task.id)}
          header={task.header}
          priority={task.priority}
          deadline={task.deadline}
          assignee={`${task.responsible.name} ${task.responsible.surname}`}
          status={task.status}
        />
      ))
    )
  } else {
    return tasks.map((task) => (
      <TaskCard
        key={task.id}
        handleClick={() => handleOpen(task.id)}
        header={task.header}
        priority={task.priority}
        deadline={task.deadline}
        assignee={`${task.responsible.name} ${task.responsible.surname}`}
        status={task.status}
      />
    ))
  }
}

TaskCard.propTypes = {
  handleOpen: propTypes.func,
  tasks: propTypes.object,
}

export default TaskGroup
