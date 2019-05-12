import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dictionary' })
export class DictionaryPipe implements PipeTransform {

    dictionary: any;
    transform(value: any, field: string, dictionaryForAudit: any) {
        if (value === '') {
            return value;
        }

        if (dictionaryForAudit[field]) {
            dictionaryForAudit[field].forEach((item: any) => {
                if (item.name === value) {
                    value = item.description || item.name;
                }
            });
        }
        return value;
    }
}
