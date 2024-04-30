import { BaseControl } from '.';

export class SlideToggleControl extends BaseControl<string> {
    controlType = 'slideToggle';
    type: string;

    constructor(options: {} = {})
    {
        super(options);
        this.type = options['type'] || [];
    }
    static getFromJsonObj(obj: any): SlideToggleControl
    {
        return new SlideToggleControl({
            key: obj.key != null ? obj.key : '',
            label: obj.label != null ? obj.label : '',
            type: obj.type != null ? obj.type : '',
            relationClass: obj.relationClass != null ? obj.relationClass : '',
            valueField: obj.valueField != null ? obj.valueField : '',
            value: obj.value != null ? obj.value : '',
            // required: obj.required != null ? obj.required : '',
            required: obj.required != null ? obj.required.toString() == "true" || obj.required == true ? true : false : false,
            readonly: obj.readonly != null ? obj.readonly : '',
            errorType: obj.errorType != null ? obj.errorType : '',
            message: obj.message != null ? obj.message : '',
            tooltip: obj.tooltip != null ? obj.tooltip : '',
            tabindex: obj.tabindex != null ? obj.tabindex : '',
            maxlength: obj.maxlength != null ? obj.maxlength : '',
            minlength: obj.minlength != null ? obj.minlength : '',
            stepName: obj.stepName != null ? obj.stepName : '',
            stepOrder: obj.stepOrder != null ? obj.stepOrder : '',
            order: obj.order != null ? obj.order : '',
        });
    }
}
