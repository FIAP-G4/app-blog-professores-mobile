import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  screen: {
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: '#f3f4f6',
  },
  subHeader: {
    padding: 20,
    backgroundColor: 'white',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  optionSelect: {
    marginBottom: 20,
    paddingHorizontal: 15,
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
  optionSeletText: {
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: '90%',
    color: '#9f9f9f',
  },
  optionSelectPicker: {
    width: '10%',
  },
  textInputWrapper: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingRight: 0,
    marginBottom: 20,
    backgroundColor: 'white',
    width: '100%',
    height: 55,
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  textInput: {
    width: '85%',
    paddingHorizontal: 15,
  },
  btnWrapper: {
    width: '15%',
    backgroundColor: 'rgb(156, 163, 175)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default styles
