import { useEffect, useRef } from "react";
import { useState } from "react"; 
import PropTypes from "prop-types";

function SandwichForm(props) {
    
    const nameRef =useRef(null);
    const typeRef =useRef(null);
    const priceRef =useRef(null);
    const best_before_dateRef =useRef(null);
    const {onSubmit, buttonText, sandwich} = props;

    const createSandwich = async () => {
        const sandwich= {
            name: nameRef.current.value,
            type: typeRef.current.value,
            price: priceRef.current.value,
            best_before_date: best_before_dateRef.current.value,
        };
        const succes = await onSubmit(sandwich);
        if (succes){
            resetForm();
        }
    }

    const resetForm = () => {
        nameRef.current.value = "";
        typeRef.current.value = "";
        priceRef.current.value = "";
        best_before_dateRef.current.value = "";
    }

    useEffect(()=>{
        if(sandwich){
            nameRef.current.value = sandwich.name;
            typeRef.current.value = sandwich.type;
            priceRef.current.value = sandwich.price;
            best_before_dateRef.current.value = sandwich.best_before_date;
            setMyType(sandwich.type);
        }
    }, [sandwich]);

    const [myType, setMyType] = useState("normal");

    const handleChange = (event) => {
        setMyType(event.target.value);
        typeRef.current.Value = event.target.value;
    }

    return (<form onSubmit={event => {event.preventDefault(); createSandwich();}}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Szendvics név</label>
            <input type="text" id="name" className="form-control" placeholder="Szendvics név" ref={nameRef} />
        </div>
        <div className="mb-3">         
            <label htmlFor="type" className="form-label">Típus</label>
            <select value={myType} onChange={handleChange} ref={typeRef}>
                <option value="normal">Normál</option>  
                <option value="vegan">Vegán</option>
                <option value="glutenfree">Glutén mentes</option>
            </select> 
        </div>
        <div className="mb-3">
            <label htmlFor="price" className="form-label">Ár</label>
            <input type="number" min="400" max="1000" id="price" className="form-control" placeholder="Ár" ref={priceRef}/>
        </div>
        <div className="mb-3">
            <label htmlFor="best_before_date" className="form-label">Minőségét megőrzi</label>
            <input type="date" id="best_before_date" className="form-control" placeholder="Minőségét megőrzi" ref={best_before_dateRef}/>
        </div>
       
        <button type="submit" className="btn btn-success">{buttonText}</button>
    </form>);
}

SandwichForm.propTypes = {
    onSubmit : PropTypes.func.isRequired,
    buttonText: PropTypes.string,
    sandwich: PropTypes.object
}

SandwichForm.defaultProps = {
    buttonText: "Felvétel",
    sandwich: null
}

export default SandwichForm;