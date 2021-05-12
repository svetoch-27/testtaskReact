export function If ( {arg} ){
    if(arg){
        return <h1>Передали true</h1>
    }else{
        return <h1>Передали false</h1>
    }
}

export function If2( {arg} ){
    return <h1>{arg ? 'Передали true' : 'Передали false'}</h1>
}