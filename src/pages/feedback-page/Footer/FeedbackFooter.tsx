import { ActionButton } from "@components/ActionButton/ActionButton";
import { Button } from "antd";
import { FC } from "react";
import s from './FeedbackFooter.module.css';

type FeedbackFooterProps = {
    primaryBtnClickHandler: () => void,
    secondaryBtnClickHandler: () => void,
    primaryBtnText: string,
    secondaryBtnText: string,
}

export const FeedbackFooter: FC<FeedbackFooterProps> = ({ primaryBtnClickHandler, secondaryBtnClickHandler, primaryBtnText, secondaryBtnText }) => {

    return (
        <div className={s.footer}>
            <div className={s.writeFeedback}>
                <ActionButton
                    type="primary"
                    text={primaryBtnText}
                    htmlType="button"
                    isAlt={false}
                    stretch
                    fontSize={14}
                    onClick={primaryBtnClickHandler}
                    dataTestId='write-review'
                     />
            </div>

            <Button type="link" className={s.expand} onClick={secondaryBtnClickHandler} data-test-id='all-reviews-button'>{secondaryBtnText}</Button>
        </div>
    )
}