import { Route, Switch } from 'react-router-dom'

import { HOME } from './constants/routes'
import Home from './pages/Home'

export const App = (): JSX.Element => {
	return (
		<>
			<Switch>
				<Route component={Home} exact path={HOME} />
			</Switch>
		</>
	)
}

export default App
