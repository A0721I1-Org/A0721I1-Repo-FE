import { Component, OnInit } from '@angular/core';
import {IncomeService} from '../service/income.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  totalOrderToDay: number;
  totalOrderToWeek: number;
  totalOrderToMonth: number;
  totalOrderToYear: number;
  totalOrderDayToDay: number;
  constructor(
    private incomeService: IncomeService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  /* Get all */
  getAll() {
    this.getIncomeToDay();
    this.getIncomeToWeek();
    this.getIncomeToMonth();
    this.getIncomeToYear();
  }

  /* Get income today */
  getIncomeToDay() {
    this.incomeService.sumTotalOrderDay().subscribe(data => {
      this.totalOrderToDay = data;
    });
  }
  /* Get income Week */
  getIncomeToWeek(){
    this.incomeService.sumTotalOrderWeek().subscribe(data => {
      this.totalOrderToWeek = data;
    });
  }

  /* Get income Month */
  getIncomeToMonth(){
    this.incomeService.sumTotalOrderMonth().subscribe(data => {
      this.totalOrderToMonth = data;
    });
  }

  /* Get income Year */
  getIncomeToYear(){
    this.incomeService.sumTotalOrderYear().subscribe(data => {
      this.totalOrderToYear = data;
    });
  }

  /* Get income day to day */
  // getIncomeDayToDay(){
  //
  // }
}
