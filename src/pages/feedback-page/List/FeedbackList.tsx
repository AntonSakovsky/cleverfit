import { FeedbackCard } from "@components/cards/FeedbackCard/FeedBackCard";
import { FeedbackResponse } from "@type/feedback/types";
import { FC } from "react";
import s from './FeedbackList.module.css';

type FeedbackListProps = {
    data: FeedbackResponse[],
    limit: number
}

export const FeedbackList: FC<FeedbackListProps> = ({data, limit}) => {
    let sortedData = [...data].sort((a, b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    if(limit !== -1){
        sortedData = sortedData.slice(0, limit);
    }
    return(
        <div className={s.feedbackList}>

        {
            sortedData.map((item)=> <FeedbackCard key={item.id}
             fullName={item.fullName}
             imageSrc={item.imageSrc}
             message={item.message}
             rating={item.rating}
             createdAt={item.createdAt}
            />)
        }
        </div>
    )
}