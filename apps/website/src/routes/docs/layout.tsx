/* eslint-disable qwik/no-react-props */
import { Slot, component$ } from '@builder.io/qwik';
import { ContentMenu, useContent, useLocation } from '@builder.io/qwik-city';
import { ComponentsStatusesMap, statusByComponent } from '~/_state/component-statuses';
import {
  DocsNavigation,
  LinkGroup,
  LinkProps,
} from '~/components/navigation-docs/navigation-docs';
import { MDXProvider } from '~/_state/MDXProvider';
import { components } from '~/components/mdx-components';

export default component$(() => {
  const { headings } = useContent();
  const { menuItemsGroups } = useKitMenuItems();

  return (
    <>
      <div class="flex">
        <DocsNavigation
          linksGroups={
            menuItemsGroups && menuItemsGroups.length > 0 ? menuItemsGroups : undefined
          }
          class="sticky top-16 mr-4 hidden h-[calc(100vh-64px)] min-w-72 overflow-auto lg:flex 2xl:ml-0"
        />
        <MDXProvider components={components}>
          <main class="w-full max-w-screen-md px-4 py-8">
            <Slot />
          </main>
        </MDXProvider>

        <footer></footer>
      </div>
    </>
  );
});

export function useKitMenuItems() {
  const location = useLocation();
  const { menu } = useContent();
  let menuItemsGroups: LinkGroup[] | undefined = [];

  if (location.url.pathname.startsWith('/docs/headless')) {
    menuItemsGroups = decorateMenuItemsWithBadges(
      menu?.items,
      statusByComponent.headless,
    );
  }

  if (location.url.pathname.startsWith('/docs/styled')) {
    menuItemsGroups = decorateMenuItemsWithBadges(menu?.items, statusByComponent.styled);
  }

  return { menuItemsGroups };
}

function decorateMenuItemsWithBadges(
  menuItems: ContentMenu[] | undefined,
  kitStatusesMap: ComponentsStatusesMap,
): LinkGroup[] | undefined {
  return menuItems?.map((item) => {
    return {
      name: item.text,
      children: item.items?.map((child) => {
        const link: LinkProps = {
          name: child.text,
          href: child.href,
        };
        if (kitStatusesMap[link.name]) {
          link.status = kitStatusesMap[link.name];
        }
        return link;
      }),
    };
  });
}
