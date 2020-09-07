import React from 'react';
import'../../scss/components/foodtype.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const foodtypes = ({items}) => {
    const values =  window.location.search.split("");
    const newValue = values.splice(10);
    const foodType = newValue.join("");

    const types = [];
    
    for(const {food_type} of items){
        const type = types.find(type=> type === food_type)
        if(!type)types.push(food_type)
    }

    const handlerChange = (e) =>{

        for(const type of types){
            document.querySelector(`#${type}`).removeAttribute("class")
        }

        document.querySelector(`#${e.target.id}`).setAttribute("class","active")
    }

    return (
        <div className="section types">
            <div className="center">
            { 
                types[0] && ( 
                    types.map(type =>
                    <Link 
                        to={'/Dash?foodType='+type} 
                        key={types.indexOf(type)}
                        id={type}
                        className={
                            foodType === type  ? "active" : ""
                        } 
                        onClick={handlerChange}
                    >{type}</Link> 
                    )
                ) 
            }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    items: state.items.items,
})

export default connect(mapStateToProps)(foodtypes);
