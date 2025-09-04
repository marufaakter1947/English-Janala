const createElements =(arr)=>{
const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
return(htmlElements.join(" "));
};

const manageSpinner = (status)=>{
if(status==true){
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
}
else{
     document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
}
}

const loadLessons = ()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
    .then(res=>res.json())  //promise of json data
    .then((json) => displayLessons(json.data))
};

const removeActive=()=>{
const lessonButtons = document.querySelectorAll(".lesson-btn")
lessonButtons.forEach((btn) => btn.classList.remove("active"));
}
const loadLevelWord=(id)=>{
    manageSpinner(true);
    const url =`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then((data) => {
        removeActive(); //remove all active class
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active"); //add active class
        displayLevelWord(data.data)
    });

};

const loadWordDetail= async (id)=>{
    const url=`https://openapi.programming-hero.com/api/word/${id}`;
    // console.log(url);
    const res=await fetch(url);
    const details = await res.json();
    displayWordDetails(details);

};
const displayWordDetails = (word) =>{
console.log(word);
const detail=word.data;
const detailsBox =document.getElementById("details-container");
detailsBox.innerHTML=`
<div class="">
    <h2 class="text-2xl font-bold"> ${detail.word} ( <i class="fa-solid fa-microphone-lines"></i>    :${detail.pronunciation})</h2>
</div>
<div class="">
    <h2 class="font-bold">Meaning</h2>
    <p>${detail.meaning}</p>
</div>
<div class="">
    <h2 class="font-bold">Example</h2>
    <p>${detail.sentence}</p>
</div>
<div class="">
    <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
   <div class="">${createElements(detail.synonyms)}</div>
</div>
`;

document.getElementById("word_modal").showModal();
}

const displayLevelWord =(words)=>{
const wordContainer =document.getElementById("word-container");
wordContainer.innerHTML="";

if(words.length == 0){
wordContainer.innerHTML=` <div class="text-center col-span-full space-y-6">
 <img class="mx-auto" src="./assets/alert-error.png" alt="error image">
        <p class="text-xl font-semibold text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bold text-4xl" >নেক্সট Lesson এ যান</h2>
       </div>`;
       manageSpinner(false);
    return;
}

for(let word of words){
    const card =document.createElement("div");
    card.innerHTML=`
    <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাত্তয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning /Pronunciation</p>

            <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "অর্থ পাত্তয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাত্তয়া যায়নি"}"</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>

        </div>
    `;
    wordContainer.append(card);
};
manageSpinner(false);
}

const displayLessons=(lessons)=>{
// 1.get the container and make empty
const levelContainer =document.getElementById("level-container");
levelContainer.innerHTML="";
// 2.get into every lessons
for(let lesson of lessons){
// 3.create element
const btnDiv =document.createElement("div");
btnDiv.innerHTML=` 
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
     
`
// 4.append into container
levelContainer.append(btnDiv);
}

};

loadLessons();