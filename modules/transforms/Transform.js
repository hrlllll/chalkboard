module.exports = class Transform {
    transformCollection(items) {
        if ( this.withPaginateStatus) {
            return {
                'contacts' : items.docs.map(this.transform.bind(this)),
                ...this.paginateItem(items)
            }
        }
        return items.map(this.transform.bind(this))
    }

    withPagination() {
        this.withPaginateStatus = true;
        return this;
    }
    paginateItem(items) {
        return {
            total : items.total,
            limit : items.limit,
            page : items.page,
            pages : items.pages
        }
    }
}
