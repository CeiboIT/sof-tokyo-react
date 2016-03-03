# sof-tokyo-react
Proyecto armado con ReactNative.

El plugin de splashscreen es este:

https://github.com/remobile/react-native-splashscreen

Para ios está configurado según las instrucciónes del sitio, y para android también, salvo que tuve que crear una
carpeta "android/app/src/main/res/drawable/splash.png" para que el plugin tome de esa ruta la imagen y
la use para construir el apk.

https://github.com/marcshilling/react-native-image-picker

OneSignal:

Para configurar OneSignal, también hubo que modificar el buildeo de android, que son las dependencias agregadas al android/app/build.gradle.
Además, el App Id que te da OneSignal también queda configurado en el mismo archivo,
manifestPlaceholders = [manifestApplicationId: "com.softokyo", onesignal_app_id: "653a33c7-194d-476e-9b0c-783463accf3c", onesignal_google_project_number: "627515274842"]

Eso básicamente es para tener valores que después se van a usar en el AndroidManifest.xml que se incluye en en la apk generada.

Para agregar los módulos nativos (que no son pure javascript) siempre se termina modificando este archivo, que es la clase principal.
android/app/src/main/java/com/softokyo/MainActivity.java

Ahí se agregó el package de onesignal.
