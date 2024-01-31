import * as yup from 'yup';

export const registerUserSchemaBody = yup.object().shape({
  username: yup.string().required("Le nom d'utilisateur est requis"),
  email: yup
    .string()
    .email('Veuillez fournir une adresse e-mail valide')
    .required("L'adresse e-mail est requise"),
  password: yup
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .matches(
      /^(?=.*[A-Z]).*$/,
      'Le mot de passe doit contenir au moins une majuscule',
    )
    .matches(
      /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
      'Le mot de passe doit contenir au moins un caractère spécial',
    )
    .matches(
      /^(?=.*[0-9]).*$/,
      'Le mot de passe doit contenir au moins un nombre',
    )
    .required('Le mot de passe est requis'),
  genre: yup
    .string()
    .oneOf(['homme', 'femme', 'autre', 'non précisé'], 'Le genre est invalide')
    .required('Le genre est requis'),
  languages: yup.array().of(yup.string()).required('La langue est requise'),
});

export const registerUserSchemaHeaders = yup.object().shape({
  'accept-language': yup.string().required('La locale est requise'),
});
