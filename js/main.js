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

const updateRating = (product) => {
    //Get percentage 
    const starPercentage = (ratings[product] / 5) * 100;
    //console.log(starPercentage);

    //Round to nearest 10
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

    //Set width of stars inner to percentage
    document.querySelector(`.${product} .stars-inner`).style.width = starPercentageRounded;
    //rounding 
    document.querySelector(`.${product} .number-rating`).textContent = (Math.round(ratings[product] * 100) / 100).toFixed(1);
}

//Get ratings
const getRatings = () => {
    for (let rating in ratings) {
        //console.log(ratings[rating]);
        updateRating(rating);
    }
}



//Run get ratings when DOM loads;
document.addEventListener('DOMContentLoaded', getRatings);

//Form Select
const productSelect = document.getElementById('product-select');
const ratingControl = document.getElementById('rating-control');
let product;

productSelect.addEventListener('change', (e) => {
    product = e.target.value;
    // console.log(product);
    //Enable the rating control
    ratingControl.disabled = false;
    ratingControl.value = ratings[product];
});

//Rating control change
ratingControl.addEventListener('blur', (e) => {
    const rating = e.target.value;

    //Validate rating is 5 or less 
    if (rating > 5 || rating < 1) {
        alert('Please rate from 1-5');
        ratingControl.value = '';
        return;
    }

    //Change the rating 
    ratings[product] = ratingControl.value;
    // console.log(ratings[product]);
    updateRating(product);
});