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
const url = 'http://lorem-rss.herokuapp.com/feed?unit=minute';
  
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
         
         console.log(feed.entries[0].title);
         console.log(items);
         console.log(items.value[1]);
         console.log(items.value.length);
         for(var i=0;i<items.value.length;i++){
            if($.inArray(feed.entries.guid,items.value[0] ) !==-1){
               
               var opt = {
               type: "basic",
               title: feed.entries[i].title,
               message: feed.entries[i].link,
               iconUrl: "icon.png"
};

      chrome.notifications.create( opt);
            }else console.log("failed");
         }
         
         
         
         
         
         }); 
      
      
      
      
      
      
      chrome.storage.sync.set({'value': storageOfCurrentFeed}, function() {
          // Notify that we saved.
          console.log('Settings saved');
        });
      
      
      
      
      
      
      
    });
    
        
}

setInterval(getFeed,60000);
getFeed();


});