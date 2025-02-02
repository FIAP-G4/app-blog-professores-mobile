import * as Yup from 'yup';

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

  export default schema