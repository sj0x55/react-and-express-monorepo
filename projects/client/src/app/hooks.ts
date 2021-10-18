import type { RootState, AppDispatch } from 'types/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppDispatch as useDispatch, useAppSelector as useSelector };
