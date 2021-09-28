import React from 'react'

const FetchErr = () => {
    console.log("Bład serwera")
    return (
        <div className="fetcherr">
            <h2>Wystąpił błąd podczas przetwarzania pliku, spróbuj ponownie za chwilę.</h2>
        </div>
    )
}

export default FetchErr
