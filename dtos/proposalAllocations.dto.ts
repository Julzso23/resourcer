import { AllocationCollectionDto } from './allocationCollection.dto'

export class ProposalAllocationsDto {
  collections: AllocationCollectionDto[]

  constructor(collections: AllocationCollectionDto[]) {
    this.collections = collections
  }
}
