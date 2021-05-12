import '../../assets/sass/header.sass'
// import { useContext, useMemo, memo } from 'react';
// import AppContext from "../../appContext";

function Header({text, onClick}){
  return (
      <div className="header">
        <div className="header__info">
          {/* <div className="header__info_completed">Выполнено: {completed}</div>
          <div className="header__info_work">В работе: {inWork}</div> */}
        </div>
      </div>
  );
}

// const Header = memo(({text, onClick}) => {
//   const [appData] = [1,2,3,4,5,6,7,8] // useContext(AppContext);


//   const [completed, inWork] = useMemo(() => {
//     const todos = appData.todos;
//     if(!todos)
//       return [0,0];
//     return [todos.filter(curr => curr.completed).length, todos.filter(curr => !curr.completed).length]
//   }, [appData.todos])

//   return (
//     <div className="header">
//       <div className="header__info">
//         <div className="header__info_completed">Выполнено: {completed}</div>
//         <div className="header__info_work">В работе: {inWork}</div>
//       </div>
//     </div>
//   );
// })

// Header.displayName = 'Header';

export default Header;