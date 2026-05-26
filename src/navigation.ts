import { createNavigation } from 'next-intl/navigation';
import { routing } from './i18n/routing';
import type NextLink from 'next/link';

const navigation = createNavigation(routing);

export const Link = navigation.Link as unknown as typeof NextLink;
export const redirect = navigation.redirect;
export const usePathname = navigation.usePathname;
export const useRouter = navigation.useRouter;
export const getPathname = navigation.getPathname;
