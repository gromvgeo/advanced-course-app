import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { Loader } from '@/shared/ui/Loader';
import { Avatar } from '@/shared/ui/Avatar';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { Country, CountrySelect } from '@/entities/Country';
import { Profile } from '../../model/types/profile';
import s from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    handleChangeFirstname?: (val: string) => void;
    handleChangeLastname?: (val: string) => void;
    handleChangeAge?: (val: string) => void;
    handleChangeCity?: (val: string) => void;
    handleChangeUsername?: (val: string) => void;
    handleChangeAvatar?: (val: string) => void;
    handleChangeCurrency?: (val: Currency) => void;
    handleChangeCountry?: (val: Country) => void;
}

export const ProfileCard = ({
    className,
    data,
    error,
    isLoading,
    readonly,
    handleChangeFirstname,
    handleChangeLastname,
    handleChangeAge,
    handleChangeCity,
    handleChangeUsername,
    handleChangeAvatar,
    handleChangeCurrency,
    handleChangeCountry,
}: ProfileCardProps) => {
    const { t } = useTranslation(['translation', 'profile']);

    if (error) {
        return (
            <div
                className={classNames(s.profileCard, [className, s.error], {})}
            >
                <Text
                    title={t('Произошла ошибка при загрузке профиля', {
                        ns: 'profile',
                    })}
                    theme='error'
                    align='center'
                />
            </div>
        );
    }

    if (isLoading) {
        return (
            <div
                className={classNames(
                    s.profileCard,
                    [className, s.loading],
                    {},
                )}
            >
                <Loader />
            </div>
        );
    }

    return (
        <div
            className={classNames(s.profileCard, [className], {
                [s.editing]: !readonly,
            })}
        >
            <div className={s.data}>
                {data?.avatar && <Avatar src={data?.avatar} />}
                <Input
                    value={data?.firstname}
                    placeholder={t('Имя')}
                    className={s.input}
                    onChange={handleChangeFirstname}
                    readonly={readonly}
                    data-testid='ProfileCard.Firstname'
                />
                <Input
                    value={data?.lastname}
                    placeholder={t('Фамилия')}
                    className={s.input}
                    onChange={handleChangeLastname}
                    readonly={readonly}
                    data-testid='ProfileCard.Lastname'
                />
                <Input
                    value={data?.age}
                    placeholder={t('Возраст')}
                    className={s.input}
                    onChange={handleChangeAge}
                    readonly={readonly}
                />
                <Input
                    value={data?.city}
                    placeholder={t('Город')}
                    className={s.input}
                    onChange={handleChangeCity}
                    readonly={readonly}
                />
                <Input
                    value={data?.username}
                    placeholder={t('Имя пользователя')}
                    className={s.input}
                    onChange={handleChangeUsername}
                    readonly={readonly}
                />
                <Input
                    value={data?.avatar}
                    placeholder={t('Аватар')}
                    className={s.input}
                    onChange={handleChangeAvatar}
                    readonly={readonly}
                />
                <CurrencySelect
                    value={data?.currency}
                    onChange={handleChangeCurrency}
                    readonly={readonly}
                />
                <CountrySelect
                    value={data?.country}
                    onChange={handleChangeCountry}
                    readonly={readonly}
                />
            </div>
        </div>
    );
};
