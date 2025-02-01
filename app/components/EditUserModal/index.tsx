import React from 'react';
import { Modal, View, Text, TextInput, Button, Switch } from 'react-native';
import { User } from '@/app/services/user/IUser';
import { Formik } from 'formik';
import styles from './styles';
import schema from './schema';

interface EditUserModalProps {
  visible: boolean;
  user: User | null;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ visible, user, onClose, onSave }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Editar Usuário</Text>
          
          <Formik
            enableReinitialize
            initialValues={{
              name: user?.name || '',
              email: user?.email || '',
              password: '',
              confirmPassword: '',
              changePassword: false,
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              const updatedUser: User = {
                ...user!,
                name: values.name,
                email: values.email,
                ...(values.changePassword ? { password: values.password } : {}),
              };
              onSave(updatedUser);
            }}
            
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
              validateForm,
            }) => (
              <>
                <View style={{ marginBottom: 10 }}>
                  <Text style={styles.label}>Nome</Text>
                  <TextInput 
                    style={styles.input}                 
                    value={values.name}
                    placeholder="Digite seu nome"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')} 
                  />
                  {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
                </View>

                <View style={{ marginBottom: 10 }}>
                  <Text style={styles.label}>E-mail</Text>
                  <TextInput                 
                    style={styles.input}
                    value={values.email}
                    placeholder="Digite seu e-mail"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    keyboardType="email-address"
                  />
                  {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                </View>

                <View style={{ marginBottom: 10 }}>
                  <Text style={{ fontSize: 14, fontWeight: "500", color: "#111827" }}>
                    Deseja alterar a senha?
                  </Text>
                  <Switch 
                      value={values.changePassword} 
                      onValueChange={(value) => {
                        setFieldValue('changePassword', value);
                        validateForm();
                      }} 
                  />
                </View>

                {values.changePassword && (
                  <View style={{ marginTop: 20 }}>
                    <View style={{ marginBottom: 12 }}>
                      <Text style={styles.label}>Senha</Text>
                      <TextInput
                        style={styles.input}
                        secureTextEntry
                        value={values.password}
                        placeholder="Digite sua senha"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')} 
                      />
                      {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
                    </View>

                    <View style={{ marginBottom: 12 }}>
                      <Text style={styles.label}>Confirmar Senha</Text>
                      <TextInput
                        style={styles.input}
                        secureTextEntry
                        value={values.confirmPassword}
                        placeholder="Confirme sua senha"
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')} 
                      />
                      {touched.confirmPassword && errors.confirmPassword && (
                        <Text style={styles.error}>{errors.confirmPassword}</Text>
                      )}
                    </View>
                  </View>
                )}  

                <View style={styles.buttonContainer}>
                    <View style={styles.buttonWrapper}>
                      <Button title="Cancelar" onPress={onClose} color="red" />
                    </View>
                    <View style={styles.buttonWrapper}>
                      <Button title="Salvar"  color="#4e46dd" onPress={() => handleSubmit()} />
                    </View>
                </View>
              </>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};

export default EditUserModal;
