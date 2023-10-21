export interface CategoryData {
    firstCategories: Category[]
    secondCategories: Category[]
    thirdCategories: Category[]
}
export interface Category {
    label: string
    value: number
}

export interface CategoryValue {
    label: string
    selectedValue: number
    isSelected: Boolean
}