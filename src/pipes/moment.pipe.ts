import { Pipe, PipeTransform} from "@angular/core";
import { Moment } from "moment";
import { Config } from "../config/config";

@Pipe({
  name: "moment",
  pure: false
})
export class MomentPipe implements PipeTransform {
  transform(value: Moment): String {
    return value.format(Config.TIMER_FORMAT);
  }
}
