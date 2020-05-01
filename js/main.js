//Initial rating 
const ratings = {
    sony: 4.5,
    samsung: 4.7,
    vizio: 3,
    phillips: 3.7,
    LG: 4.0
}

//total stars 
const maxStars = 5;

//Get ratings
const getRatings = () => {
    for (let rating in ratings) {
        //console.log(ratings[rating]);
        //Get percentage 
        const starPercentage = (ratings[rating] / 5) * 100;
        console.log(starPercentage);

        //Round to nearest 10
        const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

        //Set width of stars inner to percentage
        document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded;
    }
}



//Run get ratings when DOM loads;
document.addEventListener('DOMContentLoaded', getRatings);