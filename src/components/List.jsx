function List({ arr}) {
    return arr.map(curr => <li key={curr}>{curr}</li>)
}

export default List;