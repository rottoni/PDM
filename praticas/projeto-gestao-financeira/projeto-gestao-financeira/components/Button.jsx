import { TouchableHighlight, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

export default function Button({ children, onPress }) {
  return (
    <TouchableHighlight style={styles.button} onPress={onPress} underlayColor={Colors.primaryDark}>
      <Text style={styles.text}>{children}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  }
});