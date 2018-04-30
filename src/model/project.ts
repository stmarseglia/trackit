import {Moment} from "moment";

export class Project {
  constructor (
    public name: String,
    public customer: String,
    public timeSpent: Moment,
    public isTracked: boolean
  ) {}
}
