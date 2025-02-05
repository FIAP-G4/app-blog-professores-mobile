import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    margin:10,
    borderRadius: 10,
  },
  subHeader: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 10,
    elevation: 3,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionSelect: {
    borderColor: '#ccc',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 15,
    width: '100%',
    height: 45,
    marginBottom: 10,
  },
  dropdwon: {
    backgroundColor: 'white',
    borderColor: '#ccc',
  },
  label: {
    marginBottom: 7,
    fontWeight: 'bold',
  },
  input: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    minHeight: 20,
  },
})

export default styles