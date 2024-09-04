import { ErrorModalSmall } from '@components/modals/ErrorModalSmall/ErrorModalSmall';
import { basePhotoUrl, baseURL } from '@constants/constants';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setProfileData } from '@redux/reducers/ProfileSlice';
import { Form, Upload } from 'antd';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import style from '../Input.module.css';
import { ButttonUploadLarge } from './ButttonUploadLarge';
import { ButttonUploadSmall } from './ButttonUploadSmall';

type UploadInputProps = {
    imageSrc?: string;
    dataTestId?: string;
};

export const UploadInput: FC<UploadInputProps> = ({ imageSrc, dataTestId }) => {
    const [errorUpload, setErrorUpload] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [hide, setHide] = useState(!!imageSrc);
    const [fileList, setFileList] = useState<UploadFile[] | undefined>(undefined);
    const dispatch = useAppDispatch();
    const accessToken = useAppSelector((state) => state.user.token);

    const uploadBtn = () => {
        if (window.innerWidth >= 461) return <ButttonUploadLarge />;
        return <ButttonUploadSmall />;
    };

    const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
        const { file } = info;

        if (file.status === 'removed') {
            dispatch(
                setProfileData({
                    imgSrc: '',
                }),
            );
            setFileList(undefined);
        }
        if (file.response?.error || file.status === 'error') {
            setErrorUpload(true);
            setHide(true);
            setFileList([
                {
                    uid: '1',
                    name: file.name,
                    status: 'error',
                },
            ]);
        }
        if (file.status === 'done') {
            setHide(true);
            setFileList([
                {
                    uid: '1',
                    name: '',
                    status: 'done',
                    url: basePhotoUrl + file.response.url,
                },
            ]);
        }
    };

    const beforeUpload = (file: RcFile) => {
        const isLessOrEqual5Mb = file.size / 1024 / 1024 <= 5;
        if (!isLessOrEqual5Mb) {
            setErrorUpload(true);
            setFileList([
                {
                    uid: '1',
                    name: file.name,
                    status: 'error',
                },
            ]);
            setHide(true);
        }
        return isLessOrEqual5Mb;
    };

    const errorModalClickHandler = () => {
        setErrorUpload(false);
        setFileList(undefined);
        setHide(false);
    };

    const onRemove = () => setHide(false);

    useEffect(() => {
        if (imageSrc) {
            setHide(true);
            setFileList([
                {
                    uid: '1',
                    name: '',
                    url: imageSrc,
                },
            ]);
        }
    }, [imageSrc]);

    useEffect(() => {
        const onResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
    return (
        <>
            {errorUpload && (
                <ErrorModalSmall
                    title='Файл слишком большой'
                    message='Выберите файл размером до 5 МБ.'
                    btnText='Закрыть'
                    clickHandler={errorModalClickHandler}
                    iconColor='#FF4D4F'
                    dataTestId='big-file-error-close'
                />
            )}
            <Form.Item name='uploadImage' data-test-id={dataTestId}>
                <Upload
                    className={cn(style.upload, { [style.hide]: hide })}
                    showUploadList={true}
                    fileList={fileList}
                    progress={{
                        strokeColor: 'blue',
                        strokeWidth: 4,
                        showInfo: false,
                    }}
                    locale={{
                        uploading: 'Загрузка',
                    }}
                    listType={windowWidth >= 461 ? 'picture-card' : 'picture'}
                    action={`${baseURL}upload-image`}
                    method='POST'
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    onRemove={onRemove}
                    headers={{
                        Authorization: `Bearer ${accessToken}`,
                    }}
                >
                    {!hide && uploadBtn()}
                </Upload>
            </Form.Item>
        </>
    );
};
