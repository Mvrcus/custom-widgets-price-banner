export interface Banner {
  id: string
  title: string
  subtitle: string
  list: string
  price: Price
  image?: string
  action: Action
  pop: boolean
}

export interface Price {
  preText: string
  amount: number
  per: string
}

export interface SettingOption {
  label: string
  value: string | number
}

export interface State {
  [key: string]: Banner[] | string | number | boolean
}

export interface Action {
    type: string
    url?: string
}
