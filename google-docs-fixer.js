function fixTableOfContentsLinks() {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var elements = body.getNumChildren();
  var headings = [];
  for (var i = 0; i < elements; i++) {
    var element = body.getChild(i);
    if (element.getType() == DocumentApp.ElementType.PARAGRAPH) {
      var paragraph = element.asParagraph();
      var heading = paragraph.getHeading();
      if (heading != DocumentApp.ParagraphHeading.NORMAL) {
        var text = paragraph.getText().trim();
        if (text) {
          var bookmarkId = 'heading_' + i;
          var position = doc.newPosition(paragraph, 0);
          var bookmark = position.insertBookmark();
          headings.push({
            text: text,
            bookmarkId: bookmark.getId(),
            heading: heading
          });
        }
      }
    }
  }
  var textElements = [];
  findTextElements(body, textElements);
  for (var j = 0; j < textElements.length; j++) {
    var textElement = textElements[j];
    var text = textElement.getText();
    for (var k = 0; k < text.length; k++) {
      var url = textElement.getLinkUrl(k);
      if (url && (url.includes('?tab=t.0#heading=') || url.includes('#heading='))) {
        var linkText = '';
        var startIndex = k;
        var endIndex = k;
        while (endIndex < text.length && textElement.getLinkUrl(endIndex) === url) {
          endIndex++;
        }
        linkText = text.substring(startIndex, endIndex);
        var matchingHeading = findMatchingHeading(linkText, headings);
        if (matchingHeading) {
          textElement.setLinkUrl(startIndex, endIndex - 1, null);
          var bookmarkUrl = '#bookmark=' + matchingHeading.bookmarkId;
          textElement.setLinkUrl(startIndex, endIndex - 1, bookmarkUrl);
          console.log('Link corrected: "' + linkText + '" -> ' + bookmarkUrl);
        }
        k = endIndex;
      }
    }
  }
  doc.saveAndClose();
  console.log('Link fix complete!');
}

function findTextElements(element, textElements) {
  if (element.getType() == DocumentApp.ElementType.TEXT) {
    textElements.push(element.asText());
  } else {
    var numChildren = element.getNumChildren ? element.getNumChildren() : 0;
    for (var i = 0; i < numChildren; i++) {
      findTextElements(element.getChild(i), textElements);
    }
  }
}

function findMatchingHeading(linkText, headings) {
  var cleanLinkText = linkText.trim().toLowerCase();
  for (var i = 0; i < headings.length; i++) {
    if (headings[i].text.trim().toLowerCase() === cleanLinkText) {
      return headings[i];
    }
  }
  for (var i = 0; i < headings.length; i++) {
    if (headings[i].text.trim().toLowerCase().includes(cleanLinkText) ||
        cleanLinkText.includes(headings[i].text.trim().toLowerCase())) {
      return headings[i];
    }
  }
  return null;
}

function removeBrokenLinks() {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var textElements = [];
  findTextElements(body, textElements);
  for (var i = 0; i < textElements.length; i++) {
    var textElement = textElements[i];
    var text = textElement.getText();
    for (var j = 0; j < text.length; j++) {
      var url = textElement.getLinkUrl(j);
      if (url && (url.includes('?tab=t.0#heading=') || url.includes('#heading='))) {
        var endIndex = j;
        while (endIndex < text.length && textElement.getLinkUrl(endIndex) === url) {
          endIndex++;
        }
        textElement.setLinkUrl(j, endIndex - 1, null);
        j = endIndex;
      }
    }
  }
  console.log('All broken links have been removed!');
}