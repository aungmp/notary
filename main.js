


async function selectBook(selectBook, bookName) {

    let url = "books/" + selectBook;
    const bookTitle = document.getElementById('fileName')
    const bookContents = document.getElementById('fileContent')

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Http error " + response.status);
        }
        let dataBook = await response.text();
        startFilteringDoc(dataBook);
        let filteredBook = dataBook.replace(/(?:\r\n|\r|\n)/g, '<br>');

        bookTitle.innerText = bookName;
        bookContents.innerHTML = filteredBook;
    } catch (error) {
        bookContents.innerHTML = "Error loading book: " + error.message;
    }

}

function startFilteringDoc(dataOfBook) {

    const mostUsed = document.getElementById('mostUsed');
    const lestUsed = document.getElementById('lestUsed');
    const docLength = document.getElementById('docLecgth');
    const wordCount = document.getElementById('wordCount');
 

    let texts = dataOfBook.toLowerCase();
    let removeSpaceTexts = texts.match(/\b\S+\b/g);
    docLength.innerText = "Document length :" + removeSpaceTexts.length;
    wordCount.innerText = " Word Count :" + texts.length;

    var allWrods = filterStopWords(removeSpaceTexts);
    let wordDictionary = {};
    for (let word in allWrods) {
        let wordValue = allWrods[word];

        if (wordDictionary[wordValue] > 0) {
            wordDictionary[wordValue] += 1;
        } else {
            wordDictionary[wordValue] = 1;
        }


    }


    let fiveMostUsedWord = getMostUsedWord(wordDictionary);
    let fiveLestUsedWord = getLestUsedWord(wordDictionary);

    addtoTemplate(fiveMostUsedWord, mostUsed);
    addtoTemplate(fiveLestUsedWord, lestUsed);


}

function addtoTemplate(items, template) {

    let templateLi = document.getElementById('template-ul-items');
    let templateHTML = templateLi.innerHTML;
    let result = '';
    for (i = 0; i < items.length; i++) {
        singleResult = items[i][0] + " : " + items[i][1] + " times" + "<br>";
        result += singleResult;

    }
    templateHTML = result;
    template.innerHTML = templateHTML;

}


function getMostUsedWord(wordDictionary) {
    let dataArray = Object.entries(wordDictionary);
    dataArray.sort(function (first, second) {
        return second[1] - first[1];
    })
    return dataArray.slice(0, 5);
}
function getLestUsedWord(wordDictionary) {
    let dataArray = Object.entries(wordDictionary);
    dataArray.sort(function (first, second) {
        return first[1] - second[1];
    })

    return dataArray.slice(0, 5);
}

function filterStopWords(wordArray) {

    var stopWrods = getStopWords().map(w => w.trim().toLowerCase());

    return wordArray.filter(word =>
        !stopWrods.includes(word.trim().toLowerCase())
    )



}


function getStopWords() {
    return ["the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
        "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
        "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
        "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
        "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
        "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
        "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "was", "had", "is", "been", "were", "are", "more", "now", "these"]
}


function preformMark(){
    const searchstat=document.getElementById('searchstat');
   const value= document.getElementById('keyword').value;
   const contents=document.getElementById('fileContent');
    var newContent="";
    var reg=new RegExp(value,"gi");
    var replaceText="<mark id='markme'>$&</mark>";
    var bookContents=contents.innerHTML;
     newContent=bookContents.replace(reg,replaceText);
        contents.innerHTML=newContent;

    var count=document.querySelectorAll('mark').length;
    searchstat.innerHTML= "Found "+ count +" matchs";
    if(count > 0){
    var element = document.getElementById('markme'); // or 'markeme' if that's correct
    if(element) {
        element.scrollIntoView();
    }
}
 
  

}
