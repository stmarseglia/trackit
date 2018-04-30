import { Component} from "@angular/core";
import { Project } from "../../model/project";
import * as moment from "moment";
import { BackgroundMode } from "@ionic-native/background-mode";
import { Config } from "../../config/config";
import * as _ from "lodash";

@Component({
  templateUrl: 'track.html'
})
export class TrackPage {

  public projectsArray: Array<{customer: string, projects: Array<Project>}> = new Array();
  private timer: any;

  public constructor(private backgroundMode: BackgroundMode) {

    let projectArray: Array<any> = this.stubGetProjects();

    this.projectsArray = this.groupByProject(projectArray);

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

  private getTracked(): Project {
    let result: Array<any> = this.projectsArray.map((item) => item.projects);
    result = _.flatten(result).filter(project => project.isTracked);
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

  private groupByProject(projects: Array<any>): Array<any> {
    let resultArray = new Array<Object>();

    let grouped = _.groupBy(projects, (proj) => proj.customer);

    for (let customer in grouped) {
      resultArray.push({
        customer: customer,
        projects: grouped[customer]
      });
    }

    return _.sortBy(resultArray, ['customer']);
  }

  private stubGetProjects() {
    return [
      new Project("Assetwatch", "e-geos", moment.utc("00:00:00", "HH:mm:ss"), false),
      new Project("SEonSE", "e-geos", moment.utc("00:00:00", "HH:mm:ss"), false),
      new Project("Follow.Me", "AAL", moment.utc("00:00:00", "HH:mm:ss"), false)
    ]
  }
}

