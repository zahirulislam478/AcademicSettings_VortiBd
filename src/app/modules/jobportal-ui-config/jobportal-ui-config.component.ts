import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { JobPortalUiConfigService } from './jobportal-ui-config.service';

@Component({
  selector: 'app-jobportal-ui-config',
  templateUrl: './jobportal-ui-config.component.html',
  styleUrls: ['./jobportal-ui-config.component.scss'],
})
export class JobportalUiConfigComponent {
  ClientDropDownControl = new FormControl('');
  CirculatDropDownControl = new FormControl('');
  VisibilityDropDownControl = new FormControl('');
  RequiredDropDownControl = new FormControl('');
  StatusDropDownControl = new FormControl('');
  FromDropDownControl = new FormControl('');
  KeyNameControl = new FormControl('');
  LabelNameControl = new FormControl('');
  EimsNameControl = new FormControl('');
  DbNameControl = new FormControl('');

  schools = dummy_Ins;
  form_rd = dummy_fn;
  cir_rd = dummy_cr;
  vis_rd = dummy_vr;
  req_rd = dummy_rr;
  sta_rd = dummy_sr;

  BMI_MainForm: FormGroup;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  BatchListData: any = [];
  Circular_InstituteData: any;
  institutes: any;
  clientData: any;

  constructor(
    private _formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private _jobPortalUiConfigService: JobPortalUiConfigService
  ) {
    this.clientData = JSON.parse(localStorage.getItem('clientData'));
    this.getCircularInstituteData();
  }

