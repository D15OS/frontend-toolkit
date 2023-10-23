export interface RawData {
    'e_commerce_goods_category.parent_code': string;
    'e_commerce_goods_category.sort'?: any;
    'e_commerce_goods_category.enable'?: number;
    'e_commerce_goods_category.id': number;
    'e_commerce_goods_category.category_code': string;
    'e_commerce_goods_category.name': string;
    'e_commerce_goods_category.display_name'?: any;
    'e_commerce_goods_category.level': number;
}
export type CategoryData = Category[][]
export interface Category {
    id: number
    name: string
    category_code: string
}

export interface CategoryLevel {
    label: string
    selectedCode: string
    isSelected: Boolean
}