import React from "react";
import '../styles/components/TripItem.scss';

function TripItem({}){

        return (
            <div>
                <React.Fragment>
                    
                    <article className="trip__card">
                        
                        <header className="trip__header">
                            <h1 className="trip__title">{destination}</h1>
                            <h2 className="trip__destination">
                                {/* [array of trip members by {fname}]
                                last in array to be prepended by "and" , appended by 's */}
                                {tripname}</h2>
                        </header>
                    
                    
                            {/* IF Conditional content {!!tripdetails && } */}

                            <p className="trip__details">
                                {tripdetails}
                            </p>
                            

                        <footer className="trip__footer">
                            View Suggestions <span>{array.length}</span>
                        </footer>
                        
                    </article>
                
                </React.Fragment>
            </div>
        );
}

export default TripItem;
