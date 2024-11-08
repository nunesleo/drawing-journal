//Importing components
import EmotionHistogram from '../components/EmotionHistogram';

interface AnalysisCardProps{
    imageAmount: number;
    freqArray: number[];
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ imageAmount, freqArray }) => {
    return(
        <div className='mb-auto flex-grow flex flex-col items-center justify-end'>
            <div className='w-full rounded-t-md bg-purple-600 text-white font-bold text-lg text-center p-2'>Analysis</div>
            <div className='w-full p-6 flex flex-col bg-white rounded-b-md shadow-md'>
        

            <p className='font-bold text-lg'>Total drawings</p>
            <div className='rounded-md p-4 bg-gray-100'>
                <p className='text-center font-bold text-2xl'>{imageAmount}</p>
            </div>
            

            <br />

            <p className='font-bold text-lg'>Emotion Histogram</p>
            <EmotionHistogram freqArray = {freqArray} />
            </div>
        </div>
    )
}

export default AnalysisCard;
