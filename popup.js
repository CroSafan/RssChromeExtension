$(document).ready(function() {

function getFeed(){
  const textarea = document.getElementById('rssfeed');
  textarea.innerHTML="";
  storageOfCurrentFeed = new Array();
  
  chrome.browserAction.setBadgeBackgroundColor({color: "#CF0016"});
  //https://www.mev.hr/index.php/category/racunarstvo-rss/racunarstvo/feed/
  //http://lorem-rss.herokuapp.com/feed?unit=minute
  //feed to parse
  const url = 'https://www.mev.hr/index.php/category/racunarstvo-rss/racunarstvo/feed/';
  
  feednami.load(url)
    .then(feed => {
      textarea.value = '';
      console.log(feed);      
   
      for(let entry of feed.entries){
        var content="";
        
        content +="<div class=' list-group-item'>";
        content+='<a href="'+entry.link+'" target="_blank"><b>'+entry.title+'</b></a>';       
        storageOfCurrentFeed.push(entry.guid);  
        textarea.innerHTML+=content;     
      }
      
      chrome.browserAction.setBadgeText({ text: String(0)});
    });   
        
}

getFeed();

});