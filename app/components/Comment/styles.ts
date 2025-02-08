import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  commentContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  commentAuthor: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  commentDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  commentContent: {
    fontSize: 14,
    color: '#333',
  },
})

export default styles
