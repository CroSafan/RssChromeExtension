function save_options() {
    
    var radios = document.getElementsByTagName('input');
    var value;
for (var i = 0; i < radios.length; i++) {
    if (radios[i].type === 'radio' && radios[i].checked) {
        value = radios[i].value;       
    }
}
    
  var smjer =value;
  
  chrome.storage.local.set({
    odabraniSmjer: smjer
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
    function restore_options() {
      // Use default value color = 'red' and likesColor = true.
      chrome.storage.sync.get({
        odabraniSmjer: 'svi',
       
      }, function(items) {
        
       
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].type === 'radio' && radios[i].value===items.odabraniSmjer) {
            radios[i].checked=true;      
        }
    }
        
        //document.getElementById('smjer').value = items.odabraniSmjer;
        
      });
    }
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);