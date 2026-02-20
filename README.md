📝 My Notes App - React Native
Una aplicación de notas moderna y funcional desarrollada con React Native y Expo Router. Este proyecto permite gestionar pensamientos e ideas de forma persistente, ofreciendo una experiencia de usuario fluida con una interfaz limpia.

🚀 Características
Gestión Completa (CRUD): Crea, lee, actualiza y elimina notas de forma sencilla.

Persistencia Local: Las notas se guardan en el dispositivo utilizando AsyncStorage, por lo que no se pierden al cerrar la app.

Buscador Inteligente: Filtra tus notas por título o contenido en tiempo real.

Vista Flexible: Cambia dinámicamente entre vista de Lista o Cuadrícula (Grid).

Diseño Responsivo: Interfaz optimizada con KeyboardAvoidingView para una mejor escritura en móviles.

🛠️ Tecnologías Utilizadas
React Native & Expo Go

TypeScript (para un código más seguro y robusto)

Expo Router (Navegación basada en archivos)

AsyncStorage (Almacenamiento local)

Ionicons (Iconografía)

📦 Instalación y Uso
Sigue estos pasos para ejecutar el proyecto en tu máquina local:

Clonar el repositorio:

Bash
git clone https://github.com/UserCristian28/Practica-3.git
cd Appdenotas
Instalar dependencias:

Bash
npm install
Instalar almacenamiento local (si no está instalado):

Bash
npx expo install @react-native-async-storage/async-storage
Iniciar el proyecto:

Bash
npx expo start
Ejecutar en tu móvil: Escanea el código QR con la app Expo Go (Android) o la cámara (iOS).

📂 Estructura del Proyecto

Appdenotas/
├── app/
│   ├── (tabs)/
│   │   └── index.tsx     # Pantalla principal (Lista y Búsqueda)
│   └── create.tsx        # Pantalla de creación y edición
├── storage.ts            # Lógica de persistencia con AsyncStorage
├── package.json          # Dependencias del proyecto
└── README.md             # Documentación

👤 Autor
Cristian - UserCristian28
