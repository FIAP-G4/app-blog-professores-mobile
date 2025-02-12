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
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  cardAction: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonAction: {
    marginLeft: 10,
    padding: 6,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
  },
  buttonActionEdit: {
    backgroundColor: '#3B82F6',
  },
  buttonActionDelete: {
    backgroundColor: '#EF4444',
  },
})

export default styles
