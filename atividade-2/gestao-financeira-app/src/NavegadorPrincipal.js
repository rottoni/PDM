import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { TelaLogin } from './screens/TelaLogin';
import { TelaPrincipal } from './screens/TelaPrincipal';

export function NavegadorPrincipal() {
  const [usuario, setUsuario] = useState(null);

  return (
    <>
      <StatusBar style="dark" />
      {usuario ? (
        <TelaPrincipal usuario={usuario} aoSair={() => setUsuario(null)} />
      ) : (
        <TelaLogin aoEntrar={setUsuario} />
      )}
    </>
  );
}