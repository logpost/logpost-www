export interface ShipperProfileInterface {
  username: string
  password: string
  name: string
  displayName: string
  email: string
}

export interface InputProperties {
  name?: string
  value?: string
  labelTH: string
  labelEN: string
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  description?: string
  type?: string
}