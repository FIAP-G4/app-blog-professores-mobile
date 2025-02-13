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
    marginTop: 30,
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
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#4e46dd',
    overflow: 'hidden',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
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
    marginBottom: 10,
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
    minHeight: 20, // Evita que o layout "salte" quando a mensagem aparece
  },
})

export default styles
