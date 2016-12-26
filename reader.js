function readLog(event) {
    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = storeLog;
    reader.readAsText(file);
}

function storeLog(event) {
    readFile = event.target.result;
    handleLog()
}

function handleLog() {
    filterText = filters.value; 
    if(filterText == 0) {
        fileDisplayArea.innerText = readFile;
    } else {
        var lines = readFile.split(/[\r\n]+/g);
        var filterArray = filterText.replace(', ',',')
        filterArray = filterArray.split(',');
        var result = '';
        for(var i = 0; i < lines.length; i++) {
            var lineContainsText = true;
            for(var j = 0; j < filterArray.length; j++) {
                lineContainsText = lineContainsText && lines[i].includes(filterArray[j]);
            }
            if (lineContainsText) {
                result += lines[i] + '\n';
            } 
        }
        fileDisplayArea.innerText = result;
    }
}

window.onload = function() {
    var fileInput = document.getElementById('fileInput');
    var filters = document.getElementById('filters');
    var fileDisplayArea = document.getElementById('fileDisplayArea');
    var readFile = '';
    fileInput.addEventListener('change', readLog);
    filters.addEventListener('change', handleLog);
}