import { Flex, Spacer } from '@chakra-ui/react';
import type { FC } from 'react';
import { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { SidebarCategoryEntityMemo, SidebarSectionEntityMemo } from '../../components/sidebar';
import { SIDEBAR_TEMPLATE } from '../../const';
import { sleep } from '../../helpers/util';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  fetchCategoriesAsync,
  goodsCategoriesLoadingStatusSelector,
  goodsCategoriesSelector,
  goodsSelectedCategoryIdxSelector,
  setSelectedCategoryIdx,
  uiSelectedSectionIdxSelector,
  uiSidebarStateSelector,
} from '../../store';
import { changeRoute } from '../functional';

interface ISidebarContainer {
  [key: string]: unknown;
}

const SidebarContainer: FC<ISidebarContainer> = () => {
  const d = useAppDispatch();
  const categories = useAppSelector(goodsCategoriesSelector);
  const isSidebarOpened = useAppSelector(uiSidebarStateSelector);
  const selectedSectionIdx = useAppSelector(uiSelectedSectionIdxSelector);
  const selectedCategoryIdx = useAppSelector(goodsSelectedCategoryIdxSelector);
  const categoriesLoadingStatus = useAppSelector(goodsCategoriesLoadingStatusSelector);

  const [unfoldedIdxs, setUnfoldedIdxs] = useState<number[]>([]);

  const unfold = useCallback((idx: number) => {
    setUnfoldedIdxs((s) => [...s, idx]);
  }, []);

  const collapse = useCallback((idx: number) => {
    setUnfoldedIdxs((s) => s.filter((_) => _ !== idx));
  }, []);

  const onSubUnfold = useCallback(
    (idx: number) => {
      if (unfoldedIdxs.includes(idx)) collapse(idx);
      else unfold(idx);
    },
    [collapse, unfold, unfoldedIdxs],
  );

  const disabledEntries = useMemo(() => ['settings'], []);

  // fetch global categories
  useEffect(() => {
    if (categoriesLoadingStatus === 'idle') {
      void d(fetchCategoriesAsync());
      return;
    }

    // constant retry in case of fail
    if (categoriesLoadingStatus === 'failure' && categories.length <= 0) {
      void sleep(5000).then(() => {
        void d(fetchCategoriesAsync());
        return;
      });
    }
  }, [categoriesLoadingStatus, categories, d]);

  return (
    <Flex
      direction={'column'}
      alignItems={'flex-start'}
      gap={0}
      w={'100%'}
      h={'100%'}
      py={9}
      pb={6}
      pr={{ base: 1, sm: 2 }}
    >
      {SIDEBAR_TEMPLATE.map((section, idxSection) => {
        if (section === undefined) return;
        const { icon, title, subCategory, pathname } = section;
        const isUnfolded = unfoldedIdxs.includes(idxSection);
        const subH =
          isSidebarOpened && isUnfolded && subCategory === 'catalogue'
            ? `${categories.length * 50}px`
            : '0px';

        return (
          <Fragment key={`side-p-${idxSection}`}>
            {idxSection === SIDEBAR_TEMPLATE.length - 2 && <Spacer />}
            <SidebarSectionEntityMemo
              title={title}
              icon={icon}
              hasCategory={subCategory === 'catalogue'}
              categoriesLoadingStatus={categoriesLoadingStatus}
              isDisabled={disabledEntries.includes(title)}
              isSidebarOpened={isSidebarOpened}
              isSelected={selectedSectionIdx === idxSection}
              isCategoryUnfolded={isUnfolded}
              onSelect={() => {
                changeRoute(pathname);

                // for now there is only 1 sub category possible - catalogue, so here's just explicit check
                // allows to not refetch on ANY category choice + prevent refetch on subsequent section clicks
                // So, if target category is catalogue AND (there was no section selected b4 OR there WAS category selected)
                if (
                  subCategory === 'catalogue' &&
                  (selectedSectionIdx === -1 || selectedCategoryIdx !== -1)
                ) {
                  void d(setSelectedCategoryIdx({ categoryIdx: -1 }));
                }
              }}
              onSubUnfold={() => {
                onSubUnfold(idxSection);
              }}
            />

            {
              // for now there is only 1 sub category possible - catalogue, so here's just explicit check
              subCategory === 'catalogue' && categories.length > 0 && (
                <Flex
                  direction={'column'}
                  w={'100%'}
                  pl={{ base: 8, sm: 10 }}
                  overflow={'hidden'}
                  h={subH}
                  minH={subH}
                >
                  {categories.map((category, categoryIdx) => {
                    if (category === undefined) return;
                    const { title: titleCategory } = category;
                    return (
                      <SidebarCategoryEntityMemo
                        key={`side-p-${idxSection}-c-${categoryIdx}`}
                        title={titleCategory}
                        isSidebarOpened={isSidebarOpened}
                        isSelected={
                          selectedSectionIdx === idxSection && selectedCategoryIdx === categoryIdx
                        }
                        onSelect={() => {
                          if (selectedSectionIdx !== idxSection) changeRoute(pathname);
                          if (selectedCategoryIdx !== categoryIdx)
                            void d(setSelectedCategoryIdx({ categoryIdx }));
                        }}
                      />
                    );
                  })}
                </Flex>
              )
            }
          </Fragment>
        );
      })}
    </Flex>
  );
};

const SidebarContainerMemo = memo(SidebarContainer);

export { SidebarContainerMemo };
