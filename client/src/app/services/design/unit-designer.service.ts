import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, Subject, BehaviorSubject } from 'rxjs';
import { tap, map, catchError, take } from 'rxjs/operators';
import { IUnitJson } from 'src/app/entities/units/unit.interface';

@Injectable({
  providedIn: 'root',
})
export class UnitDesignerService {
  constructor(private http: HttpClient) {}

  findUnitByOidOrMarkerId$(id: string) {
    return this.http.get('api/units/' + id);
  }

  findAllMatchingUnits$(term: string) {
    return this.http.get('api/units/match/' + encodeURIComponent(term));
  }

  saveUnitEdits$(id: string, unitJson: IUnitJson) {
    return this.http.patch('api/units/' + id, unitJson);
  }

  createNewUnit$(unitJson: IUnitJson) {
    return this.http.post('api/units', unitJson);
  }
}
