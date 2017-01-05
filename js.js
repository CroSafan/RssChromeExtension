$(document).ready(function() {
//feed to parse

function getFeed(){
  const textarea = document.getElementById('rssfeed');
  textarea.innerHTML="";
   storageOfCurrentFeed = new Array();
   //storageOfItemsToPush=new Array();
   storageOfSync=new Object();
   chrome.browserAction.setBadgeBackgroundColor({color: "#CF0016"});
   //https://www.mev.hr/index.php/category/racunarstvo-rss/racunarstvo/feed/
const url = 'http://lorem-rss.herokuapp.com/feed?unit=second';
  
  feednami.load(url)
    .then(feed => {
      textarea.value = '';
      console.log(feed);
      var counter=1;
      
      for(let entry of feed.entries){
        var content="";
        content +="<div class='rrs-item' style='margin: 0 auto; width: 450px; height: auto;border: solid 1px black;display:block;text-overflow:ellipsis;' >"+"<b>"+ entry.title+"</b>";
      content+='<p><a href="'+entry.link+'">'+entry.link+'</a></p>'+"</div>";
     storageOfCurrentFeed.push(entry.guid);  
      textarea.innerHTML+=content;     
      chrome.browserAction.setBadgeText({ text: String(counter)});
      counter++;
      }
      chrome.storage.sync.get("value", function(items) {
         console.log(items);
         for(var i =0; i<items.value.length;i++){
         //console.log(storageOfCurrentFeed.entries[i]["rss:guid"]["#"]);
        /* if(items.value[i]===storageOfCurrentFeed.entries[i]["rss:guid"]["#"]){
            var notification = webkitNotifications.createNotification(
  'MEV_LOGO.jpg',  // icon url - can be relative
  storageOfCurrentFeed.entries[i]["rss:title"]["#"],  // notification title
  storageOfCurrentFeed.entries[i]["rss:link"]["#"] // notification body text
);
            
            notification.show();
         }*/
      }
         
         
         
         
         
         }); 
      
      
      
      
      
      
      chrome.storage.sync.set({'value': storageOfCurrentFeed}, function() {
          // Notify that we saved.
          console.log('Settings saved');
        });
      
      var opt = {
  type: "basic",
  title: "Primary Title",
  message: "Primary message to display",
  iconUrl: "icon.png"
};
var id=0;
      chrome.notifications.create( opt);
      
      
      
      
      
    });
    
        
}

setInterval(getFeed,1000000);
getFeed();


});