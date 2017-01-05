$(document).ready(function() {

function getFeed(){
  const textarea = document.getElementById('rssfeed');
  textarea.innerHTML="";
  storageOfCurrentFeed = new Array();
  
  chrome.browserAction.setBadgeBackgroundColor({color: "#CF0016"});
  //https://www.mev.hr/index.php/category/racunarstvo-rss/racunarstvo/feed/
  //feed to parse
  const url = 'http://lorem-rss.herokuapp.com/feed?unit=minute';
  
  feednami.load(url)
    .then(feed => {
      textarea.value = '';
      console.log(feed);      
      
      for(let entry of feed.entries){
        var content="";
        content +="<div class='rss-item'>"+"<b>"+ entry.title+"</b>";
        content+='<p><a href="'+entry.link+'">'+entry.link+'</a></p>'+"</div>";
        storageOfCurrentFeed.push(entry.guid);  
        textarea.innerHTML+=content;     
      }      
      chrome.browserAction.setBadgeText({ text: String(0)});
    });   
        
}

getFeed();

});