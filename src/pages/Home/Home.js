import {Header} from '../../components/Header/Header';
import {Footer} from '../../components/Footer/Footer';
import {DealCard} from '../../components/DealCard';
import 'semantic-ui-css/semantic.min.css'
import { Input, Icon } from 'semantic-ui-react'

export function Home(){
    return(
        <>
            <Header />
            <div>
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
                        <li><DealCard /></li>
                        <li><DealCard /></li>                        
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    )
}