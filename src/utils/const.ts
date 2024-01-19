import type { Banner } from './types'

export const defaultBanners: Banner[] = [
  {
    id: 'standard-room',
    title: 'Standard Room',
    subtitle: '1 full bed',
    list: 'Private Bathroom,Mini Refrigerator,Flat screen TV,Hairdryer,Free Wifi',
    price: {
      preText: '',
      amount: 99,
      per: 'Night'
    },
    image: 'https://cdn.pixabay.com/photo/2021/11/08/00/30/bedroom-6778193_1280.jpg',
    action: {
        type: 'openUrl',
        url: 'https://www.google.com'
    },
    pop: false
  },
  {
    id: 'double-room',
    title: 'Double Room',
    subtitle: '2 full beds',
    list: 'Private Bathroom,Mini Refrigerator,Flat screen TV,Hairdryer,Free Wifi',
    price: {
      preText: '',
      amount: 139,
      per: 'Night'
    },
    image: 'https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_1280.jpg',
    action: {
        type: 'openUrl',
        url: 'https://www.facebook.com'
    },
    pop: true
  },
  {
    id: 'king-room',
    title: 'King Room',
    subtitle: '1 king bed',
    list: 'Private Bathroom,Mini Refrigerator,Flat screen TV,Hairdryer,Free Wifi',
    price: {
      preText: '',
      amount: 159,
      per: 'Night'
    },
    image: 'https://cdn.pixabay.com/photo/2016/12/30/07/55/bedroom-1940169_1280.jpg',
    action: {
        type: 'openUrl',
        url: 'https://www.x.com'
    },
    pop: false
  }
]

export const defaultStyles = {
  headlineFont: 'Inter',
  contentFont: 'Inter',
  buttonColor: '#000000',
  bulletColor: '#000000',
  theme: 'table'
}

export const defaultOptions = {
  currency: 'USD'
}

export const googleFonts = [
  'Roboto',
  'Open Sans',
  'Noto Sans JP',
  'Montserrat',
  'Lato',
  'Poppins',
  'Roboto Condensed',
  'Inter',
  'Roboto Mono',
  'Oswald',
  'Raleway',
  'Noto Sans',
  'Nunito Sans',
  'Roboto Slab',
  'Ubuntu',
  'Nunito',
  'Playfair Display',
  'Merriweather',
  'Rubik',
  'PT Sans',
  'Kanit',
  'Arial',
  'Times',
  'Palatino',
  'Garamond'
]

export const currencies = [
  {
    symbol: '$',
    label: 'USD',
    value: 'USD',
  },
  {
    symbol: 'CA$',
    label: 'CAD',
    value: 'CAD',
  },
  {
    symbol: '€',
    label: 'EUR',
    value: 'EUR',
  },
  {
    symbol: '₹',
    label: 'INR',
    value: 'INR',
  }
]
