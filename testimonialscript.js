let data = [
	{
		img: 
"man.png",
		name: "Ben",
		
		msg: `As someone who juggles multiple roles in both my professional 
        and personal life,
        finding an efficient way to organize my time was crucial.  
        This app has been a game-changer for me.`,
	},
	{
		img: 
"women.png",
		name: "Emily",
		
		msg: `I'm grateful for CalenSmart, 
		which has been my go-to platform for
		handling events and meetings. The quality of 
		content here is unmatched.`,
	},
	{
		img: 
"women1.png",
		name: "Claire",
	
		msg: `What sets CalenSmart apart is its user-friendly
         interface.
          Whether it's setting reminders for meetings,
           or keeping track of important deadlines, this app handles 
           it all with ease.`,
	},
];
let i = 0;
let j = data.length;
let testCont = document.getElementById("testimonial-cont");
let prev = document.getElementById("prev");
let next = document.getElementById("next");

let disTestimonial = () => {
	testCont.innerHTML = `
		<p>${data[i].msg}</p>
		<img src=${data[i].img}>
		<h3>${data[i].name}</h3>
	
	`;
};
prev.addEventListener("click", () => {
	i = (j + i - 1) % j;
	disTestimonial();
});
next.addEventListener("click", () => {
	i = (j + i + 1) % j;
	disTestimonial();
});
window.onload = () => {
	disTestimonial();
};
