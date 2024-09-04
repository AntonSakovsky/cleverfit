import React from 'react';
import { MainFooter } from './Footer/Footer';
import { MainHeader } from './Header/Header';
import { MainContent } from './MainContent/MainContent';

export const MainPage: React.FC = () => {

    return (
        <>
            <MainHeader />
            <MainContent />
            <MainFooter />
        </>
    );
};

export default MainPage
