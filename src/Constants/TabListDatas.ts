import { ValidatesDatasErrors, NavBarIcons } from '@/Constants/Type';

// Tab values For Application
export const LoginTabFieldDatas = [
  {
    from: 'Login',
    label: 'Email',
    id: 0,
    type: 'email',
    placeholder: 'cherubin@gmail.com',
    secure: false,
    checked: true,
    errorType: ValidatesDatasErrors.LOGEMAIL,
  },
  {
    from: 'Login',
    label: 'Mot de passe',
    id: 1,
    type: 'password',
    placeholder: '*********',
    secure: true,
    checked: false,
    errorType: ValidatesDatasErrors.NONE,
  },
];

export const RegTabValue = [
  {
    from: 'Register',
    label: 'Nom complet',
    id: 0,
    type: 'none',
    placeholder: 'Cherubin Mahamba',
    secure: false,
    checked: true,
    errorType: ValidatesDatasErrors.NAME,
  },
  {
    from: 'Register',
    label: 'Email',
    id: 1,
    type: 'Email',
    placeholder: 'cherubin@gmail.com',
    secure: false,
    checked: true,
    errorType: ValidatesDatasErrors.REGEMAIL,
  },
  {
    from: 'Register',
    label: 'Téléphone',
    id: 2,
    type: 'text',
    placeholder: '+243 973 668 210',
    secure: false,
    checked: true,
    errorType: ValidatesDatasErrors.PHONE,
  },
];

export const NewUserTab = [
  {
    title: 'Clients',
    illustration: '/illustrations/clients.svg',
    description:
      "Création des comptes utilisateurs de type client pour les bailleurs des parcelles, offrant ainsi une gestion facilitée de leurs compteurs d'eau et de leurs informations associées.",
    link: '/Auth/New/Client',
  },
  {
    title: 'Vendeurs',
    illustration: '/illustrations/dealers.svg',
    description:
      'Création des comptes utilisateurs de type vendeur pour les points de vente, permettant une gestion optimale des transactions et des approvisionement en eau des clients.',
    link: '/Auth/New/Dealer',
  },
];

export const ConfigurationAccountTaabValue = [
  {
    from: 'Register',
    label: 'Téléphone',
    id: 4,
    type: 'text',
    placeholder: '+243 973 668 210',
    secure: false,
    checked: true,
    errorType: ValidatesDatasErrors.PHONE,
  },
  {
    from: 'Register',
    label: 'Année de naissance',
    id: 5,
    type: 'number',
    placeholder: '2005',
    secure: false,
    checked: true,
    errorType: ValidatesDatasErrors.BIRTHYEAR,
  },
];

export const ResetTabValues = [
  {
    from: 'Reset',
    label: 'Mot de pass',
    id: 0,
    type: 'password',
    placeholder: '**********',
    secure: true,
    checked: true,
    errorType: ValidatesDatasErrors.STRONGPASSWORD,
  },
  {
    from: 'Reset',
    label: 'Confirmation mot de pass',
    id: 1,
    type: 'password',
    placeholder: '**********',
    secure: true,
    checked: true,
    errorType: ValidatesDatasErrors.CONFIRMRESETPWD,
  },
];

//Auth Datas
export const MenuTab = [
  {
    label: 'Clients',
    isRoute: true,
    icone: NavBarIcons.USER,
    route: '/Auth/Home',
  },

  {
    label: 'Vendeurs',
    isRoute: true,
    icone: NavBarIcons.DEALER,
    route: '/Auth/Dealers',
  },
  {
    label: 'Recherche',
    isRoute: true,
    icone: NavBarIcons.SEARCH,
    route: '/Auth/Search',
  },
  {
    label: 'Nouveau',
    isRoute: false,
    icone: NavBarIcons.NEW,
    route: '/Auth/New',
  },
];

export const SystemMessages = {
  Errors: {
    invalidEmail: "Format de l'email invalide, ex: cherubin@gmail.com ",
    invalidName: 'Format du nom invalide, ex: Elie Ruvinga',
    InvalidStrongPassword:
      'Au moins 8 caractères, Majuscules, Muniscules et des Caractères speciaux [@#$%&{}...]',
    inValidPassword: 'Les mots de passes ne correspondent pas',
    inValidPhoneNumber: 'Numéro de téléphone incorrect (+)',
    invalidBirthDay: "votre âge n'est pas accepté",
  },
  Success: {},
};
