import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import navigators
import TabNavigator from './TabNavigator';

// Import screens
import SubscriptionPlansScreen from '../screens/SubscriptionPlansScreen';
import CalculatorsScreen from '../screens/CalculatorsScreen';
import CalculatorDetailScreen from '../screens/CalculatorDetailScreen';
import ProgramDetailScreen from '../screens/ProgramDetailScreen';
import ProgramSetupScreen from '../screens/ProgramSetupScreen';
import WebViewScreen from '../screens/WebViewScreen';
import FAQScreen from '../screens/FAQScreen';
import ContactSupportScreen from '../screens/ContactSupportScreen';
import FeatureRequestScreen from '../screens/FeatureRequestScreen';
import TrainScreen from '../screens/TrainScreen';

const RootStack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false, }}>
        <RootStack.Screen name="MainTabs" component={TabNavigator} />
        <RootStack.Screen name="SubscriptionPlans" component={SubscriptionPlansScreen} />
        <RootStack.Screen name="Calculators" component={CalculatorsScreen} />
        <RootStack.Screen
          name="CalculatorDetail"
          component={CalculatorDetailScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
        name="ProgramDetail"
        component={ProgramDetailScreen}
        options={{ title: 'Program Details' }}
      />
       <RootStack.Screen
        name="ProgramSetup"
        component={ProgramSetupScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="WebView"
        component={WebViewScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="FAQ"
        component={FAQScreen}
      />
      <RootStack.Screen
        name="ContactSupport"
        component={ContactSupportScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="FeatureRequest"
        component={FeatureRequestScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Train"
        component={TrainScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      </RootStack.Navigator>
      </NavigationContainer>
  );
};

export default AppNavigator;
