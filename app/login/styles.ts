import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: '#f3f4f6',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  introText: {
    marginBottom: 30,
    width: '90%',
  },
  loginBox: {
    padding: 20,
    borderRadius: '.5rem',
    backgroundColor: 'white',
    width: '99%',
  },
  loginTitle: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    marginBottom: 7,
    fontWeight: 'bold',
  },
  input: {
    padding: 10,
    borderRadius: '.5rem',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
    borderRadius: '.5rem',
    overflow: 'hidden',
  },
  registerRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  paragraph: {
    marginBottom: 10,
  },
})

export default styles
