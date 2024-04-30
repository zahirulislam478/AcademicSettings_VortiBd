import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl } from "@angular/forms";
import { SuperAdminService } from "../superAdmin/superAdmin.service";
import { AcademicSettingsService } from "./academic-settings.service";

@Component({
  selector: "app-academic-settings",
  templateUrl: "./academic-settings.component.html",
  styleUrls: ["./academic-settings.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AcademicSettingsComponent implements OnInit {
  ClientDropDownControl = new FormControl("");
  Circular_InstituteData: any;
  institutes: any;
  clientData: any;

  tabs = [
    "Program",
    "Version",
    "Group",
    "Shift",
    "Session",
    "Section",
    "Category",
    "Subject",
    "Class",
    "House",
  ];

  // Arrays to hold data for each table
  programTableData: any[] = [];
  versionTableData: any[] = [];
  groupTableData: any[] = [];
  shiftTableData: any[] = [];
  sessionTableData: any[] = [];
  sectionTableData: any[] = [];
  categoryTableData: any[] = [];
  subjectTableData: any[] = [];
  classTableData: any[] = [];
  houseTableData: any[] = [];

  constructor(
    private academicSettingsService: AcademicSettingsService,
    private superAdminService: SuperAdminService
  ) {
    this.clientData = JSON.parse(localStorage.getItem("clientData"));
    this.ClientDropDownControl = new FormControl(this.clientData.User.ClientId);
  }

  getCircularInstituteData(): void {
    this.academicSettingsService.GetCircularClients().subscribe(
      (data: any) => {
        console.log(data, "getCircularInstituteData");
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
        console.log(error, "error");
      }
    );
  }

  // Method to fetch data for Program table
  getProgramTableData(clientId: any, table: any): void {
    this.superAdminService.getTablesData(clientId, table).subscribe(
      (response: any) => {
        console.log("Response program Data:", response);
        if (
          response.isError === false &&
          response.data &&
          response.data.Programs
        ) {
          this.programTableData = response.data.Programs.map(
            (program: any, index: number) => {
              return {
                SL: index + 1,
                Code: program.ProgramCode,
                Program: program.ProgramName,
                "Short Name": program.ShortName || "--",
                "EIMS ID": program.EimsId,
                Duration: program.Duration,
                Status: program.ActiveStatus ? "Active" : "Inactive",
                "P.Type": program.ProgramType === "S" ? "School" : "College",
                "G.Effect": program.IsGroupEffect === "Y" ? "Yes" : "No",
                Session: program.DefaultSessionName || "--",
                Term: program.TermName || "--",
                "Curriculum Description": program.CurName || "--",
                "Last B.Exam": program.PreExamName || "--",
              };
            }
          );
        } else {
          console.error(
            "Error fetching Programs table data:",
            response.message
          );
        }
      },
      (error: any) => {
        console.error("Error fetching Programs table data:", error);
      }
    );
  }

  // Method to fetch data for Version table
  getVersionTableData(clientId: any, table: any): void {
    this.superAdminService.getTablesData(clientId, table).subscribe(
      (response: any) => {
        console.log("Response version Data:", response);
        if (
          response.isError === false &&
          response.data &&
          response.data.Versions
        ) {
          // Map the response data to the versionTableData array
          this.versionTableData = response.data.Versions.map(
            (version: any, index: number) => {
              return {
                SL: index + 1,
                VersionCode: version.Code,
                VersionName: version.Name,
                // Action: '--'
              };
            }
          );
        } else {
          console.error("Error fetching Version table data:", response.message);
        }
      },
      (error: any) => {
        console.error("Error fetching Version table data:", error);
      }
    );
  }

  // Method to fetch data for Group table
  getGroupTableData(clientId: any, table: any): void {
    this.superAdminService.getTablesData(clientId, table).subscribe(
      (response: any) => {
        console.log("Response Group Data:", response);
        if (
          response.isError === false &&
          response.data &&
          response.data.Groups
        ) {
          // Map the response data to the groupTableData array
          this.groupTableData = response.data.Groups.map(
            (group: any, index: number) => {
              return {
                SL: index + 1,
                GroupCode: group.Code,
                GroupName: group.Name,
                // Action: '--'
              };
            }
          );
        } else {
          console.error("Error fetching Group table data:", response.message);
        }
      },
      (error: any) => {
        console.error("Error fetching Group table data:", error);
      }
    );
  }

  // Method to fetch data for Shift table
  getShiftTableData(clientId: any, table: any): void {
    this.superAdminService.getTablesData(clientId, table).subscribe(
      (response: any) => {
        console.log("Response Shift Data:", response);
        if (
          response.isError === false &&
          response.data &&
          response.data.Shifts
        ) {
          // Map the response data to the shiftTableData array
          this.shiftTableData = response.data.Shifts.map(
            (shift: any, index: number) => {
              return {
                SL: index + 1,
                ShiftCode: shift.Code,
                ShiftName: shift.Name,
                // Action: '--'
              };
            }
          );
        } else {
          console.error("Error fetching Shift table data:", response.message);
        }
      },
      (error: any) => {
        console.error("Error fetching Shift table data:", error);
      }
    );
  }

  // Method to fetch data for Session table
  getSessionTableData(clientId: any, table: any): void {
    this.superAdminService.getTablesData(clientId, table).subscribe(
      (response: any) => {
        console.log("Response Session Data:", response);
        if (
          response.isError === false &&
          response.data &&
          response.data.Sessions
        ) {
          // Map the response data to the sessionTableData array
          this.sessionTableData = response.data.Sessions.map(
            (session: any, index: number) => {
              return {
                SL: index + 1,
                SessionCode: session.Code,
                SessionName: session.Name,
                // Action: '--'
              };
            }
          );
        } else {
          console.error("Error fetching Session table data:", response.message);
        }
      },
      (error: any) => {
        console.error("Error fetching Session table data:", error);
      }
    );
  }

  // Method to fetch data for Section table
  getSectionTableData(clientId: any, table: any): void {
    this.superAdminService.getTablesData(clientId, table).subscribe(
      (response: any) => {
        console.log("Response Section Data:", response);
        if (
          response.isError === false &&
          response.data &&
          response.data.Sections
        ) {
          // Map the response data to the sectionTableData array
          this.sectionTableData = response.data.Sections.map(
            (section: any, index: number) => {
              return {
                SL: index + 1,
                SectionCode: section.Code,
                SectionName: section.Name,
                // Action: '--'
              };
            }
          );
        } else {
          console.error("Error fetching Section table data:", response.message);
        }
      },
      (error: any) => {
        console.error("Error fetching Section table data:", error);
      }
    );
  }

  // Method to fetch data for Category table
  getCategoryTableData(clientId: any, table: any): void {
    this.superAdminService.getTablesData(clientId, table).subscribe(
      (response: any) => {
        console.log("Response Category Data:", response);
        if (
          response.isError === false &&
          response.data &&
          response.data.Categories
        ) {
          // Map the response data to the categoryTableData array
          this.categoryTableData = response.data.Categories.map(
            (category: any, index: number) => {
              return {
                SL: index + 1,
                CategoryCode: category.Code,
                CategoryName: category.Name,
                // Action: '--'
              };
            }
          );
        } else {
          console.error(
            "Error fetching Category table data:",
            response.message
          );
        }
      },
      (error: any) => {
        console.error("Error fetching Category table data:", error);
      }
    );
  }

  // Method to fetch data for Subject table
  getSubjectTableData(clientId: any, table: any): void {
    this.superAdminService.getTablesData(clientId, table).subscribe(
      (response: any) => {
        console.log("Response Subject Data:", response);
        if (
          response.isError === false &&
          response.data &&
          response.data.Subjects
        ) {
          // Map the response data to the subjectTableData array
          this.subjectTableData = response.data.Subjects.map(
            (subject: any, index: number) => {
              return {
                SL: index + 1,
                SubjectCode: subject.Code,
                SubjectName: subject.Name,
                // Action: '--'
              };
            }
          );
        } else {
          console.error("Error fetching Subject table data:", response.message);
        }
      },
      (error: any) => {
        console.error("Error fetching Subject table data:", error);
      }
    );
  }

  // Method to fetch data for Class table
  getClassTableData(clientId: any, table: any): void {
    this.superAdminService.getTablesData(clientId, table).subscribe(
      (response: any) => {
        console.log("Response Class Data:", response);
        if (
          response.isError === false &&
          response.data &&
          response.data.Classes
        ) {
          // Map the response data to the classTableData array
          this.classTableData = response.data.Classes.map(
            (classes: any, index: number) => {
              return {
                SL: index + 1,
                ClassCode: classes.Code,
                ClassName: classes.Name,
                // Action: '--'
              };
            }
          );
        } else {
          console.error("Error fetching Class table data:", response.message);
        }
      },
      (error: any) => {
        console.error("Error fetching Class table data:", error);
      }
    );
  }

  // Method to fetch data for House table
  getHouseTableData(clientId: any, table: any): void {
    this.superAdminService.getTablesData(clientId, table).subscribe(
      (response: any) => {
        console.log("Response House Data:", response);
        if (
          response.isError === false &&
          response.data &&
          response.data.Houses
        ) {
          // Map the response data to the houseTableData array
          this.houseTableData = response.data.Houses.map(
            (house: any, index: number) => {
              return {
                SL: index + 1,
                HouseCode: house.Code,
                HouseName: house.Name,
                // Action: '--'
              };
            }
          );
        } else {
          console.error("Error fetching House table data:", response.message);
        }
      },
      (error: any) => {
        console.error("Error fetching House table data:", error);
      }
    );
  }

  // Method to handle tab change
  onTabChange(event: any): void {
    const selectedTabIndex = event.index;
    const clientId = this.ClientDropDownControl.value;

    switch (this.tabs[selectedTabIndex]) {
      case "Program":
        this.getProgramTableData(clientId, "program");
        break;
      case "Version":
        this.getVersionTableData(clientId, "version");
        break;
      case "Group":
        this.getGroupTableData(clientId, "group");
        break;
      case "Shift":
        this.getShiftTableData(clientId, "shift");
        break;
      case "Session":
        this.getSessionTableData(clientId, "session");
        break;
      case "Section":
        this.getSectionTableData(clientId, "section");
        break;
      case "Category":
        this.getCategoryTableData(clientId, "category");
        break;
      case "Subject":
        this.getSubjectTableData(clientId, "subject");
        break;
      case "Class":
        this.getClassTableData(clientId, "class");
        break;
      case "House":
        this.getHouseTableData(clientId, "house");
        break;
      default:
        break;
    }
  }

  // Method to handle client selection change
  onClientSelectionChange(): void {
    const clientId = this.ClientDropDownControl.value;
    const selectedTabIndex = this.tabs.findIndex((tab) => tab === "Program");

    if (selectedTabIndex !== -1) {
      switch (this.tabs[selectedTabIndex]) {
        case "Program":
          this.getProgramTableData(clientId, "program");
          break;
        case "Version":
          this.getVersionTableData(clientId, "version");
          break;
        case "Group":
          this.getGroupTableData(clientId, "group");
          break;
        case "Shift":
          this.getShiftTableData(clientId, "shift");
          break;
        case "Session":
          this.getSessionTableData(clientId, "session");
          break;
        case "Section":
          this.getSectionTableData(clientId, "section");
          break;
        case "Category":
          this.getCategoryTableData(clientId, "category");
          break;
        case "Subject":
          this.getSubjectTableData(clientId, "subject");
          break;
        case "Class":
          this.getClassTableData(clientId, "class");
          break;
        case "House":
          this.getHouseTableData(clientId, "house");
          break;
        default:
          break;
      }
    }
  }

  syncTSP(): void {
    this.superAdminService.syncClients().subscribe(
      (data: any) => {
        console.log("Sync TSP Data:", data);
      },
      (error: any) => {
        console.error("Error syncing TSP data:", error);
      }
    );
  }

  // Method to fetch clients by status
  GetClientsByStatus(status: any): void {
    this.superAdminService.getClients(status).subscribe(
      (data: any) => {
        console.log("Clients Status:", data);
      },
      (error: any) => {
        console.error("Error fetching clients:", error);
      }
    );
  }

  ngOnInit(): void {
    this.getCircularInstituteData();
    this.getProgramTableData(this.ClientDropDownControl.value, "program");
    this.getVersionTableData(this.ClientDropDownControl.value, "version");
    this.getGroupTableData(this.ClientDropDownControl.value, "group");
    this.getShiftTableData(this.ClientDropDownControl.value, "shift");
    this.getSessionTableData(this.ClientDropDownControl.value, "session");
    this.getSectionTableData(this.ClientDropDownControl.value, "section");
    this.getCategoryTableData(this.ClientDropDownControl.value, "category");
    this.getSubjectTableData(this.ClientDropDownControl.value, "subject");
    this.getClassTableData(this.ClientDropDownControl.value, "class");
    this.getHouseTableData(this.ClientDropDownControl.value, "house");
    this.GetClientsByStatus("active");
    this.syncTSP();
  }
}
