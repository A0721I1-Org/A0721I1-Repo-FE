import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Table} from '../../model/table';
import {Status} from '../../model/status';
import {TableService} from '../service/table.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StatusService} from '../service/status.service';
import {Subscription} from 'rxjs';

// @ts-ignore
@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {
  private subscription: Subscription| undefined;
  table: Table;
  table1: FormGroup;
  status: Status[] = [];
  constructor(
    private service: TableService,
    private activated: ActivatedRoute,
    private router: Router,

  ) {
  }
  ngOnInit(): void {
    const id = this.activated.snapshot.params.id;
    this.subscription = this.service.getById(id).subscribe(data =>
      {
      this.table = data;
    }, error => {
      console.log('errors');
      }
    );
  }
 this.product1 = new FormGroup(
    {
      id: new FormControl('', [Validators.required]),
      codeTable: new FormControl('', [Validators.required]),
      status: new FormControl('')
    }
  );

}

