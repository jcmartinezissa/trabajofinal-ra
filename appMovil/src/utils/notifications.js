import { useState } from 'react';
import { View } from 'react-native';
import {
  Button, Paragraph, Dialog, Portal, Provider,
} from 'react-native-paper';

export const Notifications = ({ title }) => {
  console.log(title);
  const [visible, setVisible] = useState(false);

  // const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <Provider>
      <View>
        {/* <Button onPress={showDialog}>Show Dialog</Button> */}
        <Portal>
          <Dialog
            // visible={true}
            onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>{title}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};
