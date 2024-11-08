import React, { useEffect, useState } from 'react';

// Importing Firebase
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, orderBy, query, getDocs } from 'firebase/firestore';

// Importing Components
import AnalysisCard from '../components/AnalysisCard';
import NavBar from '../components/NavBar';
import DrawingCard from '../components/DrawingCard';

const History: React.FC = () => {
    const [images, setImages] = useState<string[]>([]); 
    const [freqArray, setFreqArray] = useState<number[]>([0, 0, 0, 0, 0, 0]);
    const [titleArray, setTitleArray] = useState<string[]>([]);
    const [descriptionArray, setDescriptionArray] = useState<string[]>([]);
    const [emotionArray, setEmotionArray] = useState<number[]>([]);
    const [drawingAmount, setDrawingAmount] = useState<number>(0); 

    useEffect(() => {
        const fetchImages = async () => {
            const db = getFirestore();
            const drawingsRef = collection(db, "drawings");
            const storage = getStorage();

            try {
                const dbQuery = query(drawingsRef, orderBy("updatedAt", "asc"));
                const querySnapshot = await getDocs(dbQuery);
                
                // Get image URLs
                const urls = await Promise.all(
                    querySnapshot.docs.map(async (doc) => {
                        const data = doc.data();
                        const drawingURL = data.drawingURL;
                        if (drawingURL.startsWith("https://")) {
                            return drawingURL;
                        }
                        return null;
                    })
                );

                // Initialize the frequency array
                const newFreqArray = [0, 0, 0, 0, 0, 0];

                // Calculate frequencies
                querySnapshot.docs.forEach((doc) => {
                    const data = doc.data();
                    const emotion = data.emotion;

                    if (emotion >= 0 && emotion <= 5) {
                        newFreqArray[emotion] += 1;
                    } else {
                        console.warn(`Unexpected emotion value: ${emotion}`);
                    }
                });

                querySnapshot.docs.forEach((doc) => {
                    const data = doc.data();

                    const title = data.title;
                    const description = data.description;
                    const emotion = data.emotion;

                    titleArray.push(title);
                    descriptionArray.push(description);
                    emotionArray.push(emotion);
                    
                });

                // Update state with results
                setImages(urls.filter(url => url !== null) as string[]);
                setDrawingAmount(urls.length);
                setFreqArray(newFreqArray);
            } catch (error) {
                console.error("Error fetching images: ", error);
            }
        };

        fetchImages();
    }, []);

    return (
        <>
            <NavBar />
            <section className='w-full min-h-screen p-6 bg-purple-100 flex flex-row space-x-4'>
                <div className='w-3/4 space-y-4'>
                    {Array.from({ length: Math.ceil(images.length / 7) }, (_, weekIndex) => {
                        const start = weekIndex * 7;
                        const end = start + 7;
                        const weeklyImages = images.slice(start, end);

                        return (
                            <div key={weekIndex} className='w-full rounded-md shadow-md bg-white flex flex-col p-6'>
                                <p className='font-bold'>Week {weekIndex + 1}</p>
                                <div className='bg-gray-100 flex rounded-md w-full p-4 flex-row gap-2'>
                                    {weeklyImages.map((url, index) => (
                                        <DrawingCard emotion={emotionArray[start + index]}key = {index} description={descriptionArray[start + index]} url={url} title={titleArray[start + index]} index={index + start} />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <AnalysisCard imageAmount={images.length} freqArray={freqArray} />
            </section>
        </>
    );
};

export default History;
