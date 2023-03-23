import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ReviewForm from './Components/ReviewForm/ReviewForm';
import Reviews from './Components/Reviews/Reviews';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<ReviewForm />} />
				<Route path="/allreviews" element={<Reviews />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
