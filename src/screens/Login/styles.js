import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  touchebleForgot: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  forgot: {
    fontSize: 9,
    marginTop: 5,
    marginBottom: 20,
  },
});
