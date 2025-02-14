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
    flexGrow: 1,
    justifyContent: 'space-between',
    overflow: 'hidden',
    height: 'auto',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
    width: '100%',
    overflow: 'hidden',
  },
  cardImageWrapper: {
    width: '100%',
    overflow: 'hidden',
    flexDirection: 'row',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardImage: {
    flex: 1,
    width: '100%',
    height: 200,
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
    marginVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '10',
    justifyContent: 'flex-start',
  },
  cardTags: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgb(239, 246, 255)',
    borderColor: '#e5e7eb',
    borderWidth: 1,
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
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
  },
  stat: {
    fontSize: 14,
    color: '#666',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeader: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  cardHeaderLeft: {
    flexDirection: 'column',
  },
})

export default styles
