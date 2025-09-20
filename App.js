import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function App() {
  // Chat State
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi!', sender: 'other' },
    { id: '2', text: 'Say Tirada ron?', sender: 'me' },
    { id: '3', text: 'Laag ta?', sender: 'other' },
  ]);
  const [input, setInput] = useState('');

  // Comments State (each comment can have replies)
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null); // track which comment is being replied to

  // Send Chat Message
  const sendMessage = () => {
    if (input.trim() === '') return;

    const newMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'me',
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
  };

  // Add Comment
  const addComment = () => {
    if (newComment.trim() === '') return;

    const comment = {
      id: Date.now().toString(),
      text: newComment,
      replies: [], // store replies for each comment
    };

    setComments((prev) => [...prev, comment]);
    setNewComment('');
  };

  // Add Reply to a Comment
  const addReply = (commentId) => {
    if (replyText.trim() === '') return;

    const reply = {
      id: Date.now().toString(),
      text: replyText,
    };

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      )
    );

    setReplyText('');
    setReplyingTo(null); // close reply input
  };

  // Render Chat Message
  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.message,
        item.sender === 'me' ? styles.myMessage : styles.otherMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  // Render Comment
  const renderComment = ({ item }) => (
    <View style={styles.commentBubble}>
      <Text style={styles.commentText}>{item.text}</Text>

      {/* Reply Button */}
      <TouchableOpacity
        onPress={() => setReplyingTo(item.id)}
        style={styles.replyButton}
      >
        <Text style={styles.replyButtonText}>Reply</Text>
      </TouchableOpacity>

      {/* Show Replies */}
      {item.replies.map((reply) => (
        <View key={reply.id} style={styles.replyBubble}>
          <Text style={styles.replyText}>{reply.text}</Text>
        </View>
      ))}

      {/* Reply Input (only visible for selected comment) */}
      {replyingTo === item.id && (
        <View style={styles.replyInputContainer}>
          <TextInput
            style={styles.replyInput}
            placeholder="Write a reply..."
            value={replyText}
            onChangeText={setReplyText}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => addReply(item.id)}
          >
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Chat Section */}
        <Text style={styles.sectionTitle}>Chat</Text>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          style={styles.flatList}
          scrollEnabled={false}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>

        {/* Comment Section */}
        <Text style={styles.sectionTitle}>Comments</Text>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={renderComment}
          style={styles.flatList}
          scrollEnabled={false}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a comment..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity style={styles.sendButton} onPress={addComment}>
            <Text style={styles.sendText}>Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  flatList: {
    flexGrow: 0,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '70%',
  },
  myMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#EEE',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'grey',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    borderRadius: 20,
  },
  sendText: {
    color: 'orange',
    fontWeight: 'bold',
  },
  commentBubble: {
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignSelf: 'flex-start',
    maxWidth: '90%',
  },
  commentText: {
    fontSize: 16,
    color: 'blue',
  },
  replyButton: {
    marginTop: 5,
  },
  replyButtonText: {
    color: 'grey',
    fontWeight: 'bold',
  },
  replyBubble: {
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    padding: 8,
    marginVertical: 3,
    marginLeft: 20,
  },
  replyText: {
    fontSize: 15,
    color: '#444',
  },
  replyInputContainer: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  replyInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#fff',
  },
});