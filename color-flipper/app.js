const colors = ["green", "red", "rgba(133,122,200)", "#f15025"]
const btn = document.getElementById("btn")
const color = document.querySelector(".color")
let getRandomNumber = ()=> {
    let random = Math.floor(Math.random() * colors.length)
    return random
}
btn.addEventListener("click", ()=>{
    const randomNumber = getRandomNumber()
    console.log(randomNumber)
    document.body.style.backgroundColor = colors[randomNumber]
    color.textContent = colors[randomNumber]
})
