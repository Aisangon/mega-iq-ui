import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AlertService, IqTestService} from '@/_services';
import {TestResult, User} from '@/_models';
import {TestStatusEnum} from '@/_models/enum';

@Component({
  selector: 'app-iq-result',
  templateUrl: './iq-result.component.html',
  styleUrls: ['./iq-result.component.scss']
})
export class IqResultComponent implements OnInit {
  test: TestResult;
  user: User;
  isLoading = false;

  constructor(
    private iqTestService: IqTestService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    const testCode = this.route.snapshot.params['testCode'];

    this.isLoading = true;

    this.iqTestService.getByCode(testCode)
      .pipe(first())
      .subscribe(
        apiResponseTestResult => {
          if (apiResponseTestResult.ok) {
            if (apiResponseTestResult.test.status === TestStatusEnum.ACTIVE) {
              this.router.navigate(['/classroom/' + apiResponseTestResult.test.code]);
            } else {
              this.test = apiResponseTestResult.test;
              this.user = apiResponseTestResult.user;
            }
          } else {
            this.alertService.error(apiResponseTestResult.msg);
          }
          this.isLoading = false;
        },
        error => {
          this.alertService.error('API Service Unavailable. ' + error);
          this.isLoading = false;
        });
  }

}
