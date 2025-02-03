import React from 'react';
import { View, Text, TextInput, Button, Switch, SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import { useRouter, useLocalSearchParams } from 'expo-router';
import styles from './styles';
import principalStyles from '@/app/styles';
import schema from './schema';
import { ITeacher } from '@/app/utils/hooks/useTeacherList';
import useUpdateUser from '@/app/utils/hooks/useUserUpdate';
import { IStudent } from '@/app/utils/hooks/useStudentList';

export default function editUser(): JSX.Element {
  const router = useRouter();
  const { user } = useLocalSearchParams();
  const { handleUpdateUser } = useUpdateUser();

  // Convertendo os parâmetros recebidos
  const parsedUser: ITeacher | IStudent = user ? JSON.parse(user as string) : null;
  // const fetchUsersFunc = fetchUsers ? new Function(`return ${fetchUsers}`)() : null;

  return (
    <SafeAreaView >
      <View style={principalStyles.subHeader}>
        <Text style={principalStyles.pageTitle}>Editar usuario</Text>
      </View>

      <Formik
        enableReinitialize
        initialValues={{
          name: parsedUser?.name || '',
          email: parsedUser?.email || '',
          password: '',
          confirmPassword: '',
          changePassword: false,
        }}
        validationSchema={schema}
        onSubmit={async (values) => {
          const updatedUser = {
            ...parsedUser,
            name: values.name,
            email: values.email,
            ...(values.changePassword ? { password: values.password } : {}),
          };

          await handleUpdateUser(updatedUser.user_id, updatedUser);
          router.back();
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
          <View   style={principalStyles.screen}>
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

            <View style={{ marginBottom: 10, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#111827" }}>
                Deseja alterar a senha?     
                </Text>        
                 <Switch 
                  style={{ marginLeft: 10 }}
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
                  <Button title="Cancelar" onPress={() => router.back()} color="red" />
                </View>
                <View style={styles.buttonWrapper}>
                  <Button title="Salvar"  color="#4e46dd" onPress={() => handleSubmit()} />
                </View>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};