import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Button, Paragraph, Dialog, Portal, Provider,
} from 'react-native-paper';

const styles = StyleSheet.create({
  titleNoty: {
    margin: 'auto',
    /* fontSize: 20, */
  },
  cardAction: {
    paddingBottom: 0,
    marginTop: 0,
  },
});

export const Notifications = ({ title, on }) => {
  const [visible, setVisible] = useState(on);
  const hideDialog = () => setVisible(false);

  return (
    <Provider>
      <View>
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={hideDialog}>
            <Dialog.Actions style={styles.cardAction}>
              <Button onPress={hideDialog}>X</Button>
            </Dialog.Actions>
            <Dialog.Content>
              <Paragraph style={styles.titleNoty}>{title}</Paragraph>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};
