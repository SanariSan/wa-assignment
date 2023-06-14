import type { TCategories } from '../../store';

type TSelectedRoute = { title: string; pathname: string };
type TCategoriesExist = Array<Exclude<TCategories[number], undefined>>;

// recursive search of target nested object => building route to it
function buildCategoryRouteRecursive({
  categoriesArr,
  target,
  currRoute = [],
}: {
  categoriesArr: TCategories;
  target?: string;
  currRoute?: TSelectedRoute[];
}) {
  if (categoriesArr.length <= 0) return [];
  if (target === undefined) return [];

  /* eslint-disable no-restricted-syntax */
  for (const categoryEntity of categoriesArr) {
    if (categoryEntity?.title === target) {
      return [...currRoute, { title: categoryEntity.title, pathname: categoryEntity.title }];
    }
    if (categoryEntity?.sub !== undefined) {
      buildCategoryRouteRecursive({
        categoriesArr: categoryEntity.sub,
        target,
        currRoute: [...currRoute, { title: categoryEntity.title, pathname: categoryEntity.title }],
      });
    }
  }

  return [];
}

// queue based search of target nested object => building route to it (bfs)
function buildCategoryRouteQueue({
  categoriesArr,
  target,
}: {
  categoriesArr: TCategoriesExist;
  target?: string;
}) {
  if (categoriesArr.length <= 0) return [];
  if (target === undefined) return [];

  for (const categoryEntity of categoriesArr) {
    const from = categoryEntity.title;
    const q: TCategoriesExist = [];
    const routeHash: Record<string, string> = {};

    q.push(categoryEntity);

    routeHash[from] = from;
    if (from === target) return [routeHash[from]];

    // if categories are 1 level deep without sub categories - all ends here
    // ---
    // or else we iterate over queue to find target among sub categories

    while (q.length > 0) {
      const parentEntity = q.pop() as TCategoriesExist[number];
      const { title: parentTitle, sub } = parentEntity;

      if (sub !== undefined) {
        for (const subEntity of sub) {
          const { title: subTitle } = subEntity;
          if (routeHash[subTitle] === undefined) {
            q.push(subEntity);
          }

          routeHash[subTitle] = parentTitle;

          if (subTitle === target) {
            let start = routeHash[subTitle];
            const result = [target, start];

            while (start !== from) {
              start = routeHash[start];
              result.push(start);
            }

            return result.reverse();
          }
        }
      }
    }
  }

  return [];
}

export { buildCategoryRouteQueue, buildCategoryRouteRecursive };
export type { TCategoriesExist, TSelectedRoute };
