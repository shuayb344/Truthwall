const moods = ["Quiet", "Brave", "Silent", "Lost", "Wandering", "Broken", "Rising"];
const animals = ["Wolf", "Eagle", "Lion", "Fox", "Bear", "Hawk", "Panther"];

 function generateAlias(): string {
    const mood = moods[Math.floor(Math.random() * moods.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    const randomNumber = Math.floor(Math.random() * 9999).toString().padStart(5, '0');
    const alias = `${mood}${animal}#${randomNumber}`;
    return alias;
}
generateAlias();  
export default generateAlias;