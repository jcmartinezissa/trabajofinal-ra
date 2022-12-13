import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    marginTop: 20,
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
export const Separator = () => (

  <View style={styles.separator} />

);
