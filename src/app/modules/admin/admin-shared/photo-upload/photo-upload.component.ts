import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import Utils from 'app/Utility/utils';

@Component({
    selector: 'admin-photo-upload',
    templateUrl: './photo-upload.component.html',
    styleUrls: ['./photo-upload.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AdminPhotoUploadComponent
{
    fileToUpload: any;
    userImageUrl: any = "/assets/images/person.png";
    signImageUrl: any = "/assets/images/signature.png";
    userBase64File: string = null;
    signBase64File: string = null;
    userFilename: string = null;
    signFilename: string = null;
    @Output() userImageSelected = new EventEmitter<{ userImage: any }>();
    @Output() signImageSelected = new EventEmitter<{ signImage: any }>();
    @ViewChild('userImage') myUserPhotoInputVariable: ElementRef;
    @ViewChild('signImage') mySignPhotoInputVariable: ElementRef;
    @Input() userPhoto: boolean;
    @Input() signPhoto: boolean;
    @Input() message: string = '';
    @Input() hmessage: string = '';
    showUni = true;
    /**
     * Constructor
     */
    constructor(
        private changeDetector: ChangeDetectorRef,
        private matSnackBar: MatSnackBar,
        private sanitizer: DomSanitizer,
    ) { }

    ngOnChanges(changes: any)
    {
        // console.log(changes.message.currentValue, 'changes');

        if (changes.message.currentValue == "none") { this.userImageUrl = "/assets/images/person.png" } else
        {
            this.userImageUrl = changes.message.currentValue;
            this.userBase64File = 'ZHVtbXk=';
        }
        // Utils.toDataURL(this.sanitizer.bypassSecurityTrustUrl(this.userImageUrl), function (base64image)
        // {
        //     this.userBase64File = base64image;
        // });
        // console.log(changes, 'changes')

        if (changes.hmessage.currentValue == "yes")
        {
            this.showUni = true;
        }
        else
        {
            this.showUni = false;
        }
    }

    // handleFileInput(file: FileList)
    // {
    //     this.fileToUpload = file.item(0);

    //     //Show image preview
    //     let reader = new FileReader();
    //     reader.onload = (event: any) =>
    //     {
    //         this.userImageUrl = event.target.result;
    //     }
    //     reader.readAsDataURL(this.fileToUpload);

    // }
    // userPhoto
    handleUserPhotoFileInput(event)
    {
        // let file = event.target.files[0];
        if (event.target.files && event.target.files && event.target.files[0].size > 102400)
        {
            this.matSnackBar.open("File Size Limit is 100 Kilobytes(KB)!", 'Close', {
                verticalPosition: 'top',
                duration: 200000,
            });
            this.myUserPhotoInputVariable.nativeElement.value = "";
            this.removeUserPhotoFile();
            // this.changeDetector.markForCheck();

        }
        else
        {


            if (event.target.files && event.target.files[0])
            {
                let userImg = new Image();
                userImg.src = window.URL.createObjectURL(event.target.files[0])
                userImg.onload = () =>
                {
                    if (userImg.width <= 300 && userImg.height <= 300)
                    {
                        let userReader = new FileReader(); // HTML5 FileReader API
                        let userFile = event.target.files[0];
                        userReader.readAsDataURL(userFile);

                        // When file uploads set it to file formcontrol
                        userReader.onload = () =>
                        {
                            this.userImageUrl = userReader.result;
                            this.userBase64File = (<string>userReader.result).split(',')[1];

                            this.userFilename = userFile.name;

                            this.userImageSelected.emit({
                                userImage: {
                                    'userImageUrl': this.userImageUrl,
                                    'userBase64File': this.userBase64File,
                                    'userFilename': this.userFilename,
                                }
                            });
                        }
                    } else
                    {
                        this.matSnackBar.open("Image Can Not Exceed Height of 300px & Width of 300px!", 'Close', {
                            verticalPosition: 'top',
                            duration: 200000,
                        });
                        this.myUserPhotoInputVariable.nativeElement.value = "";
                        this.removeUserPhotoFile();
                    }
                }
                // ChangeDetectorRef since file is loading outside the zone
                this.changeDetector.markForCheck();
            }
        }
    }
    removeUserPhotoFile(): void
    {
        this.userBase64File = null; this.userFilename = null;
        this.userImageUrl = "/assets/images/person.png";
        this.userImageSelected.emit({ userImage: null });
    }



    // signPhoto
    handleSignPhotoFileInput(event)
    {
        // let file = event.target.files[0];
        if (event.target.files && event.target.files && event.target.files[0].size > 102400)
        {
            this.matSnackBar.open("File Size Limit is 100 Kilobytes(KB)!", 'Close', {
                verticalPosition: 'top',
                duration: 200000,
            });
            this.mySignPhotoInputVariable.nativeElement.value = "";
            this.removeSignPhotoFile();
            // this.changeDetector.markForCheck();

        }
        else
        {


            if (event.target.files && event.target.files[0])
            {
                let signImg = new Image();
                signImg.src = window.URL.createObjectURL(event.target.files[0])
                signImg.onload = () =>
                {
                    if (signImg.width <= 300 && signImg.height <= 80)
                    {
                        let signReader = new FileReader(); // HTML5 FileReader API
                        let signFile = event.target.files[0];
                        signReader.readAsDataURL(signFile);

                        // When file uploads set it to file formcontrol
                        signReader.onload = () =>
                        {
                            this.signImageUrl = signReader.result;
                            this.signBase64File = (<string>signReader.result).split(',')[1];

                            this.signFilename = signFile.name;

                            this.signImageSelected.emit({
                                signImage: {
                                    'signImageUrl': this.signImageUrl,
                                    'signBase64File': this.signBase64File,
                                    'signFilename': this.signFilename,
                                }
                            });
                        }
                    } else
                    {
                        this.matSnackBar.open("Image Can Not Exceed Height of 80px & Width of 300px!", 'Close', {
                            verticalPosition: 'top',
                            duration: 200000,
                        });
                        this.mySignPhotoInputVariable.nativeElement.value = "";
                        this.removeSignPhotoFile();
                    }
                }
                // ChangeDetectorRef since file is loading outside the zone
                this.changeDetector.markForCheck();
            }
        }
    }
    removeSignPhotoFile(): void
    {
        this.signBase64File = null; this.signFilename = null;
        this.signImageUrl = "/assets/images/signature.png";
        this.signImageSelected.emit({ signImage: null });
    }
}
