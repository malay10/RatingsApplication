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
    // console.log(ratings[product]);
    updateRating(product);
    // console.log(ratingControl.value);
    let starValue = (Math.round(ratingControl.value * 100) / 5);
    reviewStar.style.width = `${starValue}%`;
});

reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //Make necessary elements to store.
    const div = document.createElement('div');
    const h4 = document.createElement('h4');
    const innerDiv = document.createElement('div');
    const stars = document.createElement('p');
    let review = document.createElement('p');

    //Update the properties
    div.classList.add('sample-review');
    div.classList.add('mb-10');
    innerDiv.classList.add('content');
    const productValue = productSelect.options[productSelect.selectedIndex];
    h4.appendChild(document.createTextNode(productValue.text));
    stars.textContent = ratings[productValue.value];
    //had to read again not sure why
    let rev = document.getElementById('review').value;
    review.textContent = rev;

    //Display the review
    div.appendChild(h4);
    innerDiv.appendChild(stars);
    innerDiv.appendChild(review);
    div.appendChild(innerDiv);
    displayReviews.appendChild(div);

    //Hide the form again
    reviewForm.style.display = "none";
});

const outerStars = document.querySelector('#review-outer-stars')
const reviewStar = document.querySelector('#review-stars');
console.log(reviewStar);
const slider = document.querySelector('#slider');

const updateStars = (starPercentageRounded) => {
    const rounded = (starPercentageRounded * 5) / 100;
    ratingControl.value = rounded;
    reviewStar.style.width = `${starPercentageRounded}%`;
}
outerStars.addEventListener('mousemove', (e) => {
    const starPercentage = (e.offsetX * 5 / 90) / 5 * 100;
    console.log(starPercentage);

    //Round to nearest 10
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}`;
    // console.log(starPercentageRounded);

    reviewStar.style.width = `${starPercentageRounded}%`;
    outerStars.addEventListener('click', (e) => {
        updateStars(starPercentageRounded);
    });

    outerStars.addEventListener('mouseleave', () => {
        updateStars(starPercentageRounded);
    });
});