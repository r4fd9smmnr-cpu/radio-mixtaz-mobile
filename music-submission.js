(() => {
  'use strict';
  const form = document.getElementById('music-submission');
  if (!form) return;
  const audio = document.getElementById('ms-audio');
  const artwork = document.getElementById('ms-artwork');
  const link = document.getElementById('ms-audio-link');
  const note = document.getElementById('ms-files-note');
  const error = document.getElementById('ms-error');
  const limit = 10 * 1000 * 1000;
  function validateFiles() {
    audio.setCustomValidity('');
    artwork.setCustomValidity('');
    link.setCustomValidity('');
    const track = audio.files[0];
    const cover = artwork.files[0];
    const files = [track, cover].filter(Boolean);
    const total = files.reduce((sum, file) => sum + file.size, 0);
    if (track && !/\.(mp3|wav)$/i.test(track.name)) audio.setCustomValidity('El audio debe ser un archivo MP3 o WAV.');
    if (cover && !/\.(jpe?g|png|webp)$/i.test(cover.name)) artwork.setCustomValidity('La portada debe ser JPG, PNG o WebP.');
    if (total > limit) (track ? audio : artwork).setCustomValidity('Los adjuntos superan los 10 MB. Quita el audio y usa un enlace de descarga, o reduce el tamaño de la portada.');
    if (!track && !link.value.trim()) link.setCustomValidity('Adjunta tu audio o añade un enlace de descarga.');
    if (link.value.trim() && !/^https?:\/\//i.test(link.value.trim())) link.setCustomValidity('Usa un enlace que empiece por https:// o http://.');
    note.textContent = files.length ? `${files.map(file => file.name).join(' + ')} · ${(total / 1000000).toFixed(2)} MB de 10 MB` : 'No hay archivos seleccionados.';
    return ![audio, artwork, link].some(input => input.validationMessage);
  }
  for (const input of [audio, artwork, link]) input.addEventListener('input', validateFiles);
  form.addEventListener('input', () => { error.hidden = true; });
  form.addEventListener('submit', event => {
    for (const input of form.querySelectorAll('input[type=text], textarea')) {
      if (input.required && !input.value.trim()) input.setCustomValidity('Completa este campo.');
      else input.setCustomValidity('');
    }
    if (!validateFiles() || !form.checkValidity()) {
      event.preventDefault();
      error.textContent = 'Revisa los campos marcados. Incluye audio o un enlace de descarga y acepta las autorizaciones.';
      error.hidden = false;
      form.reportValidity();
      return;
    }
    // FormSubmit handles the multipart POST and spam challenge. Keep the radio page open.
    // The artist completes the provider's verification before the submission is accepted.
    form.target = '_blank';
    form.rel = 'noopener';
    form.elements._subject.value = `Music Submission: ${form.elements['Artist / Band Name'].value.trim()} — ${form.elements['Song Title'].value.trim()}`;
    form.elements._next.value = new URL('submission-received.html', location.href).href;
    error.textContent = 'Completa la verificación en la pestaña que se abrió para finalizar el envío. Si no se abrió, permite las ventanas emergentes y vuelve a intentarlo.';
    error.hidden = false;
  });
  form.addEventListener('input', event => {
    if (event.target.matches('input[type=text], textarea')) event.target.setCustomValidity('');
  });
  if (location.hash === '#musica' || location.hash === '#music-submission') document.querySelector('[data-id=musica]').click();
})();
