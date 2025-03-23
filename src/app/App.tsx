import { useUserStore } from 'entitites/User';
import { useEffect } from 'react';
import { SpacesPage } from 'pages/SpacesPage';

import '@uniteam31/uni-shared-ui/dist/esm/global.scss';
import './styles/index.scss';

const App = () => {
	const { initAuthData } = useUserStore();

	useEffect(() => {
		initAuthData();
	}, [initAuthData]);

	return <SpacesPage />;
};

export default App;
