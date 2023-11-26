import StarRatings from 'react-star-ratings';
import React from "react";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {

    return (
        <div className="reviewCard">
            <img src={profilePng} alt="User" />
            <p>{review.name}</p>
            <StarRatings
                rating={review.rating}
                starRatedColor="gold"
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="5px"
            />
            <span className="reviewCardComment">{review.comment}</span>
        </div>
    );
};

export default ReviewCard;