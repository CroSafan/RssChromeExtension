$(document).ready(function() {

function getFeed(url){
  const textarea = document.getElementById('rssfeed');
  textarea.innerHTML="";
  storageOfCurrentFeed = new Array();

  chrome.browserAction.setBadgeBackgroundColor({color: "#CF0016"});
  //https://www.mev.hr/index.php/category/racunarstvo-rss/racunarstvo/feed/
  //http://lorem-rss.herokuapp.com/feed?unit=minute
  //feed to parse
  
  feednami.load(url)
    .then(feed => {
      textarea.value = '';
      console.log(feed);      
 
      for(let entry of feed.entries){
        var content="";        
        content +="<div class=' list-group-item '>";
        content+='<a  href="'+entry.link+'" target="_blank"><b><h5>'+entry.title+'<h5></b></a>';       
        storageOfCurrentFeed.push(entry.guid);  
        textarea.innerHTML+=content;     
      }      
      chrome.browserAction.setBadgeText({ text: String(0)});
    });           
}


    chrome.storage.local.get("odabraniSmjer", function(items) {
        //smjer = items.odabraniSmjer;
        if(items.odabraniSmjer==="racunarstvo"){
          getFeed('https://www.mev.hr/index.php/category/racunarstvo-rss/racunarstvo/feed/');
        }else if(items.odabraniSmjer==="menadzment"){
            getFeed('https://www.mev.hr/index.php/category/menadzment-rss/menadzment-turizma-i-sporta/feed/');
        }else if(items.odabraniSmjer==="odrziviRazvoj"){
            getFeed('https://www.mev.hr/index.php/category/odrzivi-razvoj-rss/odrzivi-razvoj/feed/');
        }else if(items.odabraniSmjer==="svi"){
          getFeed('https://www.mev.hr/index.php/feed/');
        }else{
          getFeed('https://www.mev.hr/index.php/feed/');
        }
       
        
      });






});