# Music Submission — Radio Mixtaz 98.5

Se recuperó la versión pública actual del proyecto `radio-mixtaz-mobile` en Vercel (despliegue `5QHytXdsUPTkj8UFyECRXHjy7YR7`) y sus seis archivos de recursos. El repositorio solo tenía un README; los archivos de la app se incorporan aquí para poder revisar y mantener los cambios.

La sección Música incluye datos del artista y contacto, lanzamiento, clean/explicit, ISRC, biografía, notas de prensa, enlaces, audio MP3/WAV, portada y autorizaciones. El reproductor existente se conserva. Los adjuntos suman como máximo 10 MB; archivos mayores se comparten mediante enlace de descarga.

## Recepción de correo

El formulario hace un POST multipart a FormSubmit dirigido exclusivamente a `mixtaz98.5.online@gmail.com`. El campo `email` permite responder al artista. Se mantiene reCAPTCHA y se añade honeypot. La verificación abre otra pestaña para mantener la radio abierta. No requiere API keys, contraseñas ni servidor propio.

**Pendiente antes de dar por operativo el envío:** publicar la versión revisada, realizar un envío de prueba claramente identificado, abrir el mensaje de activación de FormSubmit en Gmail y confirmar la dirección. Después realizar otra prueba con adjuntos y comprobar su recepción en Gmail. La validación local no demuestra entrega de correo.

La página de retorno solo informa de procesamiento tras completar la verificación del proveedor; no demuestra llegada a la bandeja de entrada. No se guarda una copia local ni se promete airplay. FormSubmit procesa los datos y los adjuntos; se informa al artista y se enlaza su política de privacidad.

Documentación: https://formsubmit.co/documentation

## Publicación

Proyecto estático, sin compilación: publicar el contenido de esta carpeta en el proyecto Vercel existente `radio-mixtaz-mobile`. No crear otro proyecto ni cambiar el stream. El URL de retorno se calcula desde el origen publicado. No conectar Git ni modificar producción automáticamente sin revisar el resultado.
