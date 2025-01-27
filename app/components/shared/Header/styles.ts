import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#212836',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
    zIndex: 2,
  },
  headerLogo: {
    width: 35,
    height: 35,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSafeArea: {
    backgroundColor: '#212836',
  },
})

export default styles
