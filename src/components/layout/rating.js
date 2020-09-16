import React from 'react';
import '../../scss/components/rating.scss';

export default () => {
    let ratedStars = Math.floor(Math.random()*(5-2)+2);
    const stars = [];

    for(let i=1; i<=5; i++){
        if(ratedStars){
            stars.push(<i className="Rated fas fa-star"></i>)
            ratedStars--;
        }else{
            stars.push(<i className="unRated far fa-star"></i>)
        }
    }

    return(
        <div>
            {
                stars.map(star=>
                    <span key={stars.indexOf(star)}>{star}</span>
                    )
            }
        </div>
    )
}