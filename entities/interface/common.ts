export interface InputComponentInterface {
  name?: string
  value?: string
  labelTH: string
  labelEN: string
  labelSize?: string
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  description?: string
  type?: string
  classifier?: string
}

export interface ProfileInterface {
  account_type: string
  username: string
  password: string
  name: string
  displayName?: string
  email: string
}

export interface SignUpFormInterface {
  role: string
  submitForm: (profile: ProfileInterface) => void
}

export interface ProfileJobStatusInterface {
  title: string
  buttonText: string
  items: {
    name: string
    icon: JSX.Element
    noOfJobs?: number
  }[]
}

export interface ToggleComponentInterface {
  toggle: boolean
  setToggle: (toggle: boolean) => void
}

 export interface JobDetailsInterface {
  pickup_location?: string
  dropoff_location?: string
  pickup_date?: string
  dropoff_date?: string
  product_type?: string
  weight?: number
  waiting_time?: number
  offer_price?: number
  description?: string
  truck?: {
    wheel?: number
    options?: string
    age?: number
    driver_license_type?: string
  }
}

export interface JobAddInterface {
  details: JobDetailsInterface
  setDetails: (details: JobDetailsInterface) => void
}
