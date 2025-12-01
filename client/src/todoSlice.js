import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from './api/client'

// Async Thunks
export const fetchTasks = createAsyncThunk('todos/fetchTasks', async () => {
  const response = await api.fetchTasks()
  return response.data
})

export const addTask = createAsyncThunk('todos/addTask', async ({ text, parentId }) => {
  const response = await api.createTask({ text, parentId })
  return response.data
})

export const toggleTodo = createAsyncThunk('todos/toggleTodo', async (id) => {
  const response = await api.toggleTaskCompletion(id)
  return response.data
})

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await api.deleteTask(id)
  return id
})

export const editTodo = createAsyncThunk('todos/editTodo', async ({ id, text }) => {
  const response = await api.updateTask(id, { text })
  return response.data
})

export const toggleExpanded = createAsyncThunk('todos/toggleExpanded', async (id) => {
  const response = await api.toggleTaskExpanded(id)
  return response.data
})

export const clearCompleted = createAsyncThunk('todos/clearCompleted', async () => {
  await api.clearCompletedTasks()
  return
})

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      // Add Task
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
      // Toggle Todo
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      // Delete Todo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        // Remove task and its children from local state
        const id = action.payload
        const deleteRecursive = (taskId) => {
          const children = state.items.filter(t => t.parentId === taskId)
          children.forEach(child => deleteRecursive(child.id))
          state.items = state.items.filter(t => t.id !== taskId)
        }
        deleteRecursive(id)
      })
      // Edit Todo
      .addCase(editTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      // Toggle Expanded
      .addCase(toggleExpanded.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      // Clear Completed
      .addCase(clearCompleted.fulfilled, (state) => {
        // Reload tasks to get fresh state from server
        // Or optimistically clear locally (simplified here)
        state.items = state.items.filter(t => !t.completed)
      })
  }
})

export default todosSlice.reducer