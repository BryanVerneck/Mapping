import React, { createContext, ReactNode, useState } from 'react';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

interface Props {
  children: ReactNode;
}

interface RegistrationProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  senha: string;
  setSenha: React.Dispatch<React.SetStateAction<string>>;
  confirmarSenha: string;
  setConfirmarSenha: React.Dispatch<React.SetStateAction<string>>;
  sexo: string;
  setSexo: React.Dispatch<React.SetStateAction<string>>;
  dataNascimento: string;
  setdataNascimento: React.Dispatch<React.SetStateAction<string>>;
  newDate: string;
  setNewDate: React.Dispatch<React.SetStateAction<string>>;
  professionIdSelected: string;
  setProfessionIdSelected: React.Dispatch<React.SetStateAction<string>>;
  preferenceSelected: string[];
  setPreferenceSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Data = createContext({} as RegistrationProps);

export function RegistrationProvider({ children, ...rest}: Props){
  const [ email, setEmail ] = useState('');
  const [ senha, setSenha ] = useState('');
  const [ sexo, setSexo ] = useState('M');
  const [ confirmarSenha, setConfirmarSenha ] = useState('');
  const [ dataNascimento, setdataNascimento ] = useState(format(new Date(), 'dd / MMM / Y', {
  locale: ptBR
  }))
  const [ newDate, setNewDate ] = useState('')
  const [ professionIdSelected, setProfessionIdSelected ] = useState("")
  const [ preferenceSelected, setPreferenceSelected ] = useState(['']);

  return(
      <Data.Provider value={{ email, senha, confirmarSenha, sexo, dataNascimento, newDate, professionIdSelected, preferenceSelected, 
        setEmail, setSenha, setConfirmarSenha, setSexo, setdataNascimento, setNewDate, setProfessionIdSelected, setPreferenceSelected }}>
          {children}
      </Data.Provider>
  )
}