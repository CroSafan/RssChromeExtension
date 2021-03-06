$(document).ready(function() {

   var notificationNumber=1;
   
   function getFeed(){
    chrome.browserAction.getBadgeText({}, function(result) {
       if(result==="0")notificationNumber=1;
   });
      storageOfCurrentFeed = new Array();
      
      chrome.browserAction.setBadgeBackgroundColor({color: "#CF0016"});
      //https://www.mev.hr/index.php/category/racunarstvo-rss/racunarstvo/feed/
      //http://lorem-rss.herokuapp.com/feed?unit=minute
      //feed to parse
          var url = 'https://www.mev.hr/index.php/category/racunarstvo-rss/racunarstvo/feed/';
          
      chrome.storage.local.get("odabraniSmjer", function(items) {
      switch(items.naziv){
           case "racunarstvo":
            url = 'https://www.mev.hr/index.php/category/racunarstvo-rss/racunarstvo/feed/';
            break;
          case "menadzment":
            url = 'https://www.mev.hr/index.php/category/menadzment-rss/menadzment-turizma-i-sporta/feed/';
            break;
          case "odrziviRazvoj":
            url = 'https://www.mev.hr/index.php/category/odrzivi-razvoj-rss/odrzivi-razvoj/feed/';
            break;
          case 'svi':
            url = 'https://www.mev.hr/index.php/feed/';
            break;
          default :
            url = 'https://www.mev.hr/index.php/feed/';
            break;
      }
      feednami.load(url)
       .then(feed => {      
         console.log(feed);     
         
            for(let entry of feed.entries){        
               storageOfCurrentFeed.push(entry.guid);
            }
            //dohvacanje lokalnog spremista
            chrome.storage.local.get("value", function(items) {   
              //console.log(items);           
              //provjera ako je obavijest nova
              if(feed.entries[0].guid!==items.value[0]){
                    chrome.browserAction.setBadgeText({ text: String(notificationNumber)});
                    var url=feed.entries[0].link;
                      var opt = {
                     type: "basic",
                     title: feed.entries[0].title,
                     message: feed.entries[0].link,
                     iconUrl: "icon.png"};                            
                  chrome.notifications.create(url,opt,function(notificationId){});                  
                  notificationNumber+=1;
              }
          }); 
            //spremanje obavijesti u lokalnu memoriju browsera
            chrome.storage.local.set({'value': storageOfCurrentFeed}, function() {
                // Notify that we saved.
                console.log('Settings saved');
              });
       }); 
      });
   }   
   
   
   chrome.notifications.onClicked.addListener(function(notificationId) {
   chrome.tabs.create({url: notificationId});
   chrome.notification.clear(id, clearCallback);
   notificationNumber--;
}); 
   //provjera svakih 10 sekundi ako postoji nova obavijest
   setInterval(getFeed,10000);
   getFeed();


});