const loadLessons = ()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
    .then(res=>res.json())  //promise of json data
    .then((json) => displayLessons(json.data))
};

const loadLevelWord=(id)=>{
    const url =`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then((data) => displayLevelWord(data.data))

};

const displayLevelWord =(words)=>{
const wordContainer =document.getElementById("word-container");
wordContainer.innerHTML="";

for(let word of words){
    const card =document.createElement("div");
    card.innerHTML=`
    <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p class="font-semibold">Meaning /Pronunciation</p>

            <div class="text-2xl font-medium font-bangla">"${word.meaning} / ${word.pronunciation}"</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>

        </div>
    `;
    wordContainer.append(card);
}
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
        <button onclick="loadLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
     
`
// 4.append into container
levelContainer.append(btnDiv);
}

};

loadLessons();