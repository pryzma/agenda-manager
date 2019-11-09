// component.card
  /* https://getbootstrap.com/docs/4.3/components/card/
    component.card({
      title : 'Title of Card',
      content : 'Content of Card'
    })
  */
 function card(args){
    const card = document.createElement('div'), 
    cardBody = document.createElement('div'),
    cardText = document.createElement('div'),
    cardFragment = document.createDocumentFragment();
    card.setAttribute('class','card');
    cardBody.setAttribute('class','card-body');

    if(args.title){
      const cardTitle = document.createElement('h6');
      cardTitle.setAttribute('class','card-title');
      cardTitle.innerHTML = args.title;
      card.appendChild(cardTitle);
    }
    cardText.setAttribute('class','card-text');
    cardText.innerHTML = args.content;
    cardBody.appendChild(cardText);
    
    card.appendChild(cardBody);
    return card;
  }