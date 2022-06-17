import {Component, OnInit} from '@angular/core';
import {Oder} from '../../model/oder';
import {OderService} from '../service/oder.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-oder',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order: Oder;

  constructor(private oderService: OderService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

}
