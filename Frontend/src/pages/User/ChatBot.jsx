import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMicrophone, FaMicrophoneSlash, FaStop, FaPaperPlane, FaVolumeMute } from 'react-icons/fa';

function ChatBot() {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [messages, setMessages] = useState([]);

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => setRecordedChunks((prev) => [...prev, e.data]);
      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not start recording. Please ensure microphone access is allowed.');
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  // Save recording and send to backend
  const saveRecording = async () => {
    const blob = new Blob(recordedChunks, { type: 'audio/wav' });
    const formData = new FormData();
    formData.append('audio', blob, 'recording.wav');

    try {
      const response = await axios.post('http://localhost:8000/uploadquestion', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const userResponseText = response.data.hello; // Extracting the text of user's response

      // Update user messages with user response
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'user', content: userResponseText },
      ]);

      // Fetch next question with only the latest user input
      fetchNextQuestion(userResponseText);
    } catch (error) {
      console.error('Error saving recording:', error);
      alert('Error sending recording to the server.');
    }

    setRecordedChunks([]); // Clear recorded chunks after saving
  };

  // Fetch the initial chatbot question
  const fetchInitialQuestion = async () => {
    try {
      const initialQuestion = 'Hello! I am your Recommendation chatbot. ';
      const healthConcernQuestion = 'How will I help you?';

      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', content: initialQuestion + healthConcernQuestion },
      ]);

    //   speakResponse(initialQuestion + healthConcernQuestion); // Speak the initial question
    } catch (err) {
      console.error('Error fetching initial question:', err);
    }
  };

  // Fetch the next chatbot question based on the user's last response
  const fetchNextQuestion = async (userResponse) => {
    try {
      const res = await axios.get('http://localhost:8000/api/question', {
        params: {
          question: '(give text response without * ** ``` bullet points)' + userResponse + '. Just return the answer in four lines.',
        },
      });

      const nextQuestion = res.data.text;
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', content: nextQuestion },
      ]);

    //   speakResponse(nextQuestion); 
    } catch (err) {
      console.error('Error fetching next question:', err);
    }
  };

  useEffect(() => {
    fetchInitialQuestion(); // Fetch the first question when the component mounts
  }, []);

  // Text-to-Speech (TTS) function using Web Speech API
//   const speakResponse = (text) => {
//     const synth = window.speechSynthesis;
//     const utterThis = new SpeechSynthesisUtterance(text);
//     utterThis.lang = 'en-IN'; // Set the language to English (India)
//     synth.speak(utterThis);
//   };

  // Function to stop TTS output
  const stopSpeech = () => {
    window.speechSynthesis.cancel(); // Stops the current speech
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-6 px-4 sm:px-0">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <div className="divide-y divide-gray-200">
          {/* Scrollable Chat Window */}
          <div className="py-6 text-gray-700 sm:text-lg">
            <div className="chat-window overflow-y-auto h-64 sm:h-80 p-4 border border-gray-300 rounded-lg bg-gray-50">
              {messages.map((msg, index) => (
                <div key={index} className={`mb-4 ${msg.type === 'user' ? 'text-right' : ''}`}>
                  <div
                    className={`inline-block rounded-lg p-3 text-sm font-medium ${
                      msg.type === 'user'
                        ? 'bg-cyan-600 text-white self-end'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls for recording and playback */}
          <div className="pt-4 text-center space-x-3">
            <button
              onClick={startRecording}
              disabled={recording}
              className={`items-center w-10 h-10 sm:w-12 sm:h-12 justify-center rounded-full shadow-md transition-colors duration-300 ${
                recording ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
              } text-white`}
            >
              {recording ? <FaMicrophoneSlash size={20} /> : <FaMicrophone size={20} />}
            </button>

            <button
              onClick={stopRecording}
              disabled={!recording}
              className="items-center w-10 h-10 sm:w-12 sm:h-12 justify-center rounded-full bg-yellow-500 text-white shadow-md transition-colors duration-300 hover:bg-yellow-600"
            >
              <FaStop size={20} />
            </button>

            <button
              onClick={saveRecording}
              disabled={recordedChunks.length === 0}
              className="items-center w-10 h-10 sm:w-12 sm:h-12 justify-center rounded-full bg-cyan-600 text-white shadow-md transition-colors duration-300 hover:bg-cyan-700 disabled:bg-cyan-300"
            >
              <FaPaperPlane size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
