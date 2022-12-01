import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    borderRadius: 6,
    width: 200,
    textAlign: 'center',
    paddingVertical: 30,
    backgroundColor: '#BCCEF8',
  },
  containerCard: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  card: {
    width: 300,
    textAlign: 'center',
    border: '1px solid #eee',
    borderRadius: 15,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  ContainerAvatar: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    flexWrap: 'center',
    Username: {
      margin: 2,
      flex: 1,
      size: 12,
    },
    Avatar: {
      width: 80,
      height: 80,
      borderRadius: 50,
},
},
});
