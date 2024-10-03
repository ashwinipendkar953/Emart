export const filterProducts = (products, filters) => {

    // If no filters are applied, return all products
   if (!filters?.rating && !filters?.priceRange && !filters?.categories?.length && !filters?.subCategories?.length && !filters?.sortBy && !filters?.searchQuery) {
    return products;
    }

    const filteredProducts = products?.filter((product) => {
        const isRatingValid = filters?.rating ? product?.rating >= filters.rating : true; 
        const isPriceValid = filters?.priceRange ? product?.sellingPrice >= filters.priceRange[0] && product?.sellingPrice <= filters.priceRange[1] : true; 
        const isCategoryValid = filters?.categories?.length ? filters.categories.includes(product?.category) : true; 
        const isSubCategoryValid = filters?.subCategories?.length ? filters?.subCategories.includes(product?.subCategory) : true
        const isSearchQueryValid = filters?.searchQuery ?
         product?.name?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
         product?.category?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
         product?.subCategory?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
         product?.brandName?.toLowerCase().includes(filters.searchQuery.toLowerCase()) : true;

        return isRatingValid && isPriceValid && isCategoryValid && isSubCategoryValid && isSearchQueryValid // if they are true means no filter is applied and return all products
    })
    .sort((a, b) => {
        if(filters?.sortBy === 'price-asc') {
            return a.sellingPrice - b.sellingPrice;
        } else if(filters.sortBy === 'price-desc') {
            return b.sellingPrice - a.sellingPrice;
        } else if(filters.sortBy === "rating-desc"){
            return b.rating - a.rating
        }
        return 0; 
    });

    return filteredProducts
}