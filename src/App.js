import React, { Suspense, lazy } from 'react';
import UXLoader from './components/UX-Loader/UXLoader';
import './assets/css/UXCoreCSS.css';
import './App.scss';
const Header = lazy(() => import('./widgets/HeaderWidget/header'));
const ShowRecords = lazy(() => import('./widgets/ShowRecordsWidget/showRecords'));
function App(props) {
	return (
		<div className="App">
			<Suspense fallback={<UXLoader fullPageOverlay={true} loaderType='img' />}>
				<div id="mainContent">
					<Header />
					<ShowRecords {...props} />
				</div>
			</Suspense>
		</div >
	);
}

export default App;
