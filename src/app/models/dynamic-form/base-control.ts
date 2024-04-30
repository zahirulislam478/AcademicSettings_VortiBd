export class BaseControl<T> {
  value: T;
  key: string;
  label: string;
  buttons: string;
  icon: string;
  required: boolean;
  readonly: boolean;
  order: number;
  controlType: string;
  type: string;
  errorType: string;
  relationClass: string;
  message: string;
  tooltip: string;
  tabindex: string;
  maxlength: string;
  minlength: string;
  stepName: string;
  stepOrder: string;
  options: { key: string, value: string }[];
  innerContent: any[];
  children: any[];
  valueField: T;
  constructor(options: {
    value?: T,
    key?: string,
    label?: string,
    buttons?: string,
    icon?: string,
    required?: boolean,
    readonly?: boolean,
    order?: number,
    controlType?: string,
    type?: string,
    errorType?: string,
    relationClass?: string,
    message?: string,
    tooltip?: string,
    tabindex?: string,
    maxlength?: string,
    minlength?: string,
    stepName?: string;
    stepOrder?: string;
    children?: any[];
    innerContent?: any[];
    valueField?: T;
  } = {})
  {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.icon = options.icon || '';
    this.buttons = options.buttons || '';
    this.required = options.required;
    this.readonly = options.readonly;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.errorType = options.errorType || '';
    this.relationClass = options.relationClass || '';
    this.message = options.message || '';
    this.tooltip = options.tooltip || '';
    this.tabindex = options.tabindex || '';
    this.maxlength = options.maxlength || '';
    this.minlength = options.minlength || '';
    this.stepName = options.stepName || '';
    this.stepOrder = options.stepOrder || '';
    this.valueField = options.valueField;
  }
}
