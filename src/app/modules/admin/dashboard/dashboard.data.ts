/** @format */

export interface Institute {
  value: string;
  name: string;
  image?: String;
}
export interface AdmissionClass {
  value: string;
  name: string;
}
export interface Version {
  value: string;
  name: string;
}
export interface Category {
  value: string;
  name: string;
}
export interface Shift {
  value: string;
  name: string;
}
export interface HSCGroup {
  value: string;
  name: string;
}
export interface SSCBoard {
  value: string;
  name: string;
}

export const schools: Institute[] = [
  {
    value: "1",
    name: "Dhaka Cantonment Girls' Public School & College",
    image: "https://vortibd.com/media/icon/2018_10_21_12_23_25_logo.gif",
  },
  {
    value: "2",
    name: "Shaheed Police Smrity College",
    image:
      "https://vortibd.com/media/icon/2022_11_15_11_45_26_2021_11_14_12_24_53_spsc.jpg",
  },
  {
    value: "3",
    name: "ISPAHANI PUBLIC SCHOOL & COLLEGE",
    image: "https://vortibd.com/media/icon/2018_11_07_05_15_02_logo_header.png",
  },
];

export const Dummy_Pair: Institute[] = [
  {
    value: "-",
    name: "-",
  },
]

// const obj = {foo: 'bar'}

// const altObj = Object.fromEntries(
//   Object.entries(obj).map(([key, value]) => 
//     // Modify key here
//     [`x-${key}`, value]
//   )
// )

export const schoolClass: AdmissionClass[] = [
  {
    value: "1",
    name: "One",
  },
  {
    value: "2",
    name: "Two",
  },
  {
    value: "3",
    name: "Three",
  },
  {
    value: "4",
    name: "Four",
  },
  {
    value: "5",
    name: "Five",
  },
  {
    value: "6",
    name: "Six",
  },
  {
    value: "7",
    name: "Seven",
  },
  {
    value: "8",
    name: "Eight",
  },
  {
    value: "9",
    name: "Nine",
  },
  {
    value: "10",
    name: "Ten",
  },
];

export const collegeClass: AdmissionClass[] = [
  {
    value: "11",
    name: "Eleven",
  },
  {
    value: "12",
    name: "Twelve",
  },
];

export const bothClass: AdmissionClass[] = [
  {
    value: "1",
    name: "One",
  },
  {
    value: "2",
    name: "Two",
  },
  {
    value: "3",
    name: "Three",
  },
  {
    value: "4",
    name: "Four",
  },
  {
    value: "5",
    name: "Five",
  },
  {
    value: "6",
    name: "Six",
  },
  {
    value: "7",
    name: "Seven",
  },
  {
    value: "8",
    name: "Eight",
  },
  {
    value: "9",
    name: "Nine",
  },
  {
    value: "10",
    name: "Ten",
  },
  {
    value: "11",
    name: "Eleven",
  },
  {
    value: "12",
    name: "Twelve",
  },
];

export const versions: Version[] = [
  {
    value: "1",
    name: "Bangla",
  },
  {
    value: "2",
    name: "English",
  },
];

export const categories: Category[] = [
  {
    value: "1",
    name: "Girls",
  },
  {
    value: "2",
    name: "Boys",
  },
];

export const shifts: Shift[] = [
  {
    value: "1",
    name: "Morning",
  },
  {
    value: "2",
    name: "Day",
  },
];

export const hscGroups: HSCGroup[] = [
  {
    value: "1",
    name: "Science",
  },
  {
    value: "2",
    name: "Commerce",
  },
  {
    value: "3",
    name: "Arts",
  },
];

export const sscBoards: SSCBoard[] = [
  {
    value: "1",
    name: "Dhaka",
  },
  {
    value: "2",
    name: "Rajshahi",
  },
  {
    value: "3",
    name: "Chittagong",
  },
  {
    value: "4",
    name: "Khulna",
  },
];

// export const appData = [
//   {
//     id: "1",
//     url: "https://vortibd.com/media/icon/2018_10_21_12_23_25_logo.gif",
//     collegeName: "Dhaka Cantonment Girls' Public School & College",
//     appStatus: "Applied for Eight",
//     appDate: "Created Nov 01,2022",
//     paymentStatus: "Paid",
//     appUrl: "assets/images/avatars/brian-hughes.jpg",
//     appName: "Asifur Rahman",
//     applicationId: "Application ID 220112",
//     status: "Download",
//     peek: "Hide",
//   },
//   {
//     id: "2",
//     url: "https://vortibd.com/media/icon/2022_11_15_11_45_26_2021_11_14_12_24_53_spsc.jpg",
//     collegeName: "Shaheed Police Smrity College",
//     appStatus: "Apply for Nine",
//     appDate: "Created Nov 01,2022",
//     paymentStatus: "Unpaid",
//     appUrl: "assets/images/avatars/female-01.jpg",
//     appName: "Dorin Islam",
//     applicationId: "Application ID 220162",
//     status: "Pay Now",
//     peek: "Hide",
//   },
//   {
//     id: "3",
//     url: "https://vortibd.com/media/icon/2018_11_07_05_15_02_logo_header.png",
//     collegeName: "ISPAHANI PUBLIC SCHOOL & COLLEGE",
//     appStatus: "Applied for Eight",
//     appDate: "Created Nov 01,2022",
//     paymentStatus: "Draft",
//     appUrl: "assets/images/avatars/female-04.jpg",
//     appName: "Pial Paul",
//     applicationId: "Application ID 223412",
//     status: "Apply Now",
//     peek: "Hide",
//   },
// ];

export interface FormParam_Interface {
  AddmissionOpenProgramDetails?: any;
  SelectedInstituteId?: string;
  SelectedInstituteText?: string;
  SelectedVersion?: string;
  SelectedVersionText?: string;
  SelectedShift?: string;
  SelectedShiftText?: string;
  SelectedBoard?: string;
  SelectedBoardText?: string;
  SelectedSession?: string;
  SelectedSessionText?: string;
  SelectedCategory?: string;
  SelectedCategoryText?: string;
  SelectedCategoryType?: string;
  SelectedGroup?: string;
  SelectedGroupText?: string;
  SelectedSSCYear?: string;
  SelectedSSCYearText?: string;
  SelectedSSCRoll?: string;
  AutoCompleteName?: string;
  AutoCompleteImage?: string;
  SelectedProgramId?: number;
  SelectedProgramName?: string;
  SelectedProgramType?: string;
  SelectedVersionName?: string;
  SelectedShiftName?: string;
  SelectedSessionName?: string;
  SelectedVersionId?: string;
  SelectedShiftId?: string;
  SelectedSessionId?: string;
  SelectedFormAmount?: string;
  SelectedConvAmount?: string;
  selectedCircular?: string;
  SelectedCircularDetailId?: string;
  SelectedCircularId?: string;
  SelectedCircularTitle?: string;
  SelectedProfileNo?: string;
  SelectedStudentMasterId?: string;
  SelectedStudentName?: string;
  SelectedApplicationFlag?: string;
  SelectedStudentId?: string;
  
}
