import { StyleSheet } from 'react-native';
import { Colors } from '../constants/colors'; // Ajuste o caminho conforme seu projeto

export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 12,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
  },
  inputLabel: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4,
    fontWeight: 'bold',
  }
});