import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

interface ArticleEditPageProps {
    className?: string;
}

const ArticleEditPage = memo(({ className }: ArticleEditPageProps) => {
    const { id } = useParams();
    const isEdit = Boolean(id);

    return (
        <Page className={classNames('', [className], {})}>
            {isEdit ? `Редактирование  ${id}` : 'Новая'}
        </Page>
    );
});

export default ArticleEditPage;
