import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCategoriesFilter, setSubCategoriesFilter } from "../productSlice";

const CategoryFilter = ({
  categories,
  selectedCategories,
  selectedSubCategories,
  params,
  handleUrlChange,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (params?.categories) {
      dispatch(setCategoriesFilter(params?.categories.split(",")));
    }
    if (params?.subCategories) {
      dispatch(setSubCategoriesFilter(params?.subCategories.split(",")));
    }
  }, [dispatch, params.categories, params.subCategories]);

  let updatedCategories;
  let updatedSubCategories;

  const categoryChangeHandler = (e, category) => {
    if (e.target.checked) {
      updatedCategories = [...selectedCategories, category.value];
    } else {
      updatedCategories = selectedCategories.filter(
        (cat) => cat !== category.value
      );

      // Remove subcategories related to the unchecked category
      const categorySubCategories = category.subCategories.map(
        (subCat) => subCat.value
      );
      updatedSubCategories = selectedSubCategories.filter(
        (subCat) => !categorySubCategories.includes(subCat)
      );

      // Update the subcategories in the URL and state
      dispatch(setSubCategoriesFilter(updatedSubCategories));
      handleUrlChange("subCategories", updatedSubCategories.join(","));
    }

    // Update categories in the state and URL
    dispatch(setCategoriesFilter(updatedCategories));
    handleUrlChange("categories", updatedCategories.join(","));
  };

  const subCategoryChangeHandler = (e, subCat) => {
    if (e.target.checked) {
      updatedSubCategories = [...selectedSubCategories, subCat.value];
    } else {
      updatedSubCategories = selectedSubCategories.filter(
        (cat) => cat !== subCat.value
      );
    }
    dispatch(setSubCategoriesFilter(updatedSubCategories));
    handleUrlChange("subCategories", updatedSubCategories.join(","));
  };

  return (
    <div className="mb-3">
      <label className="form-label fw-bold">Category</label>
      {categories?.map((category) => {
        const isCategoryChecked =
          selectedCategories?.includes(category.value) ||
          params?.categories?.split(",").includes(category.value);

        return (
          <div className="form-check" key={category._id}>
            <input
              className="form-check-input"
              type="checkbox"
              value={category.value}
              id={category._id}
              checked={isCategoryChecked}
              onChange={(e) => categoryChangeHandler(e, category)}
            />
            <label htmlFor={category._id} className="text-capitalize">
              {category?.label}
            </label>
            {isCategoryChecked &&
              category?.subCategories?.map((subCat) => {
                const isSubCategoryChecked =
                  selectedSubCategories?.includes(subCat.value) ||
                  params?.subCategories?.split(",").includes(subCat.value);

                return (
                  <div className="form-check" key={subCat._id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={subCat.value}
                      id={subCat._id}
                      checked={isSubCategoryChecked}
                      onChange={(e) => subCategoryChangeHandler(e, subCat)}
                    />
                    <label htmlFor={subCat._id} className="text-capitalize">
                      {subCat?.label}
                    </label>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
