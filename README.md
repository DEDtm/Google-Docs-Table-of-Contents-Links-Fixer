# Google Docs Table of Contents Links Fixer

A Google Apps Script that automatically fixes or removes broken Table of Contents links in Google Docs. It scans all headings, inserts bookmarks, and updates in-document links to point correctly to those bookmarks.

## ⚙️ How It Works

1. Iterates through all paragraphs in the document body and identifies those styled as headings (Heading 1–6).
    
2. Inserts a unique bookmark at the start of each heading.
    
3. Searches every text element for links containing `#heading=` patterns (including `?tab=t.0#heading=`).
    
4. Matches each link’s display text against the collected heading texts (exact or partial match).
    
5. Replaces the old link URL with a new bookmark URL (`#bookmark=<ID>`).
    
6. Logs each correction. Use the additional `removeBrokenLinks` function to delete any unresolved links.
    

## 🚀 Getting Started

### 📝 For a New Project

1. Open your Google Doc.
    
2. Go to **Extensions → Apps Script**.
    
3. Remove existing template code.
    
4. Copy and paste the entire script into the editor.
    
5. Save the project as **Google Docs Table of Contents Links Fixer**.
    
6. Select and run the `fixTableOfContentsLinks` function.
    
7. Authorize when prompted.
    

### 📄 For an Existing Document

1. Open the target Google Doc.
    
2. Navigate to **Extensions → Apps Script** and open your **Google Docs Table of Contents Links Fixer** project.
    
3. Ensure the script is saved.
    
4. In the Apps Script editor, choose `fixTableOfContentsLinks` and click **Run**.
    
5. Grant permissions if required.
    
6. Verify that links are corrected.
    
7. 🗑️ Optionally, run `removeBrokenLinks` to clean up any remaining broken links.
    

## 📋 Requirements

- A Google account with access to Google Docs.
    
- Use of built-in heading styles (Heading 1–6).
    
- Permission to run Apps Script (view/edit the document).
    

## ⚠️ Limitations

- Only fixes links whose display text matches heading text (exact or partial)
    
- Cannot resolve links with significantly different text (punctuation, synonyms)
    
- Does not handle external URLs or links to other documents
    
- Bookmarks are inserted at heading start; moving headings may require re-running
    

## 🔧 Functions Overview

- **`fixTableOfContentsLinks()`** - Main function that fixes broken TOC links
    
- **`removeBrokenLinks()`** - Supplementary function that removes unfixable links
    
- **`findTextElements()`** - Helper function for text element traversal
    
- **`findMatchingHeading()`** - Helper function for heading text matching