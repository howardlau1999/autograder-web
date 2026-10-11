import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';

// Minimal stand-in for ActivatedRoute. Components in this app read ids from
// their own route or from one or two levels of parent routes, so the stub
// exposes the same params at every level.
export interface ActivatedRouteStub {
  paramMap: Observable<ParamMap>;
  params: Observable<Record<string, string>>;
  queryParamMap: Observable<ParamMap>;
  snapshot: { paramMap: ParamMap; params: Record<string, string> };
  parent: ActivatedRouteStub | null;
}

export function activatedRouteStub(
  params: Record<string, string> = {},
  depth = 2,
): ActivatedRouteStub {
  const paramMap = convertToParamMap(params);
  return {
    paramMap: of(paramMap),
    params: of(params),
    queryParamMap: of(convertToParamMap({})),
    snapshot: { paramMap, params },
    parent: depth > 0 ? activatedRouteStub(params, depth - 1) : null,
  };
}

export function provideActivatedRouteStub(params: Record<string, string> = {}) {
  return { provide: ActivatedRoute, useValue: activatedRouteStub(params) };
}
