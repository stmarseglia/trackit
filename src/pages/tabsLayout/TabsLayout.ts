import { Component } from "@angular/core";

import { ManagePage } from "../manage/manage";
import { QueryPage } from "../query/query";
import { TrackPage } from "../track/track";

@Component({
  templateUrl: 'tabs-layout.html'
})
export class TabsLayout {

  manageTab = ManagePage;
  trackTab = TrackPage;
  queryTab = QueryPage;

  public constructor() {}
}
