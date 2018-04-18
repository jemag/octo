import {Field} from './field.util';
import {PropertyLocatorFactory} from '../../property-locator-factory.util';


export class TextField implements Field {
  type: string;

  constructor(public fieldDef: any, public result: any, public contentType: string) {
    this.type = this.fieldDef.type;
  }

  getHTML(): string {
    const propertyLocator = PropertyLocatorFactory.getPropertyLocator(this.contentType);
    let value = propertyLocator.getValue(this.result, this.fieldDef.propertyPath);
    if (value == null) {
      value = '';
    }
    return `<td>${this.fieldDef.label}</td><td>${value}</td>`;
  }
}
