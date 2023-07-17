import type { IntlFormatters } from 'react-intl';
import { useIntl as useReactIntl } from 'react-intl';
import { portugueseBrazil } from './locales/pt-br';

type FormatMessageArgs = Parameters<IntlFormatters['formatMessage']>;

export function useIntl() {
    type IntlMessageKeys = keyof typeof portugueseBrazil.message;

    const { formatMessage, ...rest } = useReactIntl();
    const typedFormatMessage = (
        descriptor: FormatMessageArgs[0] & {
            id?: IntlMessageKeys;
        },
        values?: Record<string, string>,
        options?: FormatMessageArgs[2],
    ) => {
        return formatMessage(descriptor, values, options);
    };
    return {
        ...rest,
        formatMessage: typedFormatMessage,
    };
}
