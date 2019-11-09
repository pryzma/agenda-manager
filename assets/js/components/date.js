// component.date
function date(format){
    const now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1; 
  
    const yyyy = now.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    format = format ? format : 'mm-dd-yyyy';
    format = format.replace('dd',dd).replace('mm',mm).replace('yyyy',yyyy);
    return format;
  }