let intervalId = null;
let countdownIntervalId = null;
let finalUrl = '';
let countdown = 30;
let trackingActive = false;
let url = ''

document.getElementById('trackToggleBtn').addEventListener('click', () => {
    let rawUrl = document.getElementById('urlInput').value;
    url = normalizeUrl(rawUrl);

    if (!trackingActive) {
        if (!url) {
            return;
        }

        finalUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`${url}/nextmatches.json`)}`;
        fetchAndDisplay();
        startTracking();
    } else {
        stopTracking(true);
    }
});

document.getElementById('refreshBtn').addEventListener('click', () => {
    let rawUrl = document.getElementById('urlInput').value;
    url = normalizeUrl(rawUrl);
    if (!url) {
        return;
    }

    finalUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`${url}/nextmatches.json`)}`;
    fetchAndDisplay();

    if (trackingActive) {
        stopTracking(false);
        startTracking();
    }
});

document.getElementById('clearBtn').addEventListener('click', () => {
    // Stop tracking if active
    if (intervalId) clearInterval(intervalId);
    if (countdownIntervalId) clearInterval(countdownIntervalId);
    intervalId = null;
    countdownIntervalId = null;
    trackingActive = false;

    // Reset UI state
    document.getElementById('trackToggleBtn').textContent = 'Start Tracking';
    document.getElementById('countdown').textContent = '-';
    document.getElementById('output').innerHTML = '';
});

function normalizeUrl(rawUrl) {
    // Trim any extra spaces
    const url = rawUrl.trim();

    if (url.match(/\.html$/)) {
        return url.replace(/\/[^/]*\.html$/, '');
    } else if (url.endsWith('/')) {
        return url.slice(0, -1);
    } else if (url.match(/^https:\/\/live\.ippon\.org\.il\/[A-Za-z0-9]+$/)) {
        return url;
    } else {
        alert('Invalid URL: typically https://live.ippon.org.il/<competition name>. must end with *.html, / or competition name');
        return null;
    }
}

