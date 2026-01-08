import { AllocationDto } from './allocation.dto'

export class AllocationCollectionDto {
  id: number
  name: string
  allocations: AllocationDto[]

  constructor(id: number, name: string, allocations: AllocationDto[]) {
    this.id = id
    this.name = name
    this.allocations = allocations
  }
}
