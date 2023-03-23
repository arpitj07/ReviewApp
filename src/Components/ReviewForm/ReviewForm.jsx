import React, { useState } from 'react';

import './ReviewForm.styles.css';
import { Alert, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../Redux/features/user';

const ReviewForm = () => {
	const [ name, setname ] = useState('');
	const [ phonenumber, setphonenumber ] = useState('');
	const [ email, setemail ] = useState('');
	const [ comment, setComment ] = useState('');
	const [ rating, setRating ] = useState(0);
	const [ hover, setHover ] = useState(0);
	const dispatch = useDispatch();

	const [ alertStatus, setAlertStatus ] = useState(0);
	const [ message, setMessage ] = useState('');
	const [ loading, setLoading ] = useState(false);

	// Callback function handles user email
	const handleEmail = (e) => {
		setemail(e.target.value);
	};

	const handleName = (e) => {
		setname(e.target.value);
	};

	const handleComment = (e) => {
		setComment(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (name.length > 0 && email.length > 13 && phonenumber.length > 9) {
			setLoading(true);

			try {
				dispatch(
					setUserData({
						id: `UserID_${Math.floor(Math.random() * 100000 + 1)}`,
						name: name,
						email: email,
						phoneNumber: phonenumber,
						rating: rating,
						comment: comment
					})
				);

				setLoading(false);
				setAlertStatus(1);
				setMessage('Review Added successfully');
				setTimeout(() => {
					window.location.href = '/';
				}, 1500);
			} catch (error) {
				setLoading(false);
				setAlertStatus(2);
				setMessage(error);
				setTimeout(() => {
					window.location.href = '/';
				}, 1500);
			}
		} else {
			setLoading(false);
			setAlertStatus(2);
			setMessage('Fill the required fields');
		}
	};

	return (
		<div className="ReviewFormWrapper">
			{loading ? (
				<CircularProgress />
			) : alertStatus !== 0 ? (
				<Alert
					onClose={() => {
						window.location.reload();
					}}
					variant="filled"
					severity={alertStatus === 1 ? 'success' : 'error'}
				>
					{message}
				</Alert>
			) : null}

			<div className="ReviewFormContainer">
				<div className="userInput">
					<h3>User Review</h3>

					<input type="text" value={name} onChange={handleName} placeholder="Name" />
					<input type="text" value={email} onChange={handleEmail} placeholder="email" />
					<input
						type="text"
						value={phonenumber}
						onChange={(e) => setphonenumber(e.target.value)}
						placeholder="phonenumber"
					/>
					<div className="ratingButtons">
						<span>
							Rating:{' '}
							{[ ...Array(5) ].map((star, index) => {
								index += 1;
								return (
									<button
										type="button"
										key={index}
										className={index <= (hover || rating) ? 'on' : 'off'}
										onClick={() => setRating(index)}
										onMouseEnter={() => setHover(index)}
										onMouseLeave={() => setHover(rating)}
									>
										<span className="star">&#9733;</span>
									</button>
								);
							})}
						</span>
					</div>
					<textarea
						id="comment"
						rows={4}
						cols={5}
						value={comment}
						onChange={handleComment}
						placeholder="Comment (optional)"
					/>
					<button onClick={(e) => handleSubmit(e)}>Submit</button>
				</div>
				<div className="links">
					<p>
						<a href="/allreviews">View All Reviews</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ReviewForm;
