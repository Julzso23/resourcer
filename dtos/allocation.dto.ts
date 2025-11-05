export class AllocationDto {
  id: number;
  name: string;
  percent: number;
  start: Date;
  end: Date;
  staffMemberId: number;
  projectId: number;

  constructor(id: number,
    name: string,
    percent: number,
    start: Date,
    end: Date,
    staffMemberId: number,
    projectId: number,
  ) {
    this.id = id;
    this.name = name;
    this.percent = percent;
    this.start = start;
    this.end = end;
    this.staffMemberId = staffMemberId;
    this.projectId = projectId;
  }
}
