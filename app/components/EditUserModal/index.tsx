import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Switch } from 'react-native';
import { User } from '@/app/services/user/IUser';

interface EditUserModalProps {
  visible: boolean;
  user: User | null;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ visible, user, onClose, onSave }) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState(user?.password || '');

  // Atualiza os valores do modal quando o usuário muda
  React.useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
    }
  }, [user]);

  const handleSave = () => {
    if (user) {
      onSave({ ...user, name, email, password });
    }
  };

  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (value: boolean) => {
    setChecked(value);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Editar Usuário</Text>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#111827" }}>Nome</Text>
              <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nome" />
            </View>
            <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 14, fontWeight: "500", color: "#111827" }}>E- mail</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#111827" }}>
              Deseja alterar a senha?
              </Text>
              <Switch value={checked} onValueChange={handleCheckboxChange} />
            </View>
              
              {checked && (
                  <View style={{ marginTop: 20 }}>
                    <View style={{ marginBottom: 12 }}>
                      <Text style={{ fontSize: 14, fontWeight: "500", color: "#111827" }}>
                        Senha
                      </Text>
                      <TextInput
                        secureTextEntry
                        placeholder="Digite sua senha"
                        value={password} onChangeText={setPassword}
                      />
                    </View>
      
                    <View style={{ marginBottom: 12 }}>
                      <Text style={{ fontSize: 14, fontWeight: "500", color: "#111827" }}>
                        Confirmar Senha
                      </Text>
                      <TextInput
                        secureTextEntry
                        placeholder="Confirme sua senha"
                      />
                      {/* {touched.confirmPassword && errors.confirmPassword && (
                        <Text style={{ color: "red", fontSize: 12 }}>{errors.confirmPassword}</Text>
                      )} */}
                    </View>
                  </View>
                )}   
            <View style={styles.buttonContainer}>
              <Button title="Cancelar" onPress={onClose} color="red" />
              <Button title="Salvar" onPress={handleSave} />
            </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default EditUserModal;
