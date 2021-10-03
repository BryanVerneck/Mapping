import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';
import Routes from './src/routes';
import { RegistrationProvider } from "./src/contexts/userDataContext"
import { CurrentUserProvider } from "./src/contexts/CurrentUserContext"

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  if(!fontsLoaded){ // mantém a tela de splash enquanto as fontes são carregadas
    return(
      <AppLoading/>
    )
  }

  return (
    <CurrentUserProvider>
      <RegistrationProvider>
        <Routes/>
      </RegistrationProvider>
    </CurrentUserProvider>
  );
}
