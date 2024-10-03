# newtiendaonlineapp

Este es un proyecto desarrollado con React Native utilizando Expo. La aplicación está diseñada para ser ejecutada en plataformas Android, iOS y web. El proyecto también incluye navegaciones, almacenamiento asíncrono y otras funcionalidades.

## Requisitos previos

- **Node.js**: Versión `>=16.0.0`
- **npm**: Versión `>=8.0.0`
  
Recomendamos usar una versión estable de Node.js y npm para evitar posibles problemas de compatibilidad.

## Instalación

### 1. Clona este repositorio:

   ```bash
   git clone https://github.com/usuario/newtiendaonlineapp.git
   ```
  
### 2. Navega al directorio:

  ```bash
   cd newtiendaonlineapp
```

### 3. Instala las dependencias utilizando npm. Se recomienda forzar la instalación de dependencias para evitar conflictos de versiones:

  **npm**
 
  ```bash
   npm install --force
  ```

  ```bash
   npm install --legacy-peer-deps
   ```

  Si prefieres usar **yarn** , puedes ejecutar:

  ```bash
   yarn install --ignore-engines

   ```


## Scripts disponibles

Estos son los comandos disponibles para ejecutar la aplicación:

- **npm start:** Inicia Expo.

- **npm run android:** Inicia Expo en un dispositivo Android.

- **npm run ios:** Inicia Expo en un dispositivo iOS.

- **npm run web:** Inicia Expo en un navegador web.



## Estructura del proyecto

- **expo/AppEntry.js:** Punto de entrada principal de la aplicación.
  
- Las dependencias se encuentran en el archivo **package.json**.


  
## Dependencias principales

- **React Native:** 0.74.5
  
- **Expo:** ~51.0.28
  
- **React Navigation:** ^6.6.1
  
- **Axios:** ^1.7.7

- **Async Storage:** 1.23.1
  

## Ejecutar la aplicación

Para ejecutar la aplicación en modo de desarrollo:

1. Asegúrate de tener Expo CLI instalado globalmente:
   
  ```bash
  npm install -g expo-cli
  ```

2. Ejecuta el siguiente comando para iniciar Expo:
  ```bash
  npm start
  ```





  

   
