// Load all sites
// Add any new sites here as require first...
import lightnovelworld from './lightnovelworld';

// each scraper needs the functions:
// getChapterNumberFromUrl
// handleCookiePopup
// getNextChapterURL
// getGeneralData
// getChapter

// Then add it to the list of possible sites (separated by ',')
const novelSites = { lightnovelworld };

export default novelSites;