// Fetch and display function
function fetchAndDisplay() {
    if (!finalUrl) return;

    fetch(finalUrl)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            data = [
                {
                    "tatami": 1,
                    "matches": [
                        {
                            "num": 0,
                            "cat": "F10-63",
                            "first1": "דנה",
                            "last1": "הוסיאוסקי",
                            "club1": "מיטב ירושלים"
                        },
                        {
                            "num": 1,
                            "cat": "F09-48",
                            "first1": "יליזבטה",
                            "last1": "לזר",
                            "club1": "יוניפייט חיפה",
                            "first2": "אגם",
                            "last2": "נוי",
                            "club2": "מיטב ירושלים"
                        },
                        {
                            "num": 2,
                            "cat": "F10-57",
                            "first1": "ליה",
                            "last1": "רוז-פסח",
                            "club1": "מכבי הרצליה",
                            "first2": "עדן",
                            "last2": "צרפתי",
                            "club2": "מיטב ירושלים"
                        },
                        {
                            "num": 3,
                            "cat": "F07-78",
                            "first1": "טלי",
                            "last1": "חורש",
                            "club1": "ה.ל.ה.ב",
                            "first2": "שחר",
                            "last2": "עמידן",
                            "club2": "מיטב ירושלים"
                        },
                        {
                            "num": 4,
                            "cat": "F10-57",
                            "first1": "שקירה",
                            "last1": "איסייבה ",
                            "club1": "סיכוי לצעירים חיפה",
                            "first2": "אורי",
                            "last2": "דמרי",
                            "club2": "עצמה מרכז פתח תקווה"
                        },
                        {
                            "num": 5,
                            "cat": "F09-48",
                            "first1": "מיקה",
                            "last1": "צוקרמן",
                            "club1": "עצמה מרכז פתח תקווה",
                            "first2": "אלה",
                            "last2": "ברלב",
                            "club2": "מיטב נתניה"
                        },
                        {
                            "num": 6,
                            "cat": "F10-57",
                            "first1": "איה",
                            "last1": "רפאלי",
                            "club1": "מיטב נתניה",
                            "first2": "ספיר",
                            "last2": "אביגדור",
                            "club2": "אדם בספורט"
                        },
                        {
                            "num": 7,
                            "cat": "F07-78",
                            "first1": "טלי",
                            "last1": "חורש",
                            "club1": "ה.ל.ה.ב",
                            "first2": "שחר",
                            "last2": "עמידן",
                            "club2": "מיטב ירושלים"
                        },
                        {
                            "num": 8,
                            "cat": "F10-57",
                            "first1": "עלמה",
                            "last1": "עמיחי",
                            "club1": "ה.ל.ה.ב",
                            "first2": "דניאלה",
                            "last2": "חסיד",
                            "club2": "מכבי רפאל תל אביב"
                        },
                        {
                            "num": 9,
                            "cat": "F09-48",
                            "first1": "שלי",
                            "last1": "פלימק",
                            "club1": "מכבי הרצליה",
                            "first2": "יליזבטה",
                            "last2": "לזר",
                            "club2": "יוניפייט חיפה"
                        },
                        {
                            "num": 10,
                            "cat": "F10-57",
                            "first1": "רון",
                            "last1": "דהן",
                            "club1": "מרכז קהילתי הגליל התחתון",
                            "first2": "ירדן",
                            "last2": "מצליח",
                            "club2": "מיטב רחובות"
                        }
                    ]
                },
                {
                    "tatami": 2,
                    "matches": [
                        {
                            "num": 0,
                            "cat": "",
                            "first1": "",
                            "last1": "",
                            "club1": ""
                        }
                    ]
                },
                {
                    "tatami": 3,
                    "matches": [
                        {
                            "num": 0,
                            "cat": "M06+100",
                            "first1": "יוסף",
                            "last1": "זיאדי",
                            "club1": "עמותת פיסגה"
                        },
                        {
                            "num": 1,
                            "cat": "F07-52",
                            "first1": "כרמל",
                            "last1": "אשל",
                            "club1": "ה.ל.ה.ב",
                            "first2": "שחף",
                            "last2": "דהן",
                            "club2": "איזי גודו הרצליה"
                        },
                        {
                            "num": 2,
                            "cat": "F07-52",
                            "first1": "שקד",
                            "last1": "אהרוני",
                            "club1": "מיטב מודיעין",
                            "first2": "רומי",
                            "last2": "בירנבוים",
                            "club2": "עמותת פיסגה"
                        },
                        {
                            "num": 3,
                            "cat": "M06+100",
                            "first1": "יוסף",
                            "last1": "זיאדי",
                            "club1": "עמותת פיסגה",
                            "first2": "אוהד",
                            "last2": "חיימוב",
                            "club2": "מיטב בת ים"
                        },
                        {
                            "num": 4,
                            "cat": "M06+100",
                            "first1": "יוסף",
                            "last1": "זיאדי",
                            "club1": "עמותת פיסגה",
                            "first2": "אוהד",
                            "last2": "חיימוב",
                            "club2": "מיטב בת ים"
                        },
                        {
                            "num": 5,
                            "cat": "M08-73",
                            "first1": "זיו",
                            "last1": "שקד",
                            "club1": "ה.ל.ה.ב",
                            "first2": "אמיל",
                            "last2": "פרצב",
                            "club2": "מיטב בת ים"
                        },
                        {
                            "num": 6,
                            "cat": "M08-73",
                            "first1": "נווה",
                            "last1": "דאואן",
                            "club1": "מיטב ספורטילנד שהם",
                            "first2": "יואב",
                            "last2": "נירים",
                            "club2": "האגודה לגודו ים"
                        },
                        {
                            "num": 7,
                            "cat": "M08-73",
                            "first1": "יאיר",
                            "last1": "מילר",
                            "club1": "מיטב רחובות",
                            "first2": "דוד",
                            "last2": "סמויילוב",
                            "club2": "יוניפייט חיפה"
                        },
                        {
                            "num": 8,
                            "cat": "M08-73",
                            "first1": "טל",
                            "last1": "ברוז'ניצקי",
                            "club1": "עצמה כפר סבא",
                            "first2": "עומר",
                            "last2": "חביבי",
                            "club2": "מכבי חיפה כרמל"
                        },
                        {
                            "num": 9,
                            "cat": "M08-73",
                            "first1": "אריה",
                            "last1": "הרצפלד",
                            "club1": "מיטב מודיעין",
                            "first2": "עידו",
                            "last2": "בן ליש",
                            "club2": "יוניפייט חיפה"
                        },
                        {
                            "num": 10,
                            "cat": "M08-73",
                            "first1": "איליי",
                            "last1": "פימה",
                            "club1": "עצמה מרכז פתח תקווה",
                            "first2": "ליעד רם",
                            "last2": "מרלי",
                            "club2": "ע.ל.ס גבעתיים"
                        }
                    ]
                },
                {
                    "tatami": 4,
                    "matches": [
                        {
                            "num": 0,
                            "cat": "F09-57",
                            "first1": "מעיין",
                            "last1": "פלישמן",
                            "club1": "עצמה כפר סבא"
                        },
                        {
                            "num": 1,
                            "cat": "F09-78",
                            "first1": "נועה",
                            "last1": "עגמון",
                            "club1": "מיטב ירושלים",
                            "first2": "ניקול",
                            "last2": "רדציג",
                            "club2": "מיטב קריית אתא"
                        },
                        {
                            "num": 2,
                            "cat": "F09-63",
                            "first1": "הילה",
                            "last1": "סטקלר",
                            "club1": "ה.ל.ה.ב",
                            "first2": "יובל",
                            "last2": "אוהב ציון",
                            "club2": "איפון לקידום הגודו בשרון"
                        },
                        {
                            "num": 3,
                            "cat": "F08-57",
                            "first1": "גיל",
                            "last1": "פרי",
                            "club1": "מיטב תל אביב",
                            "first2": "טליה",
                            "last2": "הרני",
                            "club2": "מיטב תל אביב"
                        },
                        {
                            "num": 4,
                            "cat": "F09-63",
                            "first1": "רותם הדר",
                            "last1": "דוד",
                            "club1": "עצמה מרכז פתח תקווה",
                            "first2": "מעיין",
                            "last2": "אלה",
                            "club2": "מיטב ירושלים"
                        },
                        {
                            "num": 5,
                            "cat": "F09-78",
                            "first1": "גפן",
                            "last1": "ברזילי",
                            "club1": "גודוגו האקדמיה הראשונה לגודו",
                            "first2": "אליה",
                            "last2": "יוסף",
                            "club2": "אדם בספורט גודו בראשון לציון"
                        },
                        {
                            "num": 6,
                            "cat": "M08-66",
                            "first1": "אריאל",
                            "last1": "פרברוף",
                            "club1": "מיטב רחובות",
                            "first2": "ארבל",
                            "last2": "נבון",
                            "club2": "מיטב נתניה"
                        },
                        {
                            "num": 7,
                            "cat": "F08-57",
                            "first1": "טליה",
                            "last1": "קסירר",
                            "club1": "מכבי רפאל תל אביב",
                            "first2": "גל",
                            "last2": "שניידר",
                            "club2": "מיטב נתניה"
                        },
                        {
                            "num": 8,
                            "cat": "M08-66",
                            "first1": "דניאל",
                            "last1": "לוגינוב",
                            "club1": "עמותת פיסגה",
                            "first2": "לביא",
                            "last2": "חדד",
                            "club2": "מיטב בת ים"
                        },
                        {
                            "num": 9,
                            "cat": "F09-70",
                            "first1": "לינוי",
                            "last1": "אדיב",
                            "club1": "מיטב תל אביב",
                            "first2": "עמית",
                            "last2": "צל",
                            "club2": "מכבי רפאל תל אביב"
                        },
                        {
                            "num": 10,
                            "cat": "M08-66",
                            "first1": "עידו",
                            "last1": "זוילי",
                            "club1": "גודוגו האקדמיה הראשונה לגודו",
                            "first2": "איתמר",
                            "last2": "סגל ",
                            "club2": "איפון לקידום הגודו בשרון"
                        }
                    ]
                },
                {
                    "tatami": 5,
                    "matches": [
                        {
                            "num": 0,
                            "cat": "F10-70",
                            "first1": "רוני",
                            "last1": "חאיק",
                            "club1": "אדם בספורט"
                        },
                        {
                            "num": 1,
                            "cat": "M06-60",
                            "first1": "איתן",
                            "last1": "שרוני",
                            "club1": "מיטב ירושלים",
                            "first2": "אסף",
                            "last2": "תמם",
                            "club2": "ה.ל.ה.ב"
                        },
                        {
                            "num": 2,
                            "cat": "F10-70",
                            "first1": "אביטל",
                            "last1": "קונדה",
                            "club1": "עצמה מרכז פתח תקווה",
                            "first2": "ניזה",
                            "last2": "אילייב",
                            "club2": "עצמה האתלט ראשלצ"
                        },
                        {
                            "num": 3,
                            "cat": "M06-60",
                            "first1": "שילה",
                            "last1": "שולמן",
                            "club1": "מיטב בת ים",
                            "first2": "שליו",
                            "last2": "הראל",
                            "club2": "עצמה האתלט ראשלצ"
                        },
                        {
                            "num": 4,
                            "cat": "F10-70",
                            "first1": "אריאלה",
                            "last1": "פרנקל",
                            "club1": "מיטב בת ים",
                            "first2": "יבגניה",
                            "last2": "פופוב",
                            "club2": "יוניפייט חיפה"
                        },
                        {
                            "num": 5,
                            "cat": "M06-66",
                            "first1": "פלג",
                            "last1": "דהן",
                            "club1": "איזי גודו הרצליה",
                            "first2": "יבגני",
                            "last2": "חייט",
                            "club2": "מיטב נתניה"
                        },
                        {
                            "num": 6,
                            "cat": "F10-70",
                            "first1": "אביטל",
                            "last1": "קונדה",
                            "club1": "עצמה מרכז פתח תקווה",
                            "first2": "רוני",
                            "last2": "חאיק",
                            "club2": "אדם בספורט"
                        },
                        {
                            "num": 7,
                            "cat": "M06-66",
                            "first1": "נתנאל",
                            "last1": "דרעי",
                            "club1": "יוניפייט חיפה",
                            "first2": "איתי",
                            "last2": "כהן",
                            "club2": "מכבי רפאל תל אביב"
                        },
                        {
                            "num": 8,
                            "cat": "F10-70",
                            "first1": "ניזה",
                            "last1": "אילייב",
                            "club1": "עצמה האתלט ראשלצ",
                            "first2": "אריאלה",
                            "last2": "פרנקל",
                            "club2": "מיטב בת ים"
                        },
                        {
                            "num": 9,
                            "cat": "M06-60",
                            "first1": "יונתן",
                            "last1": "קפלן יונג",
                            "club1": "מיטב נתניה",
                            "first2": "",
                            "last2": "",
                            "club2": ""
                        },
                        {
                            "num": 10,
                            "cat": "F10-70",
                            "first1": "אביטל",
                            "last1": "קונדה",
                            "club1": "עצמה מרכז פתח תקווה",
                            "first2": "יבגניה",
                            "last2": "פופוב",
                            "club2": "יוניפייט חיפה"
                        }
                    ]
                },
                {
                    "tatami": 6,
                    "matches": [
                        {
                            "num": 0,
                            "cat": "F10-48",
                            "first1": "רני",
                            "last1": "ארגמן",
                            "club1": "מיטב ירושלים"
                        },
                        {
                            "num": 1,
                            "cat": "F09-52",
                            "first1": "שי",
                            "last1": "אשכנזי",
                            "club1": "מכבי חיפה כרמל",
                            "first2": "רומי",
                            "last2": "צוקרמן",
                            "club2": "עצמה מרכז פתח תקווה"
                        },
                        {
                            "num": 2,
                            "cat": "M08-100",
                            "first1": "גיל",
                            "last1": "תורן",
                            "club1": "אדם בספורט",
                            "first2": "עידו",
                            "last2": "ישעיהו",
                            "club2": "אדם בספורט"
                        },
                        {
                            "num": 3,
                            "cat": "F09-52",
                            "first1": "גילי רחלי",
                            "last1": "וולסטר",
                            "club1": "מיטב נתניה",
                            "first2": "רותם",
                            "last2": "לוי",
                            "club2": "גודוגו האקדמיה הראשונה לגודו"
                        },
                        {
                            "num": 4,
                            "cat": "F10-48",
                            "first1": "ליאם",
                            "last1": "הרפז",
                            "club1": "מכבי רפאל תל אביב",
                            "first2": "מריה",
                            "last2": "קרוגליאק ",
                            "club2": "סיכוי לצעירים חיפה"
                        },
                        {
                            "num": 5,
                            "cat": "M08-55",
                            "first1": "גילעד",
                            "last1": "גולדמן",
                            "club1": "מיטב ירושלים",
                            "first2": "אלירן",
                            "last2": "חרון זדה",
                            "club2": "מיטב אשדוד"
                        },
                        {
                            "num": 6,
                            "cat": "M08-100",
                            "first1": "גיל",
                            "last1": "תורן",
                            "club1": "אדם בספורט",
                            "first2": "עידו",
                            "last2": "ישעיהו",
                            "club2": "אדם בספורט"
                        },
                        {
                            "num": 7,
                            "cat": "M08-55",
                            "first1": "גיא",
                            "last1": "רון",
                            "club1": "מכבי רפאל תל אביב",
                            "first2": "רומן",
                            "last2": "דודרב",
                            "club2": "עמותת פיסגה"
                        },
                        {
                            "num": 8,
                            "cat": "F10-48",
                            "first1": "ענת",
                            "last1": "אוחוטסקי",
                            "club1": "מיטב בת ים",
                            "first2": "רני",
                            "last2": "ארגמן",
                            "club2": "מיטב ירושלים"
                        },
                        {
                            "num": 9,
                            "cat": "M08-55",
                            "first1": "לידור",
                            "last1": "גרט",
                            "club1": "מיטב בת ים",
                            "first2": "גלי",
                            "last2": "רולניק",
                            "club2": "מיטב ירושלים"
                        },
                        {
                            "num": 10,
                            "cat": "M08-100",
                            "first1": "גיל",
                            "last1": "תורן",
                            "club1": "אדם בספורט",
                            "first2": "עידו",
                            "last2": "ישעיהו",
                            "club2": "אדם בספורט"
                        }
                    ]
                },
                {
                    "tatami": 7,
                    "matches": [
                        {
                            "num": 0,
                            "cat": "M08-60",
                            "first1": "מעין",
                            "last1": "שלף",
                            "club1": "מיטב נתניה"
                        },
                        {
                            "num": 1,
                            "cat": "M08-60",
                            "first1": "יהונתן",
                            "last1": "מילר",
                            "club1": "מכבי רפאל תל אביב",
                            "first2": "יאיר",
                            "last2": "דיין",
                            "club2": "מיטב מודיעין"
                        },
                        {
                            "num": 2,
                            "cat": "F1078+",
                            "first1": "רוני",
                            "last1": "רוזנפלד",
                            "club1": "עמ.לק. הספורט אשכול",
                            "first2": "עדי",
                            "last2": "רובין",
                            "club2": "אדם בספורט"
                        },
                        {
                            "num": 3,
                            "cat": "M08-60",
                            "first1": "מאור",
                            "last1": "פרידמן",
                            "club1": "מיטב ירושלים",
                            "first2": "טל",
                            "last2": "גולדשמידט",
                            "club2": "ה.ל.ה.ב"
                        },
                        {
                            "num": 4,
                            "cat": "F09-44",
                            "first1": "שי-לי",
                            "last1": "נחמנזון",
                            "club1": "מיטב נתניה",
                            "first2": "ליאנה",
                            "last2": "וירביאנץ",
                            "club2": "מיטב נתניה"
                        },
                        {
                            "num": 5,
                            "cat": "M08-60",
                            "first1": "יהונתן",
                            "last1": "אורנשטיין",
                            "club1": "מיטב ירושלים",
                            "first2": "דן",
                            "last2": "מנג'ם",
                            "club2": "עמותת פיסגה"
                        },
                        {
                            "num": 6,
                            "cat": "F06+78",
                            "first1": "עמר",
                            "last1": "דדון",
                            "club1": "עמותת פיסגה",
                            "first2": "יסמין",
                            "last2": "קופצבסקי",
                            "club2": "מיטב רחובות"
                        },
                        {
                            "num": 7,
                            "cat": "M08-60",
                            "first1": "חנוך",
                            "last1": "שעשוע",
                            "club1": "יוניפייט חיפה",
                            "first2": "איתמר",
                            "last2": "אשואל",
                            "club2": "גודוגו האקדמיה הראשונה לגודו"
                        },
                        {
                            "num": 8,
                            "cat": "F1078+",
                            "first1": "תמר",
                            "last1": "מגרה",
                            "club1": "מיטב בת ים",
                            "first2": "רותם",
                            "last2": "נר גאון",
                            "club2": "עמותת פיסגה"
                        },
                        {
                            "num": 9,
                            "cat": "M08-60",
                            "first1": "ליאב",
                            "last1": "יעקבי",
                            "club1": "מכבי חיפה כרמל",
                            "first2": "יהונתן",
                            "last2": "הרונגי",
                            "club2": "עצמה מרכז פתח תקווה"
                        },
                        {
                            "num": 10,
                            "cat": "F09-44",
                            "first1": "לי ים",
                            "last1": "שטרק",
                            "club1": "מכבי רפאל תל אביב",
                            "first2": "רבקה",
                            "last2": "איצקוב",
                            "club2": "יוניפייט חיפה"
                        }
                    ]
                },
                {
                    "tatami": 8,
                    "matches": [
                        {
                            "num": 0,
                            "cat": "",
                            "first1": "",
                            "last1": "",
                            "club1": ""
                        }
                    ]
                },
                {
                    "tatami": 9,
                    "matches": [
                        {
                            "num": 0,
                            "cat": "F07-48",
                            "first1": "מאיה",
                            "last1": "סטולר",
                            "club1": "גודוגו האקדמיה הראשונה לגודו"
                        },
                        {
                            "num": 1,
                            "cat": "M08-81",
                            "first1": "אורן",
                            "last1": "צביה ",
                            "club1": "פייטינג ספיריט",
                            "first2": "טל",
                            "last2": "אשכנזי",
                            "club2": "מיטב נתניה"
                        },
                        {
                            "num": 2,
                            "cat": "F07-48",
                            "first1": "מישל",
                            "last1": "קורולפ",
                            "club1": "עצמה האתלט ראשלצ",
                            "first2": "ליה",
                            "last2": "הולנדר",
                            "club2": "מיטב אילת"
                        },
                        {
                            "num": 3,
                            "cat": "M08-81",
                            "first1": "מקסים",
                            "last1": "צרקבסקי",
                            "club1": "מכבי חיפה כרמל",
                            "first2": "פלג",
                            "last2": "קול",
                            "club2": "מיטב בת ים"
                        },
                        {
                            "num": 4,
                            "cat": "F07-48",
                            "first1": "לי אור",
                            "last1": "לריה",
                            "club1": "גודוגו האקדמיה הראשונה לגודו",
                            "first2": "מישל",
                            "last2": "קורולפ",
                            "club2": "עצמה האתלט ראשלצ"
                        },
                        {
                            "num": 5,
                            "cat": "M08-81",
                            "first1": "מיכאל",
                            "last1": "אוברמנקו",
                            "club1": "עצמה האתלט ראשלצ",
                            "first2": "יוסף",
                            "last2": "ימין",
                            "club2": "הפועל בני ברק"
                        },
                        {
                            "num": 6,
                            "cat": "F07-48",
                            "first1": "מאיה",
                            "last1": "סטולר",
                            "club1": "גודוגו האקדמיה הראשונה לגודו",
                            "first2": "ליה",
                            "last2": "הולנדר",
                            "club2": "מיטב אילת"
                        },
                        {
                            "num": 7,
                            "cat": "M08-81",
                            "first1": "יהלי",
                            "last1": "ליברמן",
                            "club1": "מיטב ספורטילנד שהם",
                            "first2": "תומר",
                            "last2": "זוארץ",
                            "club2": "ה.ל.ה.ב"
                        },
                        {
                            "num": 8,
                            "cat": "F07-48",
                            "first1": "לי אור",
                            "last1": "לריה",
                            "club1": "גודוגו האקדמיה הראשונה לגודו",
                            "first2": "ליה",
                            "last2": "הולנדר",
                            "club2": "מיטב אילת"
                        },
                        {
                            "num": 9,
                            "cat": "M06-81",
                            "first1": "פיליף",
                            "last1": "סווירידוב",
                            "club1": "יוניפייט חיפה",
                            "first2": "רועי",
                            "last2": "שושני",
                            "club2": "מכבי מעלה אדומים"
                        },
                        {
                            "num": 10,
                            "cat": "F07-48",
                            "first1": "מאיה",
                            "last1": "סטולר",
                            "club1": "גודוגו האקדמיה הראשונה לגודו",
                            "first2": "מישל",
                            "last2": "קורולפ",
                            "club2": "עצמה האתלט ראשלצ"
                        }
                    ]
                }
            ];
            const searchValue = document.getElementById('searchInput').value.trim().toLowerCase();
            const outputContainer = document.getElementById('output');
            outputContainer.innerHTML = ''; // Clear old content

            data.forEach(tatami => {
                const filteredMatches = tatami.matches
                    .filter(match => match.num !== 0)
                    .filter(match => {
                        const fields = [
                            `${match.first1} ${match.last1}`,
                            `${match.last1} ${match.first1}`,
                            `${match.first2 ?? ''} ${match.last2 ?? ''}`,
                            `${match.last2 ?? ''} ${match.first2 ?? ''}`,
                            match.club1,
                            match.club2
                        ].join(' ').toLowerCase();
                        return fields.includes(searchValue);
                    });

                if (filteredMatches.length === 0) return;

                // Create tatami block
                const tatamiBlock = document.createElement('div');
                tatamiBlock.className = 'tatami-block';

                // Tatami header
                const header = document.createElement('div');
                header.className = 'tatami-header';
                header.textContent = `Tatami ${tatami.tatami}`;
                tatamiBlock.appendChild(header);

                // Fights grid container
                const grid = document.createElement('div');
                grid.className = 'fights-grid';

                filteredMatches.forEach(match => {
                    const fightsIn = match.num - 1;
                    let title;
                    if (fightsIn === 0) {
                        title = 'Current Fight';
                    } else if (fightsIn === 1) {
                        title = 'Next Fight';
                    } else {
                        title = `In ${fightsIn} Fights`;
                    }

                    // Match card
                    const wrapper = document.createElement('div');
                    wrapper.className = 'match-card';
                    if (fightsIn <= 1) wrapper.classList.add('highlight');

                    // Category
                    const catDiv = document.createElement('div');
                    catDiv.className = 'match-category';
                    catDiv.textContent = match.cat;

                    // White side
                    const whiteDiv = document.createElement('div');
                    whiteDiv.className = 'match-white';
                    whiteDiv.innerHTML = `${match.first1} ${match.last1}<br>${match.club1}`;

                    // Blue side
                    const blueDiv = document.createElement('div');
                    blueDiv.className = 'match-blue';
                    blueDiv.innerHTML = `${match.first2} ${match.last2}<br>${match.club2}`;

                    // Title
                    const titleDiv = document.createElement('div');
                    titleDiv.className = 'match-title';
                    titleDiv.textContent = title;

                    wrapper.appendChild(titleDiv);
                    wrapper.appendChild(catDiv);
                    wrapper.appendChild(whiteDiv);
                    wrapper.appendChild(blueDiv);

                    grid.appendChild(wrapper);
                });

                tatamiBlock.appendChild(grid);
                outputContainer.appendChild(tatamiBlock);
            });

            if (outputContainer.innerHTML.trim() === '') {
                outputContainer.textContent = 'No matching fights found.';
            }
        })
        .catch(error => {
            document.getElementById('output').textContent = `Error: ${error.message}`;
        });
}

function startTracking() {
    // Start tracking: Start both fetch and countdown intervals
    intervalId = setInterval(() => {
        fetchAndDisplay();
        countdown = 30;
    }, 30000);

    countdown = 30;
    document.getElementById('countdown').textContent = countdown;
    countdownIntervalId = setInterval(() => {
        countdown--;
        document.getElementById('countdown').textContent = countdown;
        if (countdown <= 0) countdown = 30;
    }, 1000);

    // Update UI to "Stop Tracking"
    document.getElementById('trackToggleBtn').textContent = 'Stop Tracking';
    trackingActive = true;
}

function stopTracking(isClearUi) {
    // Stop tracking: Clear both intervals
    clearInterval(intervalId);
    clearInterval(countdownIntervalId);
    intervalId = null;
    countdownIntervalId = null;

    if (isClearUi) {
        // Update UI to "Start Tracking"
        document.getElementById('trackToggleBtn').textContent = 'Start Tracking';
        document.getElementById('countdown').textContent = '-';
        trackingActive = false;
    }
}
