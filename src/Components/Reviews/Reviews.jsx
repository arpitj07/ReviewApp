import React, { useEffect, useState } from 'react';
import './Reviews.style.css';
const Reviews = () => {
	const [ ReviewList, setReviewList ] = useState([]);
	const [ AverageReview, setAverageReview ] = useState('');

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('UserDataList'));
		if (data && data.length > 0) {
			setReviewList(data);
		}

		if (data.length > 0) {
			let sum = 0;
			let totalrating = data.reduce((acc, current) => {
				sum = acc + current.rating;
				return sum;
			}, 0);
			// console.log(totalrating);
			setAverageReview(totalrating / data.length);
		}
	}, []);

	const handleEdit = () => {};

	const handleDelete = () => {};

	const handleWriteReviews = () => {
		window.location.href = '/';
	};

	return (
		<div className="reviewWrapper">
			<h1>Reviews</h1>
			<div className="text">
				<div>
					<p>
						Average Review: {AverageReview && AverageReview.toFixed(1)}{' '}
						{[ ...Array(Math.floor(AverageReview)) ].map((_, index) => {
							index += 1;
							return <span className="star">&#9733;</span>;
						})}
					</p>
				</div>
				<div className="button">
					<button onClick={handleWriteReviews}>Write Review</button>
				</div>
			</div>
			<div className="reviewContainer">
				<div className="all_the_reviews">
					{ReviewList.length > 0 ? (
						ReviewList.map((review, index) => {
							return (
								<div className="reviewCardWrapper">
									<div className="reviewContent">
										<p>Name: {review.name}</p>
										<p>Eamil: {review.email}</p>
										<p>Mob: {review.phoneNumber}</p>
										<p>
											Rating: {review.rating}{' '}
											{[ ...Array(review.rating) ].map((_, index) => {
												index += 1;
												return <span className="star">&#9733;</span>;
											})}
										</p>
									</div>
									<div className="reviewButtonContainer">
										<button onClick={handleEdit}>edit</button>
										<button onClick={handleDelete}>delete</button>
									</div>
								</div>
							);
						})
					) : (
						<h3>No reviews added</h3>
					)}
				</div>
			</div>
		</div>
	);
};

export default Reviews;
