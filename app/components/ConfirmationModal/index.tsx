import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles'


interface ConfirmationModalProps {
  isVisible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  setVisible: (visible: boolean) => void; // Para controlar visibilidade
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isVisible, message, onConfirm, onCancel, setVisible }) => {
  const handleCancel = () => {
    setVisible(false); // Fecha o modal primeiro
    onCancel(); // Depois executa a ação de cancelamento
  };

  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={handleCancel} // Fecha ao tocar fora
      useNativeDriver
    >
      <View style={styles.container}>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {
              setVisible(false); // Fecha o modal ao confirmar
              onConfirm();
            }}
          >
            <Text style={styles.confirmText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
