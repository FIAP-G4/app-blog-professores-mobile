import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  footer: {
    marginBottom: 16,
  },
  tags: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  commentsSection: {
    flexGrow: 1,
    paddingBottom: 60,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  newCommentInput: {
    backgroundColor: '#F0F4FF',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    paddingHorizontal: 8,
  },
})

export default styles
