import React, { useRef, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { v4 as uuidv4 } from "uuid";

//Importing Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faEraser } from '@fortawesome/free-solid-svg-icons';

//Importing firebase
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";

//Importing components
import NavBar from '../components/NavBar';

const DrawingPage: React.FC = () => {
  let isDrawing: boolean = false;
  const [strokeColor, setStrokeColor] = useState('black');
  const [brushSize, setBrushSize] = useState(5);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [emotion, setEmotion] = useState<number>(2); // Default emotion
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (context) {

      const startDrawing = () => {
        isDrawing = true;
        context.beginPath();
        context.strokeStyle = strokeColor;
        context.lineWidth = brushSize;
      };

      const draw = (e: MouseEvent) => {
        if (!isDrawing) return;
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
      };

      const stopDrawing = () => {
        isDrawing = false;
        context.closePath();
      };

      canvas.addEventListener('mousedown', startDrawing);
      canvas.addEventListener('mousemove', draw);
      canvas.addEventListener('mouseup', stopDrawing);
      canvas.addEventListener('mouseleave', stopDrawing);
    }
  }, [strokeColor, brushSize]);

  const changeStrokeColor = (color: string, size: number) => {
    setStrokeColor(color);
    setBrushSize(size);
  };

  const handleSaveDrawing = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const uuid = uuidv4(); 
    const updatedAt = Timestamp.now();

    const storage = getStorage();
    const storageRef = ref(storage, `drawings/${uuid}.png`);

    canvas.toBlob(async (blob) => {
      if (blob) {
        try {
          await uploadBytes(storageRef, blob);

          const drawingURL = await getDownloadURL(storageRef);

          const db = getFirestore();
          const metadata = {
            uuid,
            updatedAt,
            title,
            description,
            emotion,
            drawingURL
          };

          await addDoc(collection(db, "drawings"), metadata);

          console.log("Drawing and metadata saved successfully");
          navigate('/history');

        } catch (error) {
          console.error("Failed to save drawing:", error);
          alert("Failed to save the drawing.");
        }
      }
    }, 'image/png');
  };

  return (
    <>
      <NavBar />
      <section className='w-full min-h-screen bg-purple-100 flex flex-row p-6 space-x-4'>
        <div className='w-2/3 flex flex-col space-y-2'>
          <div className='w-full bg-white rounded-md shadow-md p-6 flex justify-center'>
            <canvas ref={canvasRef} width={900} height={500} className="border-2 border-gray-800" />
          </div>
          <div className="flex flex-row justify-center p-2 rounded-md shadow-md bg-white space-x-2">
            <button
              className={`p-2 w-12 h-12 bg-white rounded-full shadow-md hover:bg-gray-100 ${strokeColor === 'black' ? 'border-purple-600' : 'border-gray-100'
                } border-2`}
              onClick={() => changeStrokeColor('black', 5)}
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
            <button
              className={`p-2 w-12 h-12 bg-white rounded-full shadow-md hover:bg-gray-100 ${strokeColor === 'white' ? 'border-purple-600' : 'border-gray-100'
                } border-2`}
              onClick={() => changeStrokeColor('white', 50)}
            >
              <FontAwesomeIcon icon={faEraser} />
            </button>
          </div>
        </div>

        <div className='w-1/3 flex flex-col items-center justify-end mb-auto'>
          <div className='w-full rounded-t-md bg-purple-600 text-white font-bold text-lg text-center p-2'>Draw your day!</div>
          <div className='w-full p-6 flex flex-col bg-white rounded-b-md shadow-md'>
            <p className='font-bold text-lg'>Title</p>
            <input
              className='bg-gray-100 rounded-sm p-2'
              placeholder='Type the title here'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <p className='font-bold text-lg'>Description</p>
            <textarea
              className='bg-gray-100 rounded-sm p-2'
              placeholder='Tell more about your day'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <p className='font-bold text-lg'>Emotion</p>
            <select
              value={emotion}
              onChange={(e) => setEmotion(Number(e.target.value))}
              className='bg-gray-100 rounded-sm p-2'
            >
              <option value={0}>Angry</option>
              <option value={1}>Sad</option>
              <option value={2}>Happy</option>
              <option value={3}>Curious</option>
              <option value={4}>Sick</option>
              <option value={5}>Love</option>
            </select>
            <br />
            <button
              className="bg-purple-600 text-white p-2 rounded-md"
              onClick={handleSaveDrawing}
            >
              Save Drawing
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default DrawingPage;
