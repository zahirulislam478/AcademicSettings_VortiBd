import { BaseControl } from './base-control';

export class LabelControl extends BaseControl<string> {
    controlType = 'label';
    type: string;

    constructor(options: {} = {})
    {
        super(options);
        this.type = options['type'] || '';
    }

    static getFromJsonObj(obj: any): LabelControl
    {
        return new LabelControl({
            key: obj.key != null ? obj.key : '',
            label: obj.label != null ? obj.label : '',
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
