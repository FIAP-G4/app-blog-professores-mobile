import { Platform, StyleSheet } from 'react-native'

const register = StyleSheet.create({
  screen: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: Platform.OS === 'ios' ? -50 : -20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  introText: {
    marginBottom: 30,
    width: '90%',
  },
  loginBox: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    width: '100%',
    margin: 16,
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#4e46dd',
    overflow: 'hidden',
  },
  buttonText: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
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
  inputPassword: {
    flex: 1,
    padding: 10,
    marginLeft: 0,
    paddingHorizontal: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 20,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    marginLeft: 10,
    padding: 0,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  fields: {
    marginBottom: 30,
  },
})

export default register
