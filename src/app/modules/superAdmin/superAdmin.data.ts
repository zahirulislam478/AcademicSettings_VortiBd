export interface Institute {
  value: string;
  name: string;
  image?: String;
}

export const Institute_Pair: Institute[] = [
  {
    value: "-",
    name: "-",
  },
]

export const DATE_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  }
}

export interface FormParam_Interface {
  selectedInstituteId?: string;
  SelectedInstituteName?: string;
  SelectedCircularId?: string;
  SelectedClientId?: string;
  SelectedClientName?: string;
  SelectedClientShortName?: string;
  SelectedCircularTitle?: string;
  SelectedCircularType?: string;
  SelectedCircularOpenDate?: string;
  SelectedCircularCloseDate?: string;
  SelectedTotalApplied?: string;
  SelectedTotalAmount?: string;
  SelectedInstituteImage?: string;
}

export interface FormParamSchoolCollegeClassSetup_Interface {
  circularId?: string,
  circularType?: string,
  programs?: any,
  groups?: any,
  shifts?: string,
  versions?: string,
  studentCategories?: string,
  sessionId?: any,
  rollCategory?: number,
  rollSuffix?: string,
  isInstantAdmit?: string,
  admitDownloadDate?: string,
  isAgeLimit?: string,
  minimumAge?: number,
  maximumAge?: number,
  genderType?: any,
  lotteryDate?: string,
  lotteryTime?: string,
  examDate?: string,
  examTime?: string,
  resultDate?: string,
  resultTime?: string,
  vivaVoceDate?: string,
  vivaTime?: string,
  formAmount?: number,
  bankCharge?: number,
  admitCondition?: string,
  activeStatus?: boolean,
  moneyReceipt?: any,
  AdmissionForm?: any,
}