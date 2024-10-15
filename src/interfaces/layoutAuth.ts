import React from 'react';

export interface ILayoutAuth {
    title: string,
    subTitle: string,
    type?: 'register' | 'login',
    children: React.ReactNode
}