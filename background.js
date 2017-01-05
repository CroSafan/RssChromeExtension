$(document).ready(function() {

var notificationNumber=1;

function getFeed(){
 chrome.browserAction.getBadgeText({}, function(result) {
    if(result==="0")notificationNumber=1;
});
   storageOfCurrentFeed = new Array();
   
   chrome.browserAction.setBadgeBackgroundColor({color: "#CF0016"});
   //https://www.mev.hr/index.php/category/racunarstvo-rss/racunarstvo/feed/
   //feed to parse
    const url = 'http://lorem-rss.herokuapp.com/feed?unit=minute';
  
  feednami.load(url)
    .then(feed => {
      
      console.log(feed);
     
      
      for(let entry of feed.entries){        
     storageOfCurrentFeed.push(entry.guid);
      }
      chrome.storage.local.get("value", function(items) {   
        // console.log(items);        
        if(feed.entries[0].guid!==items.value[0]){
              chrome.browserAction.setBadgeText({ text: String(notificationNumber)});
                var opt = {
               type: "basic",
               title: feed.entries[0].title,
               message: feed.entries[0].link,
               iconUrl: "icon.png"};                            
            chrome.notifications.create( opt);
            notificationNumber+=1;
        }
    }); 
      
      
      
      
      
      
      chrome.storage.local.set({'value': storageOfCurrentFeed}, function() {
          // Notify that we saved.
          console.log('Settings saved');
        });
      
      
      
      
      
      
      
    });
    
        
}

setInterval(getFeed,10000);
getFeed();


});