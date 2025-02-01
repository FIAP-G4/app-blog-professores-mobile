import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Switch } from 'react-native';
import { User } from '@/app/services/user/IUser';
import { Formik } from 'formik';
import * as Yup from 'yup';

interface EditUserModalProps {
  visible: boolean;
  user: User | null;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  changePassword: Yup.boolean(),
  password: Yup.string().when('changePassword', {
    is: true,
    then: (schema) => schema.min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
    otherwise: (schema) => schema.notRequired(),
  }),
  confirmPassword: Yup.string().when('changePassword', {
    is: true,
    then: (schema) =>
      schema
        .required('Confirmação de senha é obrigatória')
        .oneOf([Yup.ref('password')], 'As senhas não conferem'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

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
                  <Button title="Cancelar" onPress={onClose} color="red" />
                  <Button title="Salvar" onPress={() => handleSubmit()} />
                </View>
              </>
            )}
          </Formik>
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
  error:{
    color: 'red',
    marginBottom: 10,
  },
  label: {
    marginBottom: 7,
    fontWeight: 'bold',
  },
});

export default EditUserModal;
