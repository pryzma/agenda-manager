// calendar
function calendar(args){
    //const view = args.view ? args.view : 'month'
    const $documentFragment = $(document.createDocumentFragment());
    const $calendarTable = $('<table></table>')
      .attr('class','table table-calendar table-bordered table-striped'),
          $calendarTableHeader = $('<thead></thead>'),
          $calendarTableHeadersWeekDays = $('<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>'),
          $calendarTableBody = $('<tbody></tbody>')
 
    $calendarTableHeader.append($calendarTableHeadersWeekDays)
    $calendarTable.append($calendarTableHeader);
  
    let $calendarTableRow
    args = args ? args : {}
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const now = new Date(),
    dd = args.d ? args.d : now.getDate(),
    mm = args.m ? args.m : now.getMonth() + 1,
    yyyy = args.y ? args.y : now.getFullYear(),
    days = new Date(yyyy, mm, 0).getDate()+1;

    let start = 1;
    
    let weekDayNumStart = new Date(`${yyyy}-${mm}-${start}`).getDay(),
    prevMonth = mm -1,
    prevMonthDays = new Date(yyyy, prevMonth, 0).getDate()+1,
    prevMonthStart = prevMonthDays - weekDayNumStart,
    weekDayNum;
    

    if(args.data){ 
      const apiObj = {
        url : args.data.url,
        callback : (data) => {
          if(data[0]){
            calendarBuild(data)
          }else{
            $(args.el).html('No Data')
          }
         
          if(args.data.callback) args.data.callback(data);
        }
      }
      if(args.data.modify) apiObj.modify = args.data.modify;
      api(apiObj); // fetch data from api
    }else{
      calendarBuild()
    }
    function calendarBuild(data){
      // previous month
      while(prevMonthStart < prevMonthDays ){
        weekDayNum = new Date(`${yyyy}-${prevMonth}-${prevMonthStart}`).getDay()
        if(weekDayNum===0)$calendarTableRow = $('<tr></tr>')
        let $calendarTableCell = $('<td></td>').attr('style','background-color:#fff;')
        $calendarTableRow.append($calendarTableCell.html(prevMonthStart).addClass('text-muted'))
        
        if(data){
          for(let item of data){
            
            if(item.date.split('T')[0] === `${yyyy}-${prevMonth}-${prevMonthStart}`){
              // add items for specified date
              let $eventItem = $('<div></div>')
                    .attr('class','event begin end')
                    .html(`<i class="far fa-calendar"></i> ${item.name}`);
              $calendarTableCell.append($eventItem);
            }
          }
        }
        if(weekDayNum===6)$calendarTableBody.append($calendarTableRow)
        prevMonthStart++
      }
      // current month
      while(start < days ){

        if(start.toString().length<2)start = `0${start}`
        weekDayNum = new Date(`${yyyy}-${mm}-${start}`).getDay()
        if(weekDayNum===0)$calendarTableRow = $('<tr></tr>')
        let $calendarTableCell = $('<td></td>')
       // dd = (component.date('dd')/1);
       
        dd === (start/1) ? $calendarTableRow.append($calendarTableCell.addClass('today').html(`<b>${start}</b>`)) : $calendarTableRow.append($calendarTableCell.html(start))
        
        if(dd > start){
          $calendarTableCell.addClass('past');
        }else{
         if(args.btn){
          const $calendarTableCellBtn = $(component.btn(args.btn));
          $calendarTableCellBtn.on('click',()=> args.btn.onClick());
          $calendarTableCell.append($calendarTableCellBtn);
         }
        }
        
        if(data){
          
          for(let item of data){
            if(item.date.split('T')[0] === `${yyyy}-${mm}-${start}`){
              // add items for specified date
              let $eventItem = $('<div></div>')
                .attr('class','event begin end')
                .attr('id',item.id)
                .html(`<i class="far fa-calendar"></i> ${item.name}`)
                .on('click',args.onClick);
              $calendarTableCell.append($eventItem);
              
            }
          }
        }
        if(weekDayNum===6) $calendarTableBody.append($calendarTableRow);
        start = (start/1)
        start++;
      }
      $calendarTable.append($calendarTableBody);
     
    }

    
    const $calendarMonths = $('<div></div>').attr('class','dropdown')
    // calendarMonths dropdown 
    // https://getbootstrap.com/docs/4.3/components/dropdowns/
    $calendarMonths.append($('<a></a>')
      .attr('id','calendarMonths')
      .attr('class','btn btn-light dropdown-toggle')
      .attr('role','button')
      .attr('data-toggle','dropdown')
      .html(months[mm-1]));
    const $calendarMonthsMenu = $('<div></div>')
      .attr('class','dropdown-menu')
      .attr('aria-labelledby','calendarMonths')
    months.map(month => {
      if(month!==months[mm-1]) $calendarMonthsMenu.append(
        $('<a></a>')
          .attr('class','dropdown-item')
          .html(month)
      );
    });
    $calendarMonths.append($calendarMonthsMenu);
    $calendarMonths.dropdown();
    $documentFragment.append($calendarMonths);
    $documentFragment.append($calendarTable);
    $(args.el).html($documentFragment);
    return $documentFragment
  }