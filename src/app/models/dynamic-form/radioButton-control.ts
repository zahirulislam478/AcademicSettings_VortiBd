import { BaseControl } from '.';

export class RadioButtonControl extends BaseControl<string> {
    controlType = 'radio';
    options: { key: string, value: string }[] = [];

    constructor(options: {} = {})
    {
        super(options);
        this.options = options['options'] || [];
    }
    static getFromJsonObj(obj: any): RadioButtonControl
    {
        const options = [];
        const optJson = obj.options;
        for (let option in optJson)
        {
            options.push({ key: optJson[option].key, value: optJson[option].value });
        }
        return new RadioButtonControl({
            key: obj.key != null ? obj.key : '',
            label: obj.label != null ? obj.label : '',
            valueField: obj.valueField != null ? obj.valueField : '',
            relationClass: obj.relationClass != null ? obj.relationClass : '',
            errorType: obj.errorType != null ? obj.errorType : '',
            required: obj.required != null ? obj.required.toString() == "true" || obj.required == true ? true : false : false,
            message: obj.message != null ? obj.message : '',
            tooltip: obj.tooltip != null ? obj.tooltip : '',
            tabindex: obj.tabindex != null ? obj.tabindex : '',
            maxlength: obj.maxlength != null ? obj.maxlength : '',
            minlength: obj.minlength != null ? obj.minlength : '',
            stepName: obj.stepName != null ? obj.stepName : '',
            stepOrder: obj.stepOrder != null ? obj.stepOrder : '',
            options: obj.options != null ? options : [],
            value: obj.value != null ? obj.value : '',
            order: obj.order != null ? obj.order : '',
        });
    }
}
