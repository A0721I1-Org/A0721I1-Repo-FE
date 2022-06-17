
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
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



  selectImg: any;
  imgVip = "https://accounts.viblo.asia/assets/webpack/profile_default.0bca52a.png";

  createFeedbackForm: FormGroup = new FormGroup({
    contentFeedback: new FormControl('',[Validators.required]),
    namePeopleFeedback: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s\\W|_]+")]),
    emailPeopleFeedback: new FormControl('', [Validators.required, Validators.email]),
    imageFeedback: new FormControl('', [Validators.required])
  })

  constructor(private feedBackService: FeedbackService,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) { }

  validation_messages = {
    contentFeedback: [
      {type: 'required', message: 'Phản hồi không được để trống'}
    ],
    namePeopleFeedback: [
      {type: 'required', message: 'Tên không được để trống'},
      {type: 'pattern', message: 'Tên không đúng định dạng'}
    ],
    emailPeopleFeedback: [
      {type: 'required', message: 'Email không được để trống'},
      {type: 'email', message: 'Email không đúng định dạng'}
    ],
    imageFeedback: [
      {type: 'required', message: 'Hình ảnh không được để trống'}
    ]

  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.createFeedbackForm.value);
    const nameImg = this.getCurrentDateTime() + this.selectImg.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectImg).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.createFeedbackForm.patchValue({imageFeedback: url});


          this.feedBackService.saveFeedback(this.createFeedbackForm.value).subscribe(() => {
            this.router.navigateByUrl('/').then(r => alert("Thêm mới phản hồi thành công!"));
          })
        });
      })
    ).subscribe();

  }

  showPreview(event: any) {
    this.selectImg = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectImg);
    reader.onload = e => {
      console.log(e);
      this.imgVip = reader.result as string;
    };
  }
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyy-hh-mm-ssa', 'en-US');
  }

}
