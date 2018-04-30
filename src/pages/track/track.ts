import { Component} from "@angular/core";
import { Project } from "../../model/project";
import * as moment from "moment";
import { BackgroundMode } from "@ionic-native/background-mode";
import { Config } from "../../config/config";

@Component({
  templateUrl: 'track.html'
})
export class TrackPage {

  public projects: Project[] = new Array<Project>();
  private timer: any;

  public constructor(private backgroundMode: BackgroundMode) {
    this.projects.push(new Project("project1", "customer1", moment.utc("00:00:00", "HH:mm:ss"), false));
    this.projects.push(new Project("project2", "customer1", moment.utc("00:00:00", "HH:mm:ss"), false));
    this.projects.push(new Project("project3", "customer2", moment.utc("00:00:00", "HH:mm:ss"), false));
  };

  public toggle(project: Project): void {

    let currentTrackedProject = this.getTracked();

    if (project.isTracked) this.untrackProject(project, true);
    else {
      /* No project is being tracked, the clicked project should be tracked */
      if (currentTrackedProject) this.untrackProject(currentTrackedProject, false);

      this.trackProject(project);
    }
  }

  private getTracked() {
    let result = this.projects.filter(project => project.isTracked);
    if (result.length>0) return result[0];
    else return null;
  }

  private trackProject(project: Project): void {

    this.backgroundMode.setDefaults({
      title: "TrackIT",
      text: `Are you still working on ${project.name}?`,
      hidden: false
    });

    this.backgroundMode.enable();

    project.isTracked = true;

    this.timer = setInterval(() => {
      // console.log(`${project.name} - ${project.timeSpent.format("HH:mm:ss")}`);
      project.timeSpent.add(Config.TRACK_INTERVAL_SECONDS, 's');
    }, Config.TRACK_INTERVAL_SECONDS * 1000);
  }

  private untrackProject(project: Project, disableBackground: boolean): void {

    if (this.backgroundMode.isEnabled() && disableBackground) this.backgroundMode.disable();

    project.isTracked = false;
    clearInterval(this.timer);
  }
}

