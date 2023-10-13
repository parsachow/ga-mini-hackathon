import Transcription from "../../components/Transcription/Transcription"

export function Checkout(props){

    function handleSubmit(e){

    }

    return (
        <div className="delivery-main-div">
            <br />
            <br />
            <br />
            <br />
            <h2>Delivery Details</h2>

            <div className="address-div">
                <div>
                    <form onSubmit={handleSubmit}>
                         <textarea name='postAddress' placeholder="Address" wrap="soft" rows={4} cols={40}/>
                    </form>
                </div>
                <div>
                    <Transcription />
                </div> 
            </div>
            
            <div>
                <button type="submit">Pay Now</button>
            </div>
        

        </div>
    )
}