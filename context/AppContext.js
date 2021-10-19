import { createContext, useEffect, useReducer } from 'react';

const AppContext = createContext();
export default function AppWrapper(props) {
  const [token, dispatch] = useReducer(tokenReducer, [], () => {
    return localStorage.getItem('token');
  });
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <AppContext.Provider value={(token, dispatch)}>
      {props.children}
    </AppContext.Provider>
  );
}
