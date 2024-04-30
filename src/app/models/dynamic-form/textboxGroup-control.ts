import Utils from 'app/Utility/utils';
import { BaseControl } from './base-control';

export class TextboxGroupControl extends BaseControl<string> {
    controlType = 'textboxGroup';
    children: { key: string, control: string }[] = [];
    innerContent: { key: string, control: string }[] = [];

    constructor(children: {} = {})
    {
        super(children);
        this.children = children['children'] || [];
        this.innerContent = children['innerContent'] || [];
    }

    static getFromJsonObj(obj: any): TextboxGroupControl
    {
        const children = [];
        obj.children.forEach(child =>
        {
            children.push(Utils.toControl(child));
        });
        const innerContent = [];
        if (obj.innerContent)
        {
            obj.innerContent.forEach(child =>
            {
                innerContent.push(Utils.toControl(child));
            });
        }

        return new TextboxGroupControl({
            key: obj.key != null ? obj.key : '',
            label: obj.label != null ? obj.label : '',
            type: obj.type != null ? obj.type : 'text',
            relationClass: obj.relationClass != null ? obj.relationClass : '',
            valueField: obj.valueField != null ? obj.valueField : '',
            value: obj.value != null ? obj.value : '',
            // required: obj.required != null ? obj.required : '',
            required: obj.required != null ? obj.required.toString() == "true" || obj.required == true ? true : false : false,
            // readonly: obj.readonly != null ? obj.readonly : '',
            readonly: obj.readonly != null ? obj.readonly.toString() == "true" || obj.readonly == true ? true : false : false,
            errorType: obj.errorType != null ? obj.errorType : '',
            message: obj.message != null ? obj.message : '',
            tooltip: obj.tooltip != null ? obj.tooltip : '',
            tabindex: obj.tabindex != null ? obj.tabindex : '',
            maxlength: obj.maxlength != null ? obj.maxlength : '',
            minlength: obj.minlength != null ? obj.minlength : '',
            stepName: obj.stepName != null ? obj.stepName : '',
            stepOrder: obj.stepOrder != null ? obj.stepOrder : '',
            order: obj.order != null ? obj.order : '',
            children: obj.children != null ? children : [],
            innerContent: obj.innerContent != null ? innerContent : [],

        });
    }
}
