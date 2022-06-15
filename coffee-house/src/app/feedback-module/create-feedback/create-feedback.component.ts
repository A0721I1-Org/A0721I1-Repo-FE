import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {FeedbackService} from "../service/feedback.service";
import {Router} from "@angular/router";
import {formatDate} from "@angular/common";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.css']
})
export class CreateFeedbackComponent implements OnInit {

  selectImg: any = null;

  createFeedbackForm: FormGroup = new FormGroup({
    contentFeedback: new FormControl(),
    namePeopleFeedback: new FormControl(),
    emailPeopleFeedback: new FormControl(),
    imageFeedback: new FormControl()
  })

  constructor(private feedBackService: FeedbackService,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  showPreview(event: any) {
    this.selectImg = event.target.file[0];
  }

  onSubmit() {
    const nameImg = this.getCurrentDateTime() + this.selectImg.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectImg).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.createFeedbackForm.patchValue({imgFeedback: url});


          this.feedBackService.saveFeedback(this.createFeedbackForm.value).subscribe(() => {
            this.router.navigateByUrl('/').then(r => alert("Thêm mới phản hồi thành công!"));
          })
        });
      })
    ).subscribe();

  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
}
