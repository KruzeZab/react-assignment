import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

// Tips: Export and use throughout your app
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
