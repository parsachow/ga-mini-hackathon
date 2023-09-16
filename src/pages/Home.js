import Header from '../components/Header';
// import Footer from '../components/Footer';
import DealCard from '../components/DealCard';
import { Input, Icon } from 'semantic-ui-react'

export default function Home(){

    return(
        <>
        
        <Header />
        <div className='search-container'>
        <Input icon placeholder='Search for food...'>
            <input />
            <Icon name='microphone' />
        </Input>
        </div>
        <br />
        <div className='deals'>
            <h3>Ongoing Deals</h3>
            <ul>
                <li><DealCard /></li>
                
            </ul>
        </div>

        {/* <Footer /> */}
        

        </>
    )
}