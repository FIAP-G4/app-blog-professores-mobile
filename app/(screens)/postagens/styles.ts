import { Platform, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  screen: {
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: '#f3f4f6',
  },
  subHeader: {
    padding: 18,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
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
  textInputWrapper: {
    marginLeft:Platform.OS == 'ios' ? 20 : 0,
    marginTop: Platform.OS == 'ios' ? 0 : 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingRight: 0,
    backgroundColor: 'white',
    width: Platform.OS == 'ios' ? '90%' : '100%',
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
  btn: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentMultiSelect: {
    margin: Platform.OS == 'ios' ? 20 : 0,
  },
})

export default styles
