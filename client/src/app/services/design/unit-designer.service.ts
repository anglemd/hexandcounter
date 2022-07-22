import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, Subject, BehaviorSubject } from 'rxjs';
import { tap, map, catchError, take, share } from 'rxjs/operators';
import { IUnitJson } from 'src/app/entities/units/unit.interface';
import { UnitEditor } from 'src/app/entities/units/unit-editor/unit-editor.class';

@Injectable({
  providedIn: 'root',
})
export class UnitDesignerService {
  private _foundUnits: Array<UnitEditor> = [];
  private _lastNewMarkerId: string = '';

  constructor(private http: HttpClient) {}

  findUnitByOidOrMarkerId$(id: string) {
    return this.http.get('api/units/' + id);
  }

  findAllMatchingUnits$(term: string) {
    if (!term || term.trim() == '') term = '(.)';
    console.log(term);
    return this.http.get('api/units/match/' + encodeURIComponent(term)).pipe(
      take(1),
      catchError((err) => {
        return [];
      }),
      map((res) => {
        console.log(res);
        return (res || []) as Array<IUnitJson>;
      }),
      map((res) => {
        return res.map((u) => new UnitEditor(u, this));
      }),
      tap((ueArr) => {
        this._foundUnits = ueArr;
      }),
      share() // PLACE THIS LAST SO MULTIPLE THINGS ON TEMPLATE ALL GET SAME OBSERVABLE...
    );
  }

  saveUnitEdits$(id: string, unitJson: IUnitJson) {
    return this.http.patch('api/units/' + id, unitJson);
  }

  createNewUnit$(unitJson: IUnitJson) {
    this._lastNewMarkerId = unitJson.markerId;
    return this.http.post('api/units', unitJson);
  }

  public getNextAvailableMarkerId(startMarkerId: string): string {
    let isDone = false;
    let testId = startMarkerId;
    do {
      testId = this.incrementMarkerId(testId);
      if (!this.doesMarkerIdExist(testId)) {
        isDone = true;
      }
      console.log(testId, isDone);
    } while (isDone != true);

    return testId;
  }

  public doesMarkerIdExist(markerId: string): boolean {
    let markerIdArr: string[] = this._foundUnits.map((ue) => ue.markerId);
    return markerIdArr.includes(markerId);
  }

  private incrementMarkerId(markerId: string): string {
    let vals = markerId.split('.');
    let wasIncremented = false;
    vals.reverse();
    vals.forEach((val: string, i: number) => {
      if (!wasIncremented) {
        let num = parseInt(val);
        if (num == undefined) {
          wasIncremented = true;
          return;
        }
        if (num >= 20) {
          vals[i] = '01';
          return;
        }
        wasIncremented = true;
        num += 1;
        vals[i] = num.toString();
        if (vals[i].length == 1) vals[i] = '0' + vals[i];
      }
    });
    vals.reverse();
    let markerId2 = vals.join('.');
    return markerId2;
  }
}
