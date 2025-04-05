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

export interface Service {
  name: string
  icon: string
  description: string
  frequencies: {
    [key: string]: string
  }
}

export interface ServiceMetric {
  value: number | string
  unit: string
  description: string
}

export interface ServiceMetrics {
  [key: string]: {
    [key: string]: {
      [key: string]: ServiceMetric
    }
  }
}

export interface State {
  [key: string]: any
  selectedServices: {
    [key: string]: string | null
  }
  activeMetricTab: string
  expandedService: string | null
  serviceDetails: {
    [key: string]: {
      description: string
      frequencies: {
        [key: string]: string
      }
    }
  }
  serviceMetrics: ServiceMetrics
  services: Service[]
  frequencies: string[]
  pricingData: {
    [key: string]: number
  }
  metricIcons: {
    [key: string]: string
  }
}

export interface Action {
  type: string
  url?: string
}
