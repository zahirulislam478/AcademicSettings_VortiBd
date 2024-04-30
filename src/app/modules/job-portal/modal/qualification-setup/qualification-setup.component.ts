import { Component, OnInit, Inject } from '@angular/core';
import { JobPortalService } from '../../job-portal.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-qualification-setup',
  templateUrl: './qualification-setup.component.html',
  styleUrls: ['./qualification-setup.component.scss'],
})
export class QualificationSetupComponent implements OnInit {
  data: any;
  errorMessage: string = null;

  constructor(
    private _jobPortalService: JobPortalService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private matSnackBar: MatSnackBar,
    public _matDialog: MatDialogRef<QualificationSetupComponent> // Inject MatDialogRef
  ) {}

  ngOnInit(): void {
    this.data = this.dialogData;
    console.log('Received data: ', this.data);
    this.fetchData();
  }

  fetchData(): void {
    this._jobPortalService.GetQulificationSetup(this.data.CircularId).subscribe(
      (response) => {
        console.log('Response data: ', response.data);
        this.data = response.data;
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  getReadableExamName(examName: string): string {
    return examName.replace(/_/g, ' ');
  }

  saveData(): void {
    console.log('Current data: ', this.data);

    // Map over the data array and replace null values with false
    this.data = this.data.map((item) => {
      if (item.ExamName === null) {
        item.ExamName = false;
      }
      return item;
    });

    this._jobPortalService.SaveQulificationSetup(this.data).subscribe(
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
    this._matDialog.close(); // Close the dialog
  }
}
