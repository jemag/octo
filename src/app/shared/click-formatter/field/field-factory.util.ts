import {TextField} from './text-field.util';
import {Field} from './field.util';
import {DateField} from './date-field.util';

export class FieldFactory {
  public static getField(fieldDef: any, result: any, contentType: any): Field {
    switch (fieldDef.type) {
      case 'text':
        return new TextField(fieldDef, result, contentType);
      case 'date':
        return new DateField(fieldDef, result, contentType);
      default:
        return null;
    }
  }

}