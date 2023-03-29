import LandNav from './components/LandNav.js';
import Hero from './components/Hero.js';

function LandingPage() {
  return (
    <div>
      <LandNav colors={['black','white', 'orange.600']}/>
      <Hero/>
    </div>
  )
}
export default LandingPage;
