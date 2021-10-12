import React, { createContext, ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
}

interface CurrentUserProps {
  id: string,
  email: string,
  senha: string,
  confirmarSenha: string,
  nome: string,
  sexo: string,
  user: string,
  professionIdSelected: string,
  preferenceSelected: string[], 
  newDate: string,
  setId: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setSenha: React.Dispatch<React.SetStateAction<string>>;
  setConfirmarSenha: React.Dispatch<React.SetStateAction<string>>;
  setSexo: React.Dispatch<React.SetStateAction<string>>;
  setNewDate: React.Dispatch<React.SetStateAction<string>>;
  setProfessionIdSelected: React.Dispatch<React.SetStateAction<string>>;
  setPreferenceSelected: React.Dispatch<React.SetStateAction<string[]>>;
  setNome: React.Dispatch<React.SetStateAction<string>>
}

export const CurrentUserData = createContext({} as CurrentUserProps);

export function CurrentUserProvider({ children, ...rest}: Props){
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [ senha, setSenha ] = useState('');
  const [ confirmarSenha, setConfirmarSenha ] = useState('');
  const [ newDate, setNewDate ] = useState('')
  const [nome, setNome] = useState('');
  const [sexo, setSexo] = useState('');
  const [user, setUser] = useState('');
  const [ professionIdSelected, setProfessionIdSelected ] = useState("")
  const [ preferenceSelected, setPreferenceSelected ] = useState(['']);

  return(
      <CurrentUserData.Provider value={{ id, email, nome, sexo, user, senha, confirmarSenha, preferenceSelected, professionIdSelected, newDate,
      setId, setUser, setEmail, setConfirmarSenha, setNewDate, setPreferenceSelected, setProfessionIdSelected, setSenha, setSexo, setNome }}>
          {children}
      </CurrentUserData.Provider>
  )
}