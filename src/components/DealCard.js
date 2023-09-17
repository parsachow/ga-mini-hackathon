import { Image, Item, } from 'semantic-ui-react'

function DealCard(){
    return(
        <>
         <Item.Group link>
            <Item>
                <Item.Image size='large' src='#' />
                
                <Item.Content>
                 <Item.Header>Name of food</Item.Header>
                <Item.Description>food description</Item.Description>
                </Item.Content>

            </Item>
         </Item.Group>

        </>
    )
}

export default DealCard;

