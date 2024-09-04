import { useEffect } from "react";
import { FeedbackContent } from "./Content/FeedbackContent";
import { FeedbackHeader } from "./Header/FeedbackHeader";

export const FeedbackPage = () => {
    useEffect(()=>{
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, [])
    return(
        <div>
            <FeedbackHeader />
            <FeedbackContent />
        </div>
    )
}