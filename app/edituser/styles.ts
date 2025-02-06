import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 30,

  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  buttonWrapper: {
      overflow: 'hidden',
      margin: 5,
      borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  error:{
    color: 'red',
    marginBottom: 10,
  },
  label: {
    marginBottom: 7,
    fontWeight: 'bold',
  },
});

export default styles