import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const AboutPage = memo(() => {
    const { t } = useTranslation('about');

    return <Page dataTestid='AboutPage'>{t('О сайте')}</Page>;
});

export default AboutPage;
