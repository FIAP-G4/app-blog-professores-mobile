import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  card: {
    marginTop: 30,
    marginHorizontal: 'auto',
    backgroundColor: 'white',
    borderColor: 'rgba(229, 231, 235, .6)',
    borderWidth: 2,
    borderRadius: 8,
    width: '90%',
    overflow: 'hidden',
  },
  cardImage: {
    minHeight: 150,
  },
  cardContentPadding: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  authorName: {
    fontSize: 18,
    color: 'rgba(0, 0, 0, .5)',
  },
  cardContent: {
    fontSize: 17,
    marginVertical: 10,
  },
  cardTagsWrapper: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    columnGap: 10,
  },
  cardTags: {
    backgroundColor: 'rgb(239, 246, 255)',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    color: 'rgb(29, 78, 216)',
    fontWeight: 500,
  },
  cardDate: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, .5)',
  },
  displayFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default styles
