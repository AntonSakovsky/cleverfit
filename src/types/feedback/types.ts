export type FeedbackResponse = {
    id: string;
    fullName: null | string;
    imageSrc: null | string;
    message: null | string;
    rating: number;
    createdAt: string;
};
export type AddFeedbackBody = {
    message: string,
    rating: number,
}