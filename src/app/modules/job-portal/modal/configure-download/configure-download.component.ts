import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { JobPortalService } from '../../job-portal.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-configure-download',
  templateUrl: './configure-download.component.html',
  styleUrls: ['./configure-download.component.scss'],
})
export class ConfigureDownloadComponent implements OnInit {
  @ViewChild('signImage') mySignPhotoInputVariable: ElementRef;
  configureDownloadsForm: FormGroup;
  signFilename: string = null;
  signBase64File: string = null;
  errorMessage: string = null;
  signImageUrl: any = '/assets/images/signature.png';
  Editor = ClassicEditor;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private changeDetector: ChangeDetectorRef,
    private _jobPortalService: JobPortalService,
    private _matDialog: MatDialogRef<ConfigureDownloadComponent>
  ) {}

  ngOnInit(): void {
    console.log('Received data: ', this.data);
    this.configureDownloadsForm = this.formBuilder.group({
      confirmationSMSCtrl: [false],
      smsTemplateCtrl: [''],
      instantAdmitCardCtrl: [false],
      admitTemplateTextCtrl: [''],
      signatureOnAdmitCardCtrl: [''],
      signatureDesignationCtrl: [''],
      applicantCVCtrl: [false],
      cvTemplateCtrl: [''],
      examScheduleOnAdmitCardCtrl: [false],
      uploadSignatureCtrl: [''],
      applyDeclaration: [''],
      admitCardInstructions: [''],
      admitCardAvailableForDownloadCtrl: [''],
      signature: [false],
      signatureLabel: [''],
      admitCardAvailableDateCtrl: [''],
    });
  }

  handleSignPhotoFileInput(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (this.isFileSizeValid(file)) {
        this.loadImage(file);
      } else {
        this.showSnackBar('File Size Limit is 100 Kilobytes(KB)!');
        this.resetSignPhotoInput();
      }
    }
  }

  isFileSizeValid(file): boolean {
    return file.size <= 102400;
  }

  loadImage(file) {
    const signImg = new Image();
    signImg.src = window.URL.createObjectURL(file);
    signImg.onload = () => {
      if (this.isImageDimensionValid(signImg)) {
        this.readFile(file);
      } else {
        this.showSnackBar(
          'Image Can Not Exceed Height of 80px & Width of 300px!'
        );
        this.resetSignPhotoInput();
      }
    };
    this.changeDetector.markForCheck();
  }

  isImageDimensionValid(image): boolean {
    return image.width <= 300 && image.height <= 80;
  }

  readFile(file) {
    const signReader = new FileReader();
    signReader.readAsDataURL(file);
    signReader.onload = () => {
      this.signImageUrl = signReader.result;
      this.signBase64File = (<string>signReader.result).split(',')[1];
      this.signFilename = file.name;
    };
  }

  showSnackBar(message: string): void {
    this.matSnackBar.open(message, 'Close', {
      verticalPosition: 'top',
      duration: 200000,
    });
  }

  resetSignPhotoInput(): void {
    this.mySignPhotoInputVariable.nativeElement.value = '';
    this.removeSignPhotoFile();
  }

  removeSignPhotoFile(): void {
    this.signBase64File = null;
    this.signFilename = null;
    this.signImageUrl = '/assets/images/signature.png';
  }

  onSubmit() {
    if (this.configureDownloadsForm.valid) {
      console.log(this.configureDownloadsForm.value);
      this.configureDownloadsForm.reset();
    }

    let body = {
      id: 2005,
      applyInstructions: '',
      alertSMSAfterApply: true,
      smsTemplate: '',
      admitCard: true,
      admitCardTemplate: '',
      admitCardAvailableFrom: '2024-01-30T09:02:55.662Z',
      admitCardExamSchedule: true,
      admitCardInstructions: '',
      admissionForm: true,
      admissionFormTemplate: '',
      idCard: true,
      idCardTemplate: '',
      transportCard: true,
      transportCardTemplate: '',
      libraryCard: true,
      libraryCardTemplate: '',
      signature: true,
      signaturePath: '',
      signatureLabel: '',
      videoUrl: '',
      applyDeclaration: '',
      admitSignName: '',
      applicantCV: true,
      applicantCVTemplate: '',
    };

    // let body = {
    //   id: this.data.CircularId,
    //   alertSMSAfterApply: this.configureDownloadsForm.get('confirmationSMSCtrl')
    //     .value,
    //   smsTemplate: this.configureDownloadsForm.get('smsTemplateCtrl').value,
    //   admitCard: this.configureDownloadsForm.get('instantAdmitCardCtrl').value,
    //   admitCardTemplate: this.configureDownloadsForm.get(
    //     'admitTemplateTextCtrl'
    //   ).value,
    //   admitCardAvailableFrom: this.configureDownloadsForm.get(
    //     'admitCardAvailableForDownloadCtrl'
    //   ).value,
    //   admitCardExamSchedule: this.configureDownloadsForm.get(
    //     'examScheduleOnAdmitCardCtrl'
    //   ).value,
    //   admitCardInstructions: this.configureDownloadsForm.get(
    //     'admitCardInstructions'
    //   ).value,
    //   admissionForm: true,
    //   admissionFormTemplate: '',
    //   idCard: false,
    //   idCardTemplate: '',
    //   transportCard: false,
    //   transportCardTemplate: '',
    //   libraryCard: false,
    //   libraryCardTemplate: '',
    //   signature: this.configureDownloadsForm.get('signature').value,
    //   signaturePath: '',
    //   signatureLabel: this.configureDownloadsForm.get('signatureLabel').value,
    //   videoUrl: false,
    //   applyDeclaration:
    //     this.configureDownloadsForm.get('applyDeclaration').value,
    //   admitSignName: this.configureDownloadsForm.get('signatureLabel').value,
    //   applicantCV: this.configureDownloadsForm.get('applicantCVCtrl').value,
    //   applicantCVTemplate:
    //     this.configureDownloadsForm.get('cvTemplateCtrl').value,
    // };
    console.log(body, 'body');

    this._jobPortalService.UpdateCircularConfig(body).subscribe(
      (data: any) => {
        console.log(data, 'data');
        if (data.isError == false) {
          this.matSnackBar.open('Circular Config Saved', 'Close', {
            verticalPosition: 'top',
            duration: 2000,
          });
          this._matDialog.close('call_InitialPage');
        } else {
          this.matSnackBar.open(
            "Couldn't Save Information, Please Try Again",
            'Close',
            {
              verticalPosition: 'top',
              duration: 2000,
            }
          );
        }
      },
      (error: any) => {
        this.errorMessage = error.message;
        this.matSnackBar.open(
          "Couldn't Save Information, Please Try Again",
          'Close',
          {
            verticalPosition: 'top',
            duration: 2000,
          }
        );
        console.log(error, 'error');
      }
    );
  }
}
