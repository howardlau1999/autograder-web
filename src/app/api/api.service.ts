import {Injectable} from '@angular/core';
import {AutograderServiceClient} from "./proto/api_pb_service";
import {GetCourseListRequest, GetCourseListResponse, LoginRequest} from "./proto/api_pb";
import {grpc} from "@improbable-eng/grpc-web";
import {AsyncSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  autograderClient = new AutograderServiceClient("http://localhost:9315");

  constructor() {}

  getCourseList() {
    const request = new GetCourseListRequest();
    request.setUserId(0);
    const a = new AsyncSubject<GetCourseListResponse>();
    this.autograderClient.getCourseList(request, (err, response) => {
      if (err !== null || response === null) {
        a.error(err);
        return;
      }
      a.next(response);
      a.complete();
    });
    return a.asObservable();
  }
}
