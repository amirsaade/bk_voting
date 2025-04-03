import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';

// Define the Vote type
interface Vote {
  id: number;
  topic: string;
  status: string;
}

export default function HomeScreen(): JSX.Element {
  const [votes, setVotes] = useState<Vote[]>([]);
  const nextId = useRef(1); // Track next vote ID manually

  useEffect(() => {
    // Add a new vote every 3 seconds
    const interval = setInterval(() => {
      const newVote: Vote = {
        id: nextId.current++,
        topic: `Vote Topic ${votes.length + 1}`,
        status: Math.random() > 0.5 ? '🟢 Open' : '🔴 Closed',
      };

      setVotes(prevVotes => [...prevVotes, newVote]);

      if (newVote.status === '🔴 Closed') {
        // Remove closed votes after 10 seconds
        setTimeout(() => {
          setVotes(prevVotes => prevVotes.filter(vote => vote.id !== newVote.id));
        }, 10000);
      } else {
        // Convert open votes to closed after 60 seconds
        setTimeout(() => {
          setVotes(prevVotes =>
            prevVotes.map(vote =>
              vote.id === newVote.id ? { ...vote, status: '🔴 Closed' } : vote
            )
          );

          // Remove them 10 seconds after closing
          setTimeout(() => {
            setVotes(prevVotes => prevVotes.filter(vote => vote.id !== newVote.id));
          }, 10000);
        }, 60000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [votes]);

  const handleVotePress = (vote: Vote) => {
    Alert.alert(
      `Vote Details`,
      `ID: ${vote.id}\nTopic: ${vote.topic}\nStatus: ${vote.status}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>🗳️ Votes in Progress</Text>

      {/* Table Container */}
      <View style={styles.tableContainer}>
        {/* Header Row */}
        <View style={styles.rowHeader}>
          <Text style={styles.headerCell}>Vote ID</Text>
          <Text style={styles.headerCell}>Topic</Text>
          <Text style={styles.headerCell}>Status</Text>
        </View>

        {/* Dynamic Rows */}
        <ScrollView>
          {votes.map((vote) => (
            <TouchableOpacity key={vote.id} onPress={() => handleVotePress(vote)}>
              <View style={styles.rowBody}>
                <Text style={styles.cell}>{vote.id}</Text>
                <Text style={styles.cell}>{vote.topic}</Text>
                <Text style={styles.cell}>{vote.status}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingTop: '10%',
    backgroundColor: '#f9fafb', // Light background
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: '6%',
    textAlign: 'center',
    color: '#111827', // Dark text
  },
  tableContainer: {
    flex: 0.85, // Slightly reduced height
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    backgroundColor: '#ffffff', // White background
  },
  rowHeader: {
    flexDirection: 'row',
    backgroundColor: '#1f2937', // Dark background for header
  },
  rowBody: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6', // Light gray rows
  },
  headerCell: {
    flex: 1,
    paddingVertical: '4%',
    paddingHorizontal: '2.5%',
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    paddingVertical: '4%',
    paddingHorizontal: '2.5%',
    color: '#111827',
    textAlign: 'center',
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
  },
});