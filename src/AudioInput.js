import React, { useState, useEffect } from 'react';

const AudioInput = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioStream, setAudioStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

//   useEffect(() => {
    let mediaRecorder;
    let mediaStream;

    const startRecording = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setAudioStream(mediaStream);

        mediaRecorder = new MediaRecorder(mediaStream);
        mediaRecorder.addEventListener('dataavailable', handleDataAvailable);
        mediaRecorder.start();

        setIsRecording(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    };

    const stopRecording = () => {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        setIsRecording(false);
      }
    };

    const handleDataAvailable = (event) => {
      if (event.data.size > 0) {
        setAudioChunks((prevChunks) => [...prevChunks, event.data]);
      }
    };

    // return () => {
    //   stopRecording();
    //   if (mediaStream) {
        // mediaStream.getTracks().forEach((track) => track.stop());
    //   }
    // };
//   }, []);

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div>
      <button onClick={handleToggleRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {audioChunks.length > 0 && (
        <audio controls>
          <source src={URL.createObjectURL(new Blob(audioChunks))} type="audio/wav" />
        </audio>
      )}
    </div>
  );
};

export default AudioInput;




