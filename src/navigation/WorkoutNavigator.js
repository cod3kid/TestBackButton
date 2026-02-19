import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkoutScreen from '../screens/WorkoutScreen';

const Stack = createNativeStackNavigator();

const WorkoutNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="WorkoutMain" 
        component={WorkoutScreen}
      />
    </Stack.Navigator>
  );
};

export default WorkoutNavigator;
