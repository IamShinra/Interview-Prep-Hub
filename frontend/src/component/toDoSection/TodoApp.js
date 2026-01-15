import React, { useState } from 'react';
import FormInput from '../FormInput';
import FormButton from '../FormButton';
import { toast } from 'react-toastify';
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTask = () => {
    if (task.length === 0) return;
    setTodos([...todos, task]);
    setTask('');
    toast.success('Task added successfully!');
  };

  const handleDelete = (i) => {
    setTodos(todos.filter((todo, index) => index !== i));
    toast.error('Task deleted successfully!');
  };

  const handleEditTask = (i) => {
    setEditIndex(i);
    // Optionally, you can pre-fill the input field with the current task text.
    setTask(todos[i]);
  };

  const handleUpdateTask = () => {
    if (editIndex === null) return;

    const updatedTodos = [...todos];
    updatedTodos[editIndex] = task;
    setTodos(updatedTodos);

    // Clear the edit mode and reset the task input field
    setEditIndex(null);
    setTask('');
    toast.info('Task updated successfully!');
  };

  return (
    <div>
      <div className='w-full'>
        <div className='w-full  flex flex-col space-x-4'>
          <div className='w-full'>
            <FormInput type={"text"} placeholder={""} className={"h-14 border-2 rounded-lg p-2 mb-4 focus:outline-orange-400 border-theme-gray"} value={task} onChange={setTask} />
          </div>
          <div className='flex justify-between'>
            <div>
              <div className='flex space-x-5 items-center'>
                <div className='flex items-center space-x-1'>
                  <div className='w-3 h-3 bg-red-500 rounded-xl'></div>
                  <p className='text-xs font-bold'>PENDING</p>
                </div>
                <div className='flex items-center space-x-1'>
                  <div className='w-3 h-3 bg-green-500 rounded-xl'></div>
                  <p className='text-xs font-bold'>DONE</p>
                </div>
              </div>
            </div>
            <div className='h-10 w-36' onClick={handleAddTask}>
              <FormButton text={"ADD TASK"} className={"bg-theme-primary rounded-lg text-sm text-white font-semibold p-5"} />
            </div>
          </div>
        </div>

        <div className='w-full'>
          {todos.map((todo, i) => (
            <div key={i} className='w-full flex justify-between items-center border-b-2 border-theme-gray p-2'>
              <div className='flex items-center'>
                {editIndex === i ? (
                  <div>
                    <FormInput
                      type='text'
                      value={task}
                      onChange={setTask}
                      className='h-8 border-2 rounded-lg p-2 focus:outline-orange-400 border-theme-gray'
                    />
                  </div>
                ) : (
                  <>
                    <input
                      type='checkbox'
                      className='h-4 w-4 appearance-none ring-2 ring-offset-2 ring-red-500 rounded-md bg-red-500 checked:bg-green-500 checked:ring-green-500'
                    />
                    <p className='ml-2'>{todo}</p>
                  </>
                )}
              </div>
              <div className='flex space-x-2'>
                {editIndex === i ? (
                  <button className='bg-theme-primary rounded-lg text-sm text-white font-semibold p-2' onClick={handleUpdateTask}>UPDATE</button>
                ) : (
                  <>
                    <button className='bg-theme-primary rounded-lg text-sm text-white font-semibold p-2' onClick={() => handleEditTask(i)}>EDIT</button>
                    <button className='bg-theme-primary rounded-lg text-sm text-white font-semibold p-2' onClick={() => handleDelete(i)}>DELETE</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
