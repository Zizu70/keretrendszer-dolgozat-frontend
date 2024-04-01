import PropTypes from "prop-types";

function SandwichCard(props) {
    const { sandwich, updateClick, deleteClick } = props;

    return (
        <div className='col'>
            <div className='card h-100'>
                <div className="card-header bg-info h6">
                    <th>{sandwich.name}</th>
                </div>
                <div className="card-body">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Típus</th>
                                <td>{sandwich.type}</td>
                            </tr>
                            <tr>
                                <th>Ár</th>
                                <td>{sandwich.price}</td>
                            </tr>
                            <tr>
                                <th>Minőségét megőrzi</th>
                                <td>{sandwich.best_before_date}</td>
                            </tr>
                        </tbody>
                    </table>                    
                </div>
                <div className="card-footer">
                    <div className="d-grid gap-1">
                        <button className="btn btn-primary " onClick={()=>{updateClick(sandwich.id)}}>Módosítás</button>
                        <button className="btn btn-danger" onClick={()=>{deleteClick(sandwich.id)}}>Törlés</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

SandwichCard.propTypes = {
    sandwich: PropTypes.object.isRequired,
    updateClick: PropTypes.func.isRequired,
    deleteClick: PropTypes.func.isRequired
}

export default SandwichCard;