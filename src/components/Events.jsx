function Events(){
    const method = () => alert('Ну я же просил');

    return (
        <>
            <button onClick={()=> alert ('На меня нажали!')}>Нажми на меня!</button>
            <button onClick={method}>Не нажимай на меня!</button>
            <imput onChange={event=> console.log(event.target.value)}/>
        </>
    )
}

export default Events;