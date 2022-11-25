import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 'x-large',
    marginBottom: 20,
  },
  containerForm: {

  },
  input: {
    height: 40,
    marginBottom: 12,
    marginTop: 5,
    backgroundColor: '#EDEFF2',
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 10,
  },
  containerTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  touchebleForgot: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  forgot: {
    fontSize: 'x-small',
    marginTop: 5,
    marginBottom: 20,
  },
});
