import React,{ useEffect, useState } from 'react'



function Home() {
      // Getting tasks from local storage
      const getTasksFromLS = () => {
          const data = localStorage.getItem('Tasks');
          if (data) {
              return JSON.parse(data);
          } else {
              return [];
          }
      };
  
      // Task input state
      const [taskValue, setTaskValue] = useState('');
      const [description, setDescription] = useState('');
  
      // Tasks array of objects
      const [tasks, setTasks] = useState(getTasksFromLS());
  
      // Form submit event
      const handleSubmit = (e) => {
          e.preventDefault();
  
          // Creating a unique ID for every task
          const date = new Date();
          const time = date.getTime();
  
          // Creating a task object
          let taskObject = {
              ID: time,
              TaskValue: taskValue,
              Description: description,
              completed: false,
          };
  
          // Adding the task to the list
          setTasks([...tasks, taskObject]);
          setTaskValue('');
          setDescription('');
      };
  
      // Saving data to local storage
      useEffect(() => {
          localStorage.setItem('Tasks', JSON.stringify(tasks));
      }, [tasks]);
  
      // Delete task
      const handleDelete = (id) => {
          const filtered = tasks.filter((task) => task.ID !== id);
          setTasks(filtered);
      };
  
      // Edit form state
      const [editForm, setEditForm] = useState(false);
  
      // ID state for editing
      const [id, setId] = useState();
  
      // Edit task
      const handleEdit = (task, index) => {
          setEditForm(true);
          setTaskValue(task.TaskValue);
          setDescription(task.Description);
          setId(index);
      };
  
      // Edit task submit
      const handleEditSubmit = (e) => {
          e.preventDefault();
          let items = [...tasks];
          let item = items[id];
          item.TaskValue = taskValue;
          item.Description = description;
          item.completed = false;
          items[id] = item;
          setTasks(items);
          setEditForm(false);
          setTaskValue('');
          setDescription('');
      };
  
      // Handle checkbox toggle
      const handleCheckbox = (id) => {
          let taskArray = [];
          tasks.forEach((task) => {
              if (task.ID === id) {
                  task.completed = !task.completed;
              }
              taskArray.push(task);
          });
          setTasks(taskArray);
      };
  
      return (
          <div id="formsdiv">
              <div id="taskforms">
                  <h2>My Task List</h2>
                  <>
                      
                      {!editForm && (
                          <div className="form">
                              <form >
                                  <div className="input-and-button" style={{display:"inline"}}>
                                      <input type="text" placeholder="Add a Task" style={{ width: '250px',border: '1px solid black',height: '30px',marginRight: '5px',}} onChange={(e) => setTaskValue(e.target.value)}value={taskValue}
                                      /> <br /> <br />
                                      <textarea  placeholder="Add a Description" style={{ width: '250px', border: '1px solid black', height: '60px',marginRight: '5px',}} onChange={(e) => setDescription(e.target.value)}value={description}>
                                      </textarea> <br /> <br />
                                      <button  style={{height: '30px', width: '50px', backgroundColor: '#3d453f', }} onClick={handleSubmit}>
                                          Add
                                      </button>
                                  </div>
                              </form>
                          </div>
                      )}
                      {/* Edit Form Component */}
                      {editForm && (
                          <div className="form">
                              <form>
                                  <div className="input-and-button">
                                      <input
                                          type="text"
                                          placeholder="Edit your Task"
                                          required
                                          style={{
                                              width: '250px',
                                              border: '1px solid black',
                                              height: '30px',
                                              marginRight: '5px',
                                          }}
                                          onChange={(e) => setTaskValue(e.target.value)}
                                          value={taskValue}
                                      /> <br /> <br />
                                  
                                      <textarea
                                          placeholder="Edit Description"
                                          required
                                          style={{
                                              width: '250px',
                                              border: '1px solid black',
                                              height: '60px',
                                              marginRight: '5px',
                                          }}
                                          onChange={(e) => setDescription(e.target.value)}
                                          value={description}
                                      ></textarea> <br /> <br />
                                      <button
                                          style={{
                                              height: '30px',
                                              width: '80px',
                                              backgroundColor: '#3d453f',
                                          }}
                                          onClick={handleEditSubmit}
                                          type="submit"
                                      >
                                          Update
                                      </button>
                                  </div>
                              </form>
                          </div>
                      )}
                      {/* Rendering Tasks */}
                      {tasks.length > 0 && (
                          <>
                              {tasks.map((individualTask, index) => (
                                  <div
                                      className="task"
                                      key={individualTask.ID}
                                      style={{
                                          width: '500px',
                                          backgroundColor: 'red',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'space-around',
                                          marginTop: '5px',
                                          marginBottom: '5px',
                                      }}
                                  >
                                      <div
                                          style={{
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'space-evenly',
                                              width: '400px',
                                              flexDirection: 'row',
                                          }}
                                      >
                                          {!editForm && (
                                              <input
                                                  type="checkbox"
                                                  checked={individualTask.completed}
                                                  onChange={() => handleCheckbox(individualTask.ID)}
                                              />
                                          )}
                                          <div>
                                              <span
                                                  style={
                                                      individualTask.completed
                                                          ? { textDecoration: 'line-through' }
                                                          : { textDecoration: 'none' }
                                                  }
                                              >
                                                  {individualTask.TaskValue}
                                              </span>
                                              <p>{individualTask.Description}</p>
                                          </div>
                                          {!editForm && (
                                              <div
                                                  className="edit-and-delete"
                                                  style={{
                                                      display: 'flex',
                                                      alignItems: 'center',
                                                      justifyContent: 'end',
                                                      flexDirection: 'row',
                                                  }}
                                              >
                                                  <button
                                                      style={{
                                                          height: '30px',
                                                          width: '80px',
                                                          backgroundColor: '#3d453f',
                                                      }}
                                                      onClick={() => handleEdit(individualTask, index)}
                                                  >
                                                      Edit
                                                  </button>
                                                  <button
                                                      style={{
                                                          height: '30px',
                                                          width: '80px',
                                                          backgroundColor: '#3d453f',
                                                          marginLeft: '5px',
                                                      }}
                                                      onClick={() => handleDelete(individualTask.ID)}
                                                  >
                                                      Delete
                                                  </button>
                                              </div>
                                          )}
                                      </div>
                                  </div>
                              ))}
                              {!editForm && (
                                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                      <button
                                          className="delete-all"
                                          onClick={() => setTasks([])}
                                      >
                                          Delete All Items
                                      </button>
                                  </div>
                              )}
                          </>
                      )}
                  </>
              </div>
          </div>
      );
  }
export default Home
