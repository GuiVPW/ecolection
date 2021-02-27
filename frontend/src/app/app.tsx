import { Route, Switch } from 'react-router-dom'

import { CREATE_POINT, HOME } from './constants/routes'
import CreatePoint from './pages/CreatePoint'
import Home from './pages/Home'

export const App = (): JSX.Element => {
	return (
		<>
			<Switch>
				<Route component={Home} exact path={HOME} />
				<Route component={CreatePoint} exact path={CREATE_POINT} />
			</Switch>
		</>
	)
}

export default App
