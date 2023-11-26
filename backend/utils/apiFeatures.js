class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr
    }

    //This function is used to search for products in the database based on a keyword.
    search() {
        // Check if a keyword is provided in the query string
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,   // Use regular expression to match the keyword
                $options: "i", // Enable case insensitivity
            },
        } : {};
        //console.log(keyword);
        this.query = this.query.find({ ...keyword }); // Update the query with the search filter
        return this; // Return the updated instance of ApiFeatures
    }

    // Filter the database query based on specified criteria for a category.
    filter() {
        const queryCopy = { ...this.queryStr }  // Create a copy of the query string

        // Remove fields that are not relevant for category filtering
        const removeFields = ["keyword", "page", "limit", "sort", "sortByDate"];
        removeFields.forEach((key) => delete queryCopy[key]);

        // Filter for price and ratings
        // Convert comparison operators to MongoDB format
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        // Apply the filtered query to the database
        this.query = this.query.find(JSON.parse(queryStr));

        // Sorting
        if (this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(',').join(' '); // Handle multiple sorting criteria
            this.query = this.query.sort(sortBy);
        }

        if (this.queryStr.sortByDate) {
            // If sortByDate is specified, sort by "createdAt" field in descending (-1) order for latest products
            this.query = this.query.sort({ createdAt: this.queryStr.sortByDate === 'oldest' ? 1 : -1 });
        }

        return this;
    }

    // Paginate the results of the database query by specifying the number of results per page and the current page number. 
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skipPage = resultPerPage * (currentPage - 1);   // Calculate the number of documents to skip based on the current page
        this.query = this.query.limit(resultPerPage).skip(skipPage);
        return this;
    }
}

module.exports = ApiFeatures