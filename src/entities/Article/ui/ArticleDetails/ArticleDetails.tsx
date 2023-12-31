import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Avatar } from '@/shared/ui/Avatar';
import { Icon } from '@/shared/ui/Icon';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Text } from '@/shared/ui/Text';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { ArticleBlockType } from '../../model/const/const';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleBlock } from '../../model/types/article';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import s from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
    id?: string;
    className?: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const error = useSelector(getArticleDetailsError);
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const article = useSelector(getArticleDetailsData);

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
            case ArticleBlockType.CODE: {
                return (
                    <ArticleCodeBlockComponent key={block.id} block={block} />
                );
            }

            case ArticleBlockType.IMAGE: {
                return (
                    <ArticleImageBlockComponent key={block.id} block={block} />
                );
            }

            case ArticleBlockType.TEXT: {
                return (
                    <ArticleTextBlockComponent key={block.id} block={block} />
                );
            }

            default: {
                return null;
            }
        }
    }, []);

    useInitialEffect(() => {
        dispatch(fetchArticleById(id));
    });

    let content;

    if (isLoading) {
        content = (
            <>
                <Skeleton
                    className={s.avatar}
                    width={200}
                    height={200}
                    border='50%'
                />
                <div className={s.skeletons}>
                    <Skeleton width={300} height={32} />
                    <Skeleton width={600} height={24} />
                    <Skeleton width='100%' height={200} />
                    <Skeleton width='100%' height={200} />
                </div>
            </>
        );
    } else if (error) {
        content = (
            <Text
                title={t('Произошла ошибка при загрузке статьи')}
                theme='error'
                align='center'
            />
        );
    } else {
        content = (
            <>
                <Avatar size={200} src={article?.img} className={s.avatar} />
                <Text
                    title={article?.title}
                    text={article?.subtitle}
                    size='size_l'
                />
                <div className={s.articleInfo}>
                    <Icon Svg={EyeIcon} iconStyle='primary' />
                    <Text text={String(article?.views)} />
                </div>
                <div className={s.articleInfo}>
                    <Icon Svg={CalendarIcon} iconStyle='primary' />
                    <time dateTime={article?.createdAt}>
                        {article?.createdAt}
                    </time>
                </div>
                <div className={s.blockList}>
                    {article?.blocks.map(renderBlock)}
                </div>
            </>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(s.articleDetails, [className], {})}>
                {content}
            </div>
        </DynamicModuleLoader>
    );
});
