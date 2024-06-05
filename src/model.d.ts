type RootStackParamList = {
  Dashboard: undefined;
  Login: undefined;
  CompanyProfile: {entrepriseId: number, entrepriseNom: string};
}

//enterprise types
interface Link {
  href: string;
}

interface Entreprise {
  id: number;
  nom: string;
  logo: string;
  phone: string;
  // _links: {
  //   self: Link;
  // };
}

interface Embedded {
  entrepriseDTOModelList: Entreprise[];
}

interface RootLinks {
  collection: Link;
}


export interface entrepriseListType {
  _embedded: Embedded;
  _links: RootLinks;
}

//geolocation types
interface LinkDetails {
  href: string;
  hreflang?: string;
  title?: string;
  type?: string;
  deprecation?: string;
  profile?: string;
  name?: string;
  templated?: boolean;
}

interface Links {
  additionalProp: LinkDetails;
  additionalProp2: LinkDetails;
  additionalProp3: LinkDetails;
}

interface geolocationListType {
  id: number;
  // editeurId: number;  
  entrepriseId: number;
  longitude: number;
  latitude: number;
  photo: string;
  adresse: string;
  laDate: string;
  commentaire: string;
  interlocuteurNom: string;
  interlocuteurEmail: string;
  interlocuteurPhone: string;
  // _links?: Links;
}
