export class AllocationDto {
  id: number;
  name: string;
  percent: number;
  start: Date;
  end: Date;

  constructor(id: number,
    name: string,
    percent: number,
    start: Date,
    end: Date,
  ) {
    this.id = id;
    this.name = name;
    this.percent = percent;
    this.start = start;
    this.end = end;
  }
}
