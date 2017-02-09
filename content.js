function main() {
  var rows = document.getElementsByTagName('tr');
  for (var i = 0; i < rows.length; ++i) {
    var headers = rows[i].getElementsByTagName('th');
    if (headers.length > 0) {
      var lastHeader = headers[headers.length - 1];
      if (lastHeader.textContent == 'Lat/Lon') {
        break;
      }
      createCell(lastHeader, 'th', 'Lat/Lon');
    }

    var cells = rows[i].getElementsByTagName('td');
    for (var j = 0; j < cells.length; ++j) {
      var links = cells[j].getElementsByTagName('a');
      if (links.length > 0) {
        var link = links[0].href;
        var parts = link.split('?');
        if (parts.length != 2) {
          continue;
        }
        var params = new URLSearchParams(parts[1]);
        var lat = params.get('lat');
        var lon = params.get('lon');
        if (lat != null && lon != null) {
          createCell(cells[cells.length - 1], 'td', lat + ', ' + lon);
          break;
        }
      }
    }
  }
}

function createCell(node, tag, text) {
  var cell = document.createElement(tag);
  cell.setAttribute('style', 'white-space: nowrap');
  var font = document.createElement('font');
  font.setAttribute('face', 'Arial');
  font.setAttribute('size', '2');
  font.appendChild(document.createTextNode(text));
  cell.appendChild(font);
  node.parentNode.insertBefore(cell, node.nextSibling);
}

main();
