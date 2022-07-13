export interface ISite {
  _id: string
  data: Data
  routes?: Route
  client: string
  type: string
}
export interface Data {
  title: string;
  domain: string;
  logo: string;
  icon: string;
  imageSrc: string;
  imageAlt: string;
  numberPhone: number;
  address: string;
  location: string;
  description: string;
}

export interface Route {
  section_level_0: Section0[];
}

export interface Section {
  id: string;
  name: string;
  href: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  Items: Item[];
  featured:Featured[];
}

export interface Section0 extends Section {
  // section_level_1: Section
}
export interface Featured {
  id: string;
  name: string;
  href: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}
export interface Item {
  id: string;
  name: string;
  href: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}