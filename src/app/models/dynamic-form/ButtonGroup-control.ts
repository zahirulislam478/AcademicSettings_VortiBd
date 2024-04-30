import Utils from "app/Utility/utils";
import { BaseControl } from './base-control';

export class ButtonGroupControl extends BaseControl<string> {
    controlType = 'buttonGroup';
    children: any[] = [];

    constructor(children: {} = {})
    {
        super(children);
        this.children = children['children'] || [];
    }

    static getFromJsonObj(obj: any): ButtonGroupControl
    {
        const children = [];
        obj.children.forEach(child =>
        {
            children.push(Utils.toControl(child));
        });
        return new ButtonGroupControl({
            key: obj.key != null ? obj.key : '',
            label: obj.label != null ? obj.label : '',
            valueField: obj.valueField != null ? obj.valueField : '',
            errorType: obj.errorType != null ? obj.errorType : '',
            message: obj.message != null ? obj.message : '',
            tooltip: obj.tooltip != null ? obj.tooltip : '',
            tabindex: obj.tabindex != null ? obj.tabindex : '',
            maxlength: obj.maxlength != null ? obj.maxlength : '',
            minlength: obj.minlength != null ? obj.minlength : '',
            stepName: obj.stepName != null ? obj.stepName : '',
            stepOrder: obj.stepOrder != null ? obj.stepOrder : '',
            children: obj.children != null ? children : [],
            order: obj.order != null ? obj.order : '',
        });
    }
}
