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

//summary display utility
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

//tempelate for review class
class reviewTemplate {
    constructor(product, brand, rating, comments) {
        this.product = product;
        this.brand = brand;
        this.rating = rating;
        this.comments = comments;
    }
}
let storeReview = [];

//Display Ratings, add DOM content into HTML
const createRatingDisplay = (reviewInstance) => {

    //Make necessary elements to store.
    const div = document.createElement('div');
    const h4 = document.createElement('h4');
    const innerDiv = document.createElement('div');
    const stars = document.createElement('p');
    let reviewContent = document.createElement('p');

    //Update the properties
    div.classList.add('sample-review');
    div.classList.add(`${reviewInstance.brand}`);
    div.classList.add('mb-10');
    innerDiv.classList.add('content');
    h4.appendChild(document.createTextNode(reviewInstance.product));
    stars.textContent = reviewInstance.rating;
    reviewContent.textContent = reviewInstance.comments;

    //Display the review
    div.appendChild(h4);
    innerDiv.appendChild(stars);
    innerDiv.appendChild(reviewContent);
    div.appendChild(innerDiv);
    displayReviews.appendChild(div);

    //Is there a way to reduce DOM manipulation...?
}

//get ratings when DOM loads;
document.addEventListener('DOMContentLoaded', getRatings);

//Form Select
const productSelect = document.getElementById('product-select');
const reviewForm = document.getElementById('review-form');
const ratingControl = document.getElementById('rating-control');
const review = document.querySelector('#review');
let displayReviews = document.querySelector('#display-reviews');
let product;

//Think about if user wants to submit 2 reviews for same prodcut, not likely but ...
productSelect.addEventListener('change', (e) => {
    product = e.target.value;
    //Enable the rating control
    reviewForm.style.display = 'block'
        //can be removed
    ratingControl.disabled = false;
    review.disabled = false;
    ratingControl.value = ratings[product];
});

//TODO: Change event type to reflect update
//Rating control change
ratingControl.addEventListener('blur', (e) => {
    const rating = e.target.value;

    //Validate rating is 5 or less 
    if (rating > maxStars || rating < 1) {
        alert('Please rate from 1-5');
        ratingControl.value = '';
        return;
    }

    //Change the rating 
    ratings[product] = ratingControl.value;

    updateRating(product);
    let starValue = (Math.round(ratingControl.value * 100) / 5);
    reviewStar.style.width = `${starValue}%`;
});

//review gets submitted
reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Storing 
    const productValue = productSelect.options[productSelect.selectedIndex];
    storeReview.push(new reviewTemplate(productValue.text, productSelect.value, ratingControl.value, review.value));

    //Hide the form again
    reviewForm.style.display = "none";
    review.value = "";

    //display review
    createRatingDisplay(storeReview[storeReview.length - 1]);
});

const outerStars = document.querySelector('#review-outer-stars')
const reviewStar = document.querySelector('#review-stars');

//set width of inner star (yellow)
const updateStars = (starPercentageRounded) => {
    const rounded = (starPercentageRounded * 5) / 100;
    console.log()
    ratingControl.value = rounded;
    reviewStar.style.width = `${starPercentageRounded}%`;
}

//on hover effect
outerStars.addEventListener('mousemove', (e) => {
    //offset was going from 0 to 90.. and 180when changed the size was 2x
    //console.log(e.offsetX + ' ' + e.clientX);
    const starPercentage = (e.offsetX * 5 / 180) / 5 * 100;

    //Round to nearest 10
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}`;
    // console.log(starPercentageRounded);

    reviewStar.style.width = `${starPercentageRounded}%`;

    //on click set the stars,
    //TODO: think about making it fixed, and not change again on hover (add class etc...)
    outerStars.addEventListener('click', (e) => {
        updateStars(starPercentageRounded);
    });

    // outerStars.addEventListener('mouseleave', () => {
    //     updateStars(starPercentageRounded);
    // });
});

//Filter to display review of specific brand. 
const filterProduct = document.querySelector('#GroupBy');
filterProduct.addEventListener('change', (e) => {
    console.log(e.target.value);
    const innerReviews = document.querySelectorAll('.sample-review');

    if (e.target.value === 'all') {
        innerReviews.forEach(r => {
            r.classList.remove('hide');
        })
        return;
    } else {
        innerReviews.forEach(filteredReview => {
            if (filteredReview.classList.contains(`${e.target.value}`)) {
                console.log('executed');
                filteredReview.classList.remove('hide');
            } else {
                if (!filteredReview.classList.contains('hide')) {
                    filteredReview.classList.add('hide');
                }
            }
        })
    }
});