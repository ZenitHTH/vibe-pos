export interface Image {
    id: number;
    file_name: string;
    file_hash: string;
    file_path: string;
    created_at: string; // NaiveDateTime comes as string in JSON usually
}

export interface ProductImage {
    product_id: number;
    image_id: number;
}
