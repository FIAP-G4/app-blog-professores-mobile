import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
    },
    message: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    cancelButton: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
      borderRadius: 5,
      backgroundColor: '#ddd',
      marginRight: 5,
    },
    confirmButton: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
      borderRadius: 5,
      backgroundColor: '#007bff',
      marginLeft: 5,
    },
    cancelText: {
      color: '#333',
      fontWeight: 'bold',
    },
    confirmText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

  export default styles