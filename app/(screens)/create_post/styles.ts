import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3f4f6',
  },
  header: {
    paddingVertical: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },

  inputContainer: {
    padding: 10,
    marginBottom: 10,
    elevation: 3,
  },

  fields: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    paddingLeft: 5,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionSelect: {
    paddingHorizontal: 15,
    paddingVertical: 17,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 15,
    width: '100%',
  },
  dropdwon: {
    backgroundColor: 'white',
    borderColor: '#ccc',
  },
  dropdownText: {
    fontSize: 16,
    color: '#9f9f9f',
  },
  imagePicker: {
    marginTop: 20,
    alignItems: 'center',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    width: '50%',
  },
  buttonContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    paddingBottom: 20,
    paddingTop: 20,
  },
  buttonText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'white',
  },

  errorText: {
    color: 'red',
    paddingLeft: 10,
  },
  imageContainer: {
    marginVertical: 15,
    alignItems: 'center',
  },
  imageButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  imageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imagePreviewContainer: {
    position: 'relative',
    marginTop: 10,
  },

  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 1,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    padding: 5,
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeStyles: {
    backgroundColor: 'rgb(239, 246, 255)',
  },
  badgeTextStyles: {
    color: 'rgb(29, 78, 216)',
    fontWeight: '500',
  },
})

export default styles
