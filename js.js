$(document).ready(function() {
//feed to parse

const url = 'https://www.mev.hr/index.php/category/racunarstvo-rss/racunarstvo/feed/';
  const textarea = document.getElementById('rssfeed');
  feednami.load(url)
    .then(feed => {
      textarea.value = '';
      console.log(feed);
      for(let entry of feed.entries){
        textarea.innerHTML +="<div class='rrs-item' style='margin: 0 auto; width: 500x; height: auto;border: solid 1px black;' >"+"<b>"+ entry.title+"</b>"+'<p>'+entry.description+'</p>'+"</div>";
      }
    });
});