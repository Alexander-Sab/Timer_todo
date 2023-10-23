import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { normalizeWhitespace } from '../utils/utils'
import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'
import TaskList from '../TaskList'
import {
  COMPLETED_TASK,
  EDITING_TASK,
  ACTIVE_TASK,
} from '../constants/constants'
import './App.css'

export const App = (props) => {
  const createTodoItem = (description, minValue, secValue) => {
    const id = Date.now() + Math.floor(Math.random() * 10000)
    const trimDescription = normalizeWhitespace(description)
    let minValueNumber = +minValue
    let secValueNumber = +secValue
    if (secValueNumber > 60) {
      minValueNumber += Math.trunc(secValueNumber / 60)
      secValueNumber -= Math.trunc(secValueNumber / 60) * 60
    }
    return {
      id,
      description: trimDescription,
      dateCreate: new Date(),
      compleeted: false,
      editing: false,
      minValue: minValueNumber,
      secValue: secValueNumber,
    }
  }

  const [dataStream, setDataStream] = useState([
    createTodoItem(COMPLETED_TASK, 15, 0),
    createTodoItem(EDITING_TASK, 15, 0),
    createTodoItem(ACTIVE_TASK, 15, 0),
  ])

  const [filterData, setFilterData] = useState('all')

  const addItem = (description, minValue, secValue) => {
    const newItem = createTodoItem(description, minValue, secValue)
    setDataStream([...dataStream, newItem])
  }

  const changeDescription = (id, description) => {
    const newDataStream = dataStream.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          description,
          compleeted: false,
          editing: false,
        }
      }
      return el
    })
    setDataStream(newDataStream)
  }

  const editingItem = (id) => {
    const newDataStream = dataStream.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          editing: true,
        }
      }
      return el
    })
    setDataStream(newDataStream)
  }

  const completedItem = (id) => {
    const newDataStream = dataStream.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          compleeted: !el.compleeted,
        }
      }
      return el
    })
    setDataStream(newDataStream)
  }

  const deletedItem = (id) => {
    const newDataStream = dataStream.filter((el) => el.id !== id)
    setDataStream(newDataStream)
  }

  const clearCompleted = () => {
    const newDataStream = dataStream.filter((el) => !el.compleeted)
    setDataStream(newDataStream)
  }

  const notCompletedCount = dataStream.filter((el) => !el.compleeted).length

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addNewItem={addItem} />
      </header>
      <section className="main">
        <TaskList
          taskData={dataStream}
          onCheckBoxClick={completedItem}
          onDeletedClick={deletedItem}
          onEditClick={editingItem}
          onChangeDescription={changeDescription}
          filterData={filterData}
        />
        <Footer
          notCompleetedCount={notCompletedCount}
          clearCompleted={clearCompleted}
          setFilterData={(event) =>
            setFilterData(event.target.innerText.toLowerCase())
          }
        />
      </section>
    </section>
  )
}

App.propTypes = {
  dataStream: PropTypes.instanceOf(Array),
  filterData: PropTypes.string,
}

App.defaultProps = {
  dataStream: [
    {
      id: 101,
      description: 'Синхронизировать список задач с сервером',
      dateCreate: new Date(),
      compleeted: false,
      editing: false,
      minValue: 15,
      secValue: 30,
    },
  ],
  filterData: 'all',
}

export default App
