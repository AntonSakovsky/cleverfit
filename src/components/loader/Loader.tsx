import animationData from '@public/lottie/animation.json';
import Lottie from 'react-lottie';
import s from './Loader.module.css';


export const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className={s.loader} data-test-id='loader'>
            <Lottie
                options={defaultOptions}
                height={150}
                width={150}
                
                
            />
        </div>
    );
}