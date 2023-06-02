import { ServiceType } from '@/constants/serviceType'

export type ServiceType = typeof ServiceType
export type ServiceTypes = ServiceType[keyof ServiceType]
