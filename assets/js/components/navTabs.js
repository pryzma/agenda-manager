// tabs 
  /* https://getbootstrap.com/docs/4.3/components/navs/#tabs
  component.nav.tabs([
    { label : 'Tab#1', content : 'Content for Tab#1' }
  ])
  */
 function navTabs(args) {
    const tabsElement = document.createElement('ul'),
    tabsFragment = document.createDocumentFragment();
    tabsElement.setAttribute('class','nav nav-tabs');
    tabsElement.setAttribute('id',`tabs_${uid()}`)
    tabsElement.setAttribute('role','tablist')
    const tabsContent = document.createElement('div');
    tabsContent.setAttribute('class','tab-content');
    const tabs = args;
    let tabIndex = 0;

    for(let tab of tabs){
      
      const tabId = uid(),
      tabElement = document.createElement('li'),
      tabLink = document.createElement('a'),
      tabContent = document.createElement('div'),
      tabClass = tabIndex === 0 ? 'tab-pane fade show active' : 'tab-pane fade',
      tabLinkClass = tabIndex === 0 ? 'nav-link active' : 'nav-link' ;
      // tabElement
      tabLink.setAttribute('href',`#${tabId}`);
      tabLink.setAttribute('class',tabLinkClass);
      tabLink.setAttribute('role','tab');
      tabLink.setAttribute('aria-controls',tabId)
      tabLink.setAttribute('data-toggle','tab');
      tabLink.innerHTML = tab.label;
      tabElement.setAttribute('class','nav-item');
      tabElement.appendChild(tabLink);
      tabsElement.appendChild(tabElement);
      // tabContent
      tabContent.setAttribute('class',tabClass);
      tabContent.setAttribute('aria-labelledby',`${tabId}-tab`);
      tabContent.setAttribute('id',tabId);
      tabContent.setAttribute('role','tabpanel');
      tabContent.innerHTML = tab.content;
      tabsContent.appendChild(tabContent);
      tabIndex++;
    }
    tabsFragment.appendChild(tabsElement);
    tabsFragment.appendChild(tabsContent);
    return tabsFragment;
  }