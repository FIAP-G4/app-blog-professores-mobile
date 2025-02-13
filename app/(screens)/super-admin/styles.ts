import { Platform, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    margin: Platform.OS === 'ios' ? 16 : 0,
  },
  scrollContainer: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rowText: {
    paddingTop: 7,
    paddingRight: 7,
    flex: 1,
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
  },
  searchEmpty: {
    textAlign: 'center',
    padding: 20,
  },
  cardAction: {
    paddingRight: 16,
    display: 'flex',
    flexDirection: 'row',
  },

  buttonAction: {
    marginLeft: 1,
    padding: 4,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
  },

  buttonActionEdit: {
    backgroundColor: '#3B82F6',
    maxHeight: 36,
  },

  buttonActionDelete: {
    backgroundColor: '#EF4444',
    maxHeight: 36,
  },
})

export default styles
