import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

// ##########################

const DashboardScreen = () => {
  return (
    <View style={dashboardStyles.container}>
      <Text style={dashboardStyles.text}>DashboaffrdScreen.js</Text>
    </View>
  );
};

const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

// ##########################

const SettingsScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={settingsStyles.listItem}
        onPress={() => navigation.navigate('FAQ')}>
        <Text style={settingsStyles.listItemText}>FAQ</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  listItemText: {
    fontSize: 16,
  },
});

// ##########################

const Tab = createBottomTabNavigator();

const TabIcon = ({ route, focused, color, size }) => {
  return (
    <View style={{ flex: 1, backgroundColor: color }}>
      <Text>{route}</Text>
    </View>
  );
};

const TabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <TabIcon
            route={route.name}
            focused={focused}
            color={color}
            size={size}
          />
        ),
        tabBarActiveTintColor: '#7C3AED',
        tabBarInactiveTintColor: '#FFFFFF80',
        tabBarStyle: {
          position: 'absolute',
          bottom: insets.bottom > 0 ? insets.bottom + 5 : 10,
          left: 20,
          right: 20,
          marginHorizontal: 10,
          backgroundColor: '#1C1C1E',
          borderTopWidth: 0,
          borderRadius: 20,
          elevation: 15,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          paddingBottom: 10,
          paddingTop: 10,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
};

// ##########################

const FAQ_DATA = [
  {
    id: '1',
    question: 'How do I reset my password?',
    answer:
      'Go to Settings > Account > Reset Password. You will receive an email with a link to create a new password.',
  },
  {
    id: '2',
    question: 'How do I update my profile?',
    answer:
      'Navigate to Settings > Profile. From there you can update your name, photo, and other personal details.',
  },
  {
    id: '3',
    question: 'How do I contact support?',
    answer:
      'You can reach our support team by emailing support@example.com or through the in-app chat on the Settings page.',
  },
  {
    id: '4',
    question: 'Is my data secure?',
    answer:
      'Yes. All data is encrypted in transit and at rest. We follow industry-standard security practices to protect your information.',
  },
  {
    id: '5',
    question: 'How do I delete my account?',
    answer:
      'Go to Settings > Account > Delete Account. Please note this action is permanent and cannot be undone.',
  },
  {
    id: '6',
    question: 'Can I use the app offline?',
    answer:
      'Some features are available offline. Your data will sync automatically when you reconnect to the internet.',
  },
  {
    id: '7',
    question: 'How do I cancel my subscription?',
    answer:
      'You can cancel your subscription through your device\'s app store settings or by going to Settings > Subscription > Cancel.',
  },
];

const FAQItem = ({ item }) => (
  <View style={faqStyles.item}>
    <Text style={faqStyles.question}>{item.question}</Text>
    <Text style={faqStyles.answer}>{item.answer}</Text>
  </View>
);

const FAQScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text>{'<- back'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQss</Text>
        <View style={styles.backButton} />
      </View>
      <FlatList
        data={FAQ_DATA}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <FAQItem item={item} />}
        contentContainerStyle={faqStyles.list}
      />
    </View>
  );
};

const faqStyles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  answer: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// ##########################

const RootStack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="MainTabs" component={TabNavigator} />
        <RootStack.Screen name="FAQ" component={FAQScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;