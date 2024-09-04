import { useLazyGetUserInfoQuery } from '@api/userApi/userApi';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setProfileData } from '@redux/reducers/ProfileSlice';
import { UpdateUserDto } from '@type/user/types';
import { useEffect } from 'react';
import { ProfileHeader } from './Header/ProfileHeader';
import { ProfileContent } from './ProfileContent/ProfileContent';

export const ProfilePage = () => {
    const dispatch = useAppDispatch();
    const [getUserInfo] = useLazyGetUserInfoQuery();
    
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await getUserInfo(null, false).unwrap();
                dispatch(setProfileData(response as UpdateUserDto));
            } catch (error) {}
        };
        fetchUserInfo()
    }, []);
    return (
        <>
            <ProfileHeader />
            <ProfileContent />
        </>
    );
};
