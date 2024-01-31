import * as yup from 'yup';

export const loginUserSchemaBody = yup.object().shape({
  email: yup
    .string()
    .email('Veuillez fournir une adresse e-mail valide')
    .required("L'adresse e-mail est requise"),
  password: yup.string().required('Le mot de passe est requis'),
});
