import { StyleSheet } from 'react-native'

const register = StyleSheet.create({
  screen: {
    top: -33,
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
    borderRadius: 10,
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
    borderRadius: 10,
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
})

export default register
