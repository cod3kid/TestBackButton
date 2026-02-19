import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  savedWorkouts: [],
  // Track last used exercises for quick access
  recentExercises: [],
};

const customWorkoutSlice = createSlice({
  name: 'customWorkouts',
  initialState,
  reducers: {
    saveCustomWorkout: (state, action) => {
      const workout = {
        ...action.payload,
        id: action.payload.id || `custom_${Date.now()}`,
        savedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      // Check if workout already exists (update) or is new (add)
      const existingIndex = state.savedWorkouts.findIndex(w => w.id === workout.id);
      if (existingIndex >= 0) {
        state.savedWorkouts[existingIndex] = workout;
      } else {
        state.savedWorkouts.unshift(workout);
      }
    },
    deleteCustomWorkout: (state, action) => {
      state.savedWorkouts = state.savedWorkouts.filter(w => w.id !== action.payload);
    },
    updateCustomWorkout: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.savedWorkouts.findIndex(w => w.id === id);
      if (index >= 0) {
        state.savedWorkouts[index] = {
          ...state.savedWorkouts[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    duplicateCustomWorkout: (state, action) => {
      const original = state.savedWorkouts.find(w => w.id === action.payload);
      if (original) {
        const duplicate = {
          ...original,
          id: `custom_${Date.now()}`,
          name: `${original.name} (Copy)`,
          savedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        state.savedWorkouts.unshift(duplicate);
      }
    },
    addRecentExercise: (state, action) => {
      const exerciseName = action.payload;
      // Remove if already exists
      state.recentExercises = state.recentExercises.filter(e => e !== exerciseName);
      // Add to beginning
      state.recentExercises.unshift(exerciseName);
      // Keep only last 20
      state.recentExercises = state.recentExercises.slice(0, 20);
    },
    clearRecentExercises: (state) => {
      state.recentExercises = [];
    },
  },
});

export const {
  saveCustomWorkout,
  deleteCustomWorkout,
  updateCustomWorkout,
  duplicateCustomWorkout,
  addRecentExercise,
  clearRecentExercises,
} = customWorkoutSlice.actions;

export default customWorkoutSlice.reducer;
