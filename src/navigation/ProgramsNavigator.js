import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProgramsScreen from '../screens/ProgramsScreen';
import ProgramDetailScreen from '../screens/ProgramDetailScreen';
import ProgramSetupScreen from '../screens/ProgramSetupScreen';

const Stack = createNativeStackNavigator();

// Stack Navigator for Programs screens
const ProgramsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="ProgramsMain"
        component={ProgramsScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="ProgramDetail"
        component={ProgramDetailScreen}
        options={{ title: 'Program Details' }}
      />
      <Stack.Screen
        name="ProgramSetup"
        component={ProgramSetupScreen}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
};

export default ProgramsStack;
