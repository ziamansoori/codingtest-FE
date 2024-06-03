import './Pagination.css';
const Pagination = ({totalPages, page, setPage}) => {

    let pagination = [];

    for(let i=1; i<=totalPages; i++)
    {
        pagination.push(i);
    }

    return(
        <div className="pagination">
            {pagination.map((p, index) => {
                return <button  key={index} onClick={() => setPage(p)}>{p}</button>
            })}
        </div>
    )
}

export default Pagination