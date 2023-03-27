import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(data:any[],searchTerm:string,transactionType:string): any[] {
    
    // result after transform

    const result:any=[]
    if(!data || searchTerm=='' || transactionType==''){
      return data
    }
    data.forEach(item => {
      if(item[transactionType].trim().toLowerCase().includes(searchTerm.trim().toLowerCase()))
      result.push(item)
      
      
    });

    return result;
  }

}
