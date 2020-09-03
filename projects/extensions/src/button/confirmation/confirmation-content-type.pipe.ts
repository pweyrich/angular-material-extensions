import {
  Pipe,
  PipeTransform,
  TemplateRef
} from '@angular/core';

@Pipe({
  name: 'confirmationContentType'
})
export class ConfirmationContentTypePipe implements PipeTransform {
  transform(value: TemplateRef<any> | string): string
  {
    if (typeof value === 'string')
    {
      return 'string';
    }

    if (value instanceof TemplateRef)
    {
      return 'template';
    }
  }
}
