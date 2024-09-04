import Title from "antd/lib/typography/Title";
import { FC, ReactNode, useState } from "react";
import VerificationInput from "react-verification-input";
import s from './ConfirmCard.module.css';

type IConfirmCardProps = {
    icon: ReactNode,
    title: string | string[],
    m: ReactNode
    labelText: string,
    error: boolean
    completeHandler:  (v: string)=>void,
}

export const ConfirmCard: FC<IConfirmCardProps> = ({ icon, title, labelText, m,error, completeHandler }) => {
    const [value, setValue] = useState('');
    const changeHandler = (value: string)=>{
        setValue(value);
    }
    return (
        <div className={s.body}>
            <div className={s.imgWrap}>
                {icon && icon}
            </div>
            <div className={s.textBlock}>
                <Title level={3} className={s.title}>{(typeof title === 'object') ?
                    title.map((t, i) => <span key={i}>{t}</span>) : title}</Title>
                {m}
            </div>
            <div className={s.inputWrap}>
                <VerificationInput
                    validChars="0-9"
                    placeholder=""
                    inputProps={{ inputMode: "numeric",'data-test-id':'verification-input' }}
                    autoFocus
                    value={value}
                    classNames={{
                        container: `${s.verifyContainer}`,
                        character: `${s.character} ${error ? s.invalid : ''}`,
                        characterInactive: `${s.chInactive}`,
                        characterSelected: `${s.chSelected}`,
                        characterFilled: `${s.chFilled}`,
                    }} 
                    onChange={changeHandler}
                    onComplete={async (code: string)=> {
                            await completeHandler(code);
                            setValue('')
                        
                    }}/>
            </div>
            <p className={s.bottomLabel}>{labelText}</p>
        </div>
    )
}