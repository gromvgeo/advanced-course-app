import { MutableRefObject, ReactNode, useRef, UIEvent } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useThrottle } from '@/shared/lib/hooks/useThrottle';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { getUIScrollByPath, UIActions } from '@/features/UI';
import { TestsProps } from '@/shared/types/tests';
import s from './Page.module.scss';

interface PageProps extends TestsProps {
    children: ReactNode;
    onScrollEnd?: () => void;
    className?: string;
}

export const Page = ({
    className,
    children,
    onScrollEnd,
    dataTestid,
}: PageProps) => {
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const scrollPosition = useSelector((state: StateSchema) =>
        getUIScrollByPath(state, pathname),
    );

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });

    const handleScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(
            UIActions.setScroll({
                path: pathname,
                position: e.currentTarget.scrollTop,
            }),
        );
    }, 500);

    return (
        <section
            ref={wrapperRef}
            className={classNames(s.page, [className], {})}
            onScroll={handleScroll}
            data-testid={dataTestid ?? 'Page'}
        >
            {children}
            {onScrollEnd && <div ref={triggerRef} />}
        </section>
    );
};
