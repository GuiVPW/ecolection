import { Link } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import { CREATE_POINT } from 'src/app/constants/routes'

import logo from '../../images/logo.svg'

import { HomeContainer, HomeContent, HomeHeader, HomeMain } from './home.styled'

const Home: React.FC = () => {
	return (
		<HomeContainer>
			<HomeContent>
				<HomeHeader>
					<img src={logo} alt="Ecolection" />
				</HomeHeader>

				<HomeMain>
					<h1>Your waste collection marketplace.</h1>
					<p>We help people find collection points efficiently. </p>

					<Link to={CREATE_POINT}>
						<span>
							<FiLogIn />
						</span>
						<strong>Register a collection point </strong>
					</Link>
				</HomeMain>
			</HomeContent>
		</HomeContainer>
	)
}

export default Home
