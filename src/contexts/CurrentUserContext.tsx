import React, { createContext, ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
}

interface CurrentUserProps {
  id: string,
  email: string,
  nome: string,
  sexo: string,
  setId: React.Dispatch<React.SetStateAction<string>>;
}

export const CurrentUserData = createContext({} as CurrentUserProps);

export function CurrentUserProvider({ children, ...rest}: Props){
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [sexo, setSexo] = useState('');

  return(
      <CurrentUserData.Provider value={{ id, email, nome, sexo, setId }}>
          {children}
      </CurrentUserData.Provider>
  )
}