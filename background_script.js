var url = "";
// create a context menu
browser.contextMenus.create({
  id: 'ddg',
  title: 'Search',
  contexts: ['selection']
});

//add action listener to the context menu
browser.contextMenus.onClicked.addListener(contextMenuAction);

function contextMenuAction(info, tab) {
  let urlWithText = "";
  //console.log('url is ', url);
  if(!url)
    urlWithText = 'https://www.google.com/search?q=' + info.selectionText;
  else
    urlWithText = `${url}${info.selectionText}`;
  //console.log('urlWithText is ', urlWithText);
    
  browser.tabs.create({ url: urlWithText });
}

function handleFormSelection(data){
  browser.notifications.create({
      "type": "basic",
      "iconUrl": browser.extension.getURL('icons/logo_64.png'),
      "title": "Updated Search Engine",
      "message": data.searchEngine.toUpperCase()
  })
  console.log(data.searchEngine);
  switch(data.searchEngine) {
    case 'google': url = 'https://www.google.com/search?q=';
                   break;
    case 'twitter': url = 'https://twitter.com/search?q=';
                   break;
    case 'quora': url = 'https://www.quora.com/search?q=';
                   break;
    case 'youtube': url = 'https://www.youtube.com/results?search_query=';
                   break;
    case 'bing': url = 'https://www.bing.com/search?q=';
                   break;
    case 'yahoo': url = 'https://search.yahoo.com/search?p=';
                   break;
  }
}

browser.runtime.onMessage.addListener(handleFormSelection);
