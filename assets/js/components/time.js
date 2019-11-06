// component.time
function time(){
    let now = new Date();
    let hh = now.getHours();
    hh = hh.toString().length === 1 ? `0${hh}` : hh
    let mm = now.getMinutes();
    mm = mm.toString().length === 1 ? `${mm}0` : mm
    now = `${hh}:${mm}`;

    return now;
  }