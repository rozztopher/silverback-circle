import React from 'react'
import Hero from './Hero';
import Storyline from './Storyline';
import About from './About';
import Roadmap from './Roadmap';
import Social from './Social';

const Home = () => {
     
    return (
        <div className='flex-v fill-container'>
            <Hero/>
            <Storyline/>
            <About/>
            <Roadmap/>
            <Social/>
        </div>
    );
}

export default Home