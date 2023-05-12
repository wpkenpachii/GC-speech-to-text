const speech = require('@google-cloud/speech');
const client = new speech.SpeechClient();

const { GCS_URI } = process.env;

async function transcribe(fileName) {
  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    uri: GCS_URI + fileName,
  };
  const config = {
    encoding: 'WEBM_OPUS',
    sampleRateHertz: 8000,
    languageCode: 'pt-BR',
  };
  const request = {
    audio: audio,
    config: config,
  };

  // Detects speech in the audio file
  try {
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    return transcription;
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  transcribe
}