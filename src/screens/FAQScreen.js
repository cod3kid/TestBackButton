import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, InteractionManager, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FAQ_DATA = [
  { id: '1', question: 'How do I start a workout?', answer: 'Go to the Workout tab and tap "Start Workout" to begin a new session.' },
  { id: '2', question: 'Can I customize my program?', answer: 'Yes! Navigate to Programs, select a program, and tap "Customize" to adjust sets, reps, and exercises.' },
  { id: '3', question: 'How do I track my progress?', answer: 'Your Dashboard shows weekly stats, personal records, and workout history automatically.' },
  { id: '4', question: 'Can I cancel my subscription?', answer: 'Yes, go to Settings > Subscription Plans to manage or cancel your subscription at any time.' },
  { id: '5', question: 'How do I contact support?', answer: 'Head to Settings > Contact Support to send us a message directly from the app.' },
];

const FAQItem = ({ item }) => {
  const [expanded, setExpanded] = React.useState(false);



  return (
    <TouchableOpacity
      style={styles.faqItem}
      onPress={() => setExpanded(!expanded)}
      activeOpacity={0.7}
    >
      <View style={styles.questionRow}>
        <Text style={styles.question}>{item.question}</Text>
        <Icon
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#7C3AED"
        />
      </View>
      {expanded && <Text style={styles.answer}>{item.answer}</Text>}
    </TouchableOpacity>
  );
};

const FAQScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();


  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={()=>  navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQ</Text>
        <View style={styles.backButton} />
      </View>
      <FlatList
        data={FAQ_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FAQItem item={item} />}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#1C1C1E',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  faqItem: {
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 12,
  },
  answer: {
    fontSize: 14,
    color: '#A1A1AA',
    marginTop: 10,
    lineHeight: 20,
  },
});

export default FAQScreen;
