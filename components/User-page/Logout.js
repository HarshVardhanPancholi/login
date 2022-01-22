import{useHistory} from 'react-router-dom'

function Logout()
{
    const history=useHistory()
    function preback()
    {
        sessionStorage.clear()
        history.push('/')  
    }

    return (
        <>{setTimeout(preback(),20000)}
        </>
    )
}

export default Logout
