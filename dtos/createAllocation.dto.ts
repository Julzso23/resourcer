export class CreateAllocationDto {
  staffMemberId: number
  projectId: number
  percentage: number
  start: Date
  end: Date
  createdInId: number
  projectView: boolean

  constructor(
    staffMemberId: number,
    projectId: number,
    percentage: number,
    start: Date,
    end: Date,
    createdInId: number,
    projectView: boolean,
  ) {
    this.staffMemberId = staffMemberId
    this.projectId = projectId
    this.percentage = percentage
    this.start = start
    this.end = end
    this.createdInId = createdInId
    this.projectView = projectView
  }
}
