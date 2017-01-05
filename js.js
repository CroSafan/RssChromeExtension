$(document).ready(function() {
//feed to parse

const url = 'https://www.mev.hr/index.php/category/racunarstvo-rss/racunarstvo/feed/';
  const textarea = document.getElementById('rssfeed');
  feednami.load(url)
    .then(feed => {
      textarea.value = '';
      console.log(feed);
      for(let entry of feed.entries){
        var content="";
        content +="<div class='rrs-item' style='margin: 0 auto; width: 450px; height: auto;border: solid 1px black;display:block;text-overflow:ellipsis;' >"+"<b>"+ entry.title+"</b>";
      content+='<p><a href="'+entry.link+'">'+entry.link+'</a></p>'+"</div>";
      
      textarea.innerHTML+=content;
      }
    });
});