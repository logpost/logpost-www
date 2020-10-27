export interface InputComponentInterface {
  name?: string
  value?: string
  labelTH: string
  labelEN: string
  labelSize?: string
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  description?: string
  type?: string
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
  submitForm: (profile:ProfileInterface) => void
}

export interface ProfileHeaderInterface {
  displayName: string
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