  UpdateSingle(obj: FormGroup) {
    let ccc_form = obj.getRawValue();
    console.log(ccc_form, 'ccc_form');
    if (ccc_form.Required == true && ccc_form.Visible == false) {
      this.matSnackBar.open(
        'Required Fields Also Have To Be Visible',
        'Close',
        {
          verticalPosition: 'top',
          duration: 2000,
        }
      );
      return;
    }

    let body = {
      id: ccc_form.Id,
      clientId: ccc_form.ClientId,
      cloneClientId: this.ClientDropDownControl.value,
      programType: ccc_form.ProgramType,
      keyName: ccc_form.KeyName,
      labelName: ccc_form.LabelName,
      visible: ccc_form.Visible,
      required: ccc_form.Required,
      message: ccc_form.Message,
      formName: ccc_form.FormName,
    };
    console.log(body, 'body');

    this._jobPortalUiConfigService.SaveSingleUiConfig(body).subscribe(
      (data: any) => {
        console.log(data, 'data');
        if (data.isError == false) {
          this.matSnackBar.open('Data Saved', 'Close', {
            verticalPosition: 'top',
            duration: 2000,
          });
        } else {
          this.matSnackBar.open(
            'Something Went Wrong, Please Try Again',
            'Close',
            {
              verticalPosition: 'top',
              duration: 2000,
            }
          );
        }
      },
      (error: any) => {
        this.matSnackBar.open(
          'Something Went Wrong, Please Try Again',
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

  ResetSingle(obj: FormGroup) {
    let ccc_form = obj.getRawValue();
    console.log(ccc_form, 'ccc_form');

    let body = {
      id: ccc_form.Id,
      keyName: ccc_form.KeyName,
    };
    console.log(body, 'body');

    this._jobPortalUiConfigService.ResetSingleUiConfig(body).subscribe(
      (data: any) => {
        console.log(data, 'data');
        if (data.isError == false) {
          this.matSnackBar.open('Data Saved', 'Close', {
            verticalPosition: 'top',
            duration: 2000,
          });
        } else {
          this.matSnackBar.open(
            'Something Went Wrong, Please Try Again',
            'Close',
            {
              verticalPosition: 'top',
              duration: 2000,
            }
          );
        }
      },
      (error: any) => {
        this.matSnackBar.open(
          'Something Went Wrong, Please Try Again',
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

  getCircularInstituteData(): void {
    this._jobPortalUiConfigService.GetCircularClients().subscribe(
      (data: any) => {
        console.log(data, 'getCircularInstituteData');
        this.Circular_InstituteData = data.data;
        if (this.Circular_InstituteData != null) {
          this.institutes = this.Circular_InstituteData.VortiBDClients;

          if (this.clientData.User.ClientId != 0) {
            this.ClientDropDownControl.setValue(
              this.clientData.User.ClientId.toString()
            );
            this.ClientDropDownControl.disable();
          }
        }
      },
      (error: any) => {
        console.log(error, 'error');
      }
    );
  }

  SearchUiConfigs(): void {
    if (this.ClientDropDownControl.value == '') {
      this.matSnackBar.open('Please Select A Client', 'Close', {
        verticalPosition: 'top',
        duration: 2000,
      });
      return;
    }

    let body = {
      clientId: Number(this.ClientDropDownControl.value), //206,
      keyName: this.KeyNameControl.value,
      labelName: this.LabelNameControl.value,
      eimsField: this.EimsNameControl.value,
      dbField: this.DbNameControl.value,
      visible: this.VisibilityDropDownControl.value,
      required: this.RequiredDropDownControl.value,
      circularType: this.CirculatDropDownControl.value,
      status: this.StatusDropDownControl.value,
      formName: this.FromDropDownControl.value,
    };
    console.log(body, 'body');

    this._jobPortalUiConfigService.SearchUiConfig(body).subscribe(
      (data: any) => {
        console.log(data, 'data');
        if (data.isError == false) {
          this.BatchListData = data.data;

          if (this.BatchListData.length > 0) {
            let tempData = [];
            this.BatchListData.forEach((item, index) => {
              tempData.push(this.gotItem(item));
            });
            this.BMI_MainForm = this._formBuilder.group({
              items: this._formBuilder.array(tempData),
            });

            this.matSnackBar.open('Data Found', 'Close', {
              verticalPosition: 'top',
              duration: 2000,
            });
          } else {
            this.matSnackBar.open('No Data Found', 'Close', {
              verticalPosition: 'top',
              duration: 2000,
            });
          }
        } else {
          this.matSnackBar.open(
            "Couldn't Find Information, Please Try Again",
            'Close',
            {
              verticalPosition: 'top',
              duration: 2000,
            }
          );
        }
      },
      (error: any) => {
        this.matSnackBar.open(
          "Couldn't Find Information, Please Try Again",
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

  gotItem(item): FormGroup {
    return this._formBuilder.group({
      Id: item.Id,
      ClientId: item.ClientId,
      KeyName: item.KeyName,
      LabelName: item.LabelName,
      KeyValue: item.KeyValue,
      Visible: item.Visible,
      Required: item.Required,
      Message: item.Message,
      FormName: item.FormName,
      ActiveStatus: item.ActiveStatus,
      ProgramType: item.ProgramType,
      EIMSField: item.EIMSField != null ? item.EIMSField : '--',
      DBField: item.DBField != null ? item.DBField : '--',
    });
  }

  BMI_MainForm_Items(): FormArray {
    return this.BMI_MainForm.get('items') as FormArray;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}

let dummy_Ins = [
  {
    name: 'Chattogram Cantonment Public College',
    value: 'Chattogram Cantonment Public College',
  },
];

let dummy_cr = [
  {
    name: 'Both',
    value: 'B',
  },
  {
    name: 'School',
    value: 'S',
  },
  {
    name: 'College',
    value: 'C',
  },
];

let dummy_vr = [
  {
    name: 'Both',
    value: 'Both',
  },
  {
    name: 'Visible',
    value: 'Visible',
  },
  {
    name: 'Hidden',
    value: 'Hidden',
  },
];

let dummy_rr = [
  {
    name: 'Both',
    value: 'Both',
  },
  {
    name: 'Required',
    value: 'Required',
  },
  {
    name: 'Optional',
    value: 'Optional',
  },
];

let dummy_sr = [
  {
    name: 'All',
    value: 'All',
  },
  {
    name: 'Custom',
    value: 'Custom',
  },
  {
    name: 'Default',
    value: 'Default',
  },
];

let dummy_fn = [
  {
    name: 'Personal Information',
    value: 'Personal Information',
  },
  {
    name: 'Qualification Information',
    value: 'Qualification Information',
  },
];
