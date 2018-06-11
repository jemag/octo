import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';
import {BehaviorHandlerFactory} from '@app/map/utils';
import {TimeHandler} from '@app/map/utils';
import {cloneDeep} from 'lodash';
import {MapState} from '@app/map/store';
import {selectBehaviorState} from '@app/map/store/selectors/behavior.selectors';

@Component({
  selector: 'app-time-behavior',
  templateUrl: './time-behavior.component.html',
  styleUrls: ['./time-behavior.component.css']
})
export class TimeBehaviorComponent implements OnInit, OnDestroy {
  behavior: any;
  currentDate: Date;

  constructor(private store: Store<MapState>, private translateService: TranslateService) {
  }

  private _behaviorUniqueId: string;

  get behaviorUniqueId(): string {
    return this._behaviorUniqueId;
  }

  @Input()
  set behaviorUniqueId(id: string) {
    this._behaviorUniqueId = id;
    this.store.select(selectBehaviorState).subscribe((behaviorState) => {
      const behaviorStateCopy = cloneDeep(behaviorState);
      this.behavior = behaviorStateCopy.behaviors.find(b => b.uniqueId === this._behaviorUniqueId);
      if (this.behavior != null) {
        this.currentDate = this.behavior.currentDate;
      }
    });
  }

  onNowClick() {
    const bH = <TimeHandler>BehaviorHandlerFactory.getBehaviorHandler(this.behavior.handler, this.store);
    bH.toggleNow(this.behavior);
  }

  onCloseDatetimePicker() {
    this.behavior.currentDate = this.currentDate;
    const bH = <TimeHandler>BehaviorHandlerFactory.getBehaviorHandler(this.behavior.handler, this.store);
    bH.setNowOff(this.behavior);
    bH.updateDateTime(this.behavior);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}