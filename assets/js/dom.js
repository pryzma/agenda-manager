/*
* assets/js/dom.js
*/
const dom = ((args)=>{
  // element
  /*
dom.element(['div',{id : 'divId'},'content of element']);
dom.element(['table',{id : 'tableId',class : 'table'},
    ['thead',
        ['tr',['th','Header#1'],['th','Header#2'],['th','Header#3'],]
]])
*/
  function element( tag, callback ){
    let isArray = ( arr ) => Array.isArray(arr);
    if ( !isArray( tag ) ) 
      return element.call( this, Array.prototype.slice.call( arguments ) )
    let name = tag[0],
        attributes = tag[1],
        element = document.createElement( name ),
        start = 1

    if ( typeof attributes === 'object' && attributes !== null && !isArray( attributes ) ) {
      for ( let attribute in attributes ) 
        element.setAttribute( attribute ,attributes[ attribute ] )
      start = 2
    }
    for ( let index = start; index < tag.length; index++ ) {
      if( isArray( tag[ index ] ) ){
        element.appendChild(DOM.create( tag[ index ] ) )
      } else {
        element.appendChild( document.createTextNode( tag[ index ] ) )
      }
    }
    if( callback ) callback()
    return element
  }
  return {
    element : element
  }
})();
