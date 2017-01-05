$(document).ready(function() {
//feed to parse


function getFeed(){
  const textarea = document.getElementById('rssfeed');
  textarea.innerHTML="";
   storageOfCurrentFeed = new Array();
  
   chrome.browserAction.setBadgeBackgroundColor({color: "#CF0016"});
   //https://www.mev.hr/index.php/category/racunarstvo-rss/racunarstvo/feed/
const url = 'http://lorem-rss.herokuapp.com/feed?unit=minute';
  
  feednami.load(url)
    .then(feed => {
      textarea.value = '';
      console.log(feed);
      
      
      for(let entry of feed.entries){
        var content="";
        content +="<div class='rrs-item' style='margin: 0 auto; width: 450px; height: auto;border: solid 1px black;display:block;text-overflow:ellipsis;' >"+"<b>"+ entry.title+"</b>";
      content+='<p><a href="'+entry.link+'">'+entry.link+'</a></p>'+"</div>";
     storageOfCurrentFeed.push(entry.guid);  
      textarea.innerHTML+=content;     
      
      
      }
      
      chrome.browserAction.setBadgeText({ text: String(0)});
      
      
      
      
      
      
      
      
      
      
      
      
      
    });
    
        
}


getFeed();


});