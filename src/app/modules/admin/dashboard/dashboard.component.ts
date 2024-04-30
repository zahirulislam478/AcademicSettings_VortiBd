import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent
{

}


// function findMissingKeys(addressInfo: any): string[] {
//   const expectedKeys = ['presentAreaAddress', 'presentPostCode', 'presentDistrict'];
//   const missingKeys: string[] = [];

//   expectedKeys.forEach((key) => {
//     if (!addressInfo[key]) {
//       missingKeys.push(key);
//     }
//   });

//   return missingKeys;
// }

// // Usage example
// const missingKeys = findMissingKeys(this.addressInfo);

// if (missingKeys.length > 0) {
//   console.log('Missing keys in addressInfo:', missingKeys);
// } else {
//   console.log('All expected keys are present in addressInfo.');
// }